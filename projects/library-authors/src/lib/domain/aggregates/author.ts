import { BaseAggregateRoot, NotFoundException } from '@eac-arch/shared-kernel';
import { FullName } from '../value-objects/full-name';
import { LifeSpan } from '../value-objects/life-span';
import { LiteraryGenre } from '../value-objects/literary-genre';
import { Affiliation } from '../entities/affiliation';
import { Award } from '../entities/award';
import { Paper } from '../entities/paper';
import { InvalidAwardDateException } from '../exceptions/invalid-award-date.exception';
import { InvalidPaperDateException } from '../exceptions/invalid-paper-date.exception';
import { InvalidAffiliationDateException } from '../exceptions/invalid-affiliation-date.exception';
import { DuplicateAwardTitleException } from '../exceptions/duplicate-award-title.exception';
import { DuplicatePaperTitleException } from '../exceptions/duplicate-paper-title.exception';
import { DuplicateAffiliationNameException } from '../exceptions/duplicate-affiliation-name.exception';

// Author aggregate root.
// Owns and manages affiliations, awards and papers as child entities.
// All mutations go through explicit methods that enforce invariants.
export class Author extends BaseAggregateRoot<string> {
  readonly id: string;

  private _name: FullName;
  private _lifeSpan: LifeSpan;
  private _literaryGenre: LiteraryGenre;
  private _affiliations: Affiliation[];
  private _awards: Award[];
  private _papers: Paper[];

  private constructor(
    id: string,
    name: FullName,
    lifeSpan: LifeSpan,
    literaryGenre: LiteraryGenre,
  ) {
    super();
    this.id = id;
    this._name = name;
    this._lifeSpan = lifeSpan;
    this._literaryGenre = literaryGenre;
    this._affiliations = [];
    this._awards = [];
    this._papers = [];
  }

  // -- Accessors --

  get authorId(): string { return this.id; }
  get name(): FullName { return this._name; }
  get lifeSpan(): LifeSpan { return this._lifeSpan; }
  get literaryGenre(): LiteraryGenre { return this._literaryGenre; }

  // Convenience flat accessors
  get firstName(): string { return this._name.firstName; }
  get lastName(): string { return this._name.lastName; }
  get fullName(): string { return this._name.fullName; }
  get dateOfBirth(): Date { return this._lifeSpan.dateOfBirth; }
  get dateOfDeath(): Date | null { return this._lifeSpan.dateOfDeath; }
  get age(): number { return this._lifeSpan.age; }
  get isDeceased(): boolean { return this._lifeSpan.isDeceased; }
  get literaryGenreId(): string { return this._literaryGenre.id; }
  get literaryGenreName(): string { return this._literaryGenre.name; }

  // Child collections (read-only snapshots)
  get affiliations(): readonly Affiliation[] { return this._affiliations; }
  get awards(): readonly Award[] { return this._awards; }
  get papers(): readonly Paper[] { return this._papers; }

  // Computed — derived from collections
  get activeAffiliations(): Affiliation[] {
    return this._affiliations.filter(a => a.isActive);
  }

  get awardsCount(): number { return this._awards.length; }
  get papersCount(): number { return this._papers.length; }

  // -- Factory --

  static create(
    id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    literaryGenreId: string,
    literaryGenreName: string,
    dateOfDeath?: Date | null,
  ): Author {
    return new Author(
      id,
      FullName.create(firstName, lastName),
      LifeSpan.create(dateOfBirth, dateOfDeath),
      LiteraryGenre.create(literaryGenreId, literaryGenreName),
    );
  }

  // -- Author mutations --

  updateProfile(
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    literaryGenreId: string,
    literaryGenreName: string,
    dateOfDeath?: Date | null,
  ): void {
    this._name = FullName.create(firstName, lastName);
    this._lifeSpan = LifeSpan.create(dateOfBirth, dateOfDeath);
    this._literaryGenre = LiteraryGenre.create(literaryGenreId, literaryGenreName);
    this.ensureChildrenAreWithinLifeSpan();
  }

  // Partial updates — each mirrors a server PATCH operation.
  updateFirstName(firstName: string): void {
    this._name = FullName.create(firstName, this._name.lastName);
  }

  updateLastName(lastName: string): void {
    this._name = FullName.create(this._name.firstName, lastName);
  }

  updateDateOfBirth(dateOfBirth: Date): void {
    this._lifeSpan = LifeSpan.create(dateOfBirth, this._lifeSpan.dateOfDeath);
    this.ensureChildrenAreWithinLifeSpan();
  }

  updateDateOfDeath(dateOfDeath: Date | null): void {
    this._lifeSpan = LifeSpan.create(this._lifeSpan.dateOfBirth, dateOfDeath);
    this.ensureChildrenAreWithinLifeSpan();
  }

  updateLifeSpan(dateOfBirth: Date, dateOfDeath?: Date | null): void {
    this._lifeSpan = LifeSpan.create(dateOfBirth, dateOfDeath);
    this.ensureChildrenAreWithinLifeSpan();
  }

  changeLiteraryGenre(id: string, name: string): void {
    this._literaryGenre = LiteraryGenre.create(id, name);
  }

  // -- Award management --

  addAward(id: string, title: string, awardedOn: Date): Award {
    this.ensureAwardDateWithinLifeSpan(awardedOn);
    this.ensureAwardTitleIsUnique(title);
    const award = Award.create(id, title, awardedOn);
    this._awards.push(award);
    return award;
  }

  updateAward(id: string, title: string, awardedOn: Date): void {
    const award = this.requireAward(id);
    this.ensureAwardDateWithinLifeSpan(awardedOn);
    this.ensureAwardTitleIsUnique(title, id);
    award.update(title, awardedOn);
  }

  removeAward(id: string): void {
    const index = this._awards.findIndex(a => a.id === id);
    if (index !== -1) this._awards.splice(index, 1);
  }

  findAward(id: string): Award | undefined {
    return this._awards.find(a => a.id === id);
  }

  // -- Paper management --

  addPaper(id: string, title: string, publishedOn: Date, url?: string | null): Paper {
    this.ensurePaperDateWithinLifeSpan(publishedOn);
    this.ensurePaperTitleIsUnique(title);
    const paper = Paper.create(id, title, publishedOn, url);
    this._papers.push(paper);
    return paper;
  }

  updatePaper(id: string, title: string, publishedOn: Date, url?: string | null): void {
    const paper = this.requirePaper(id);
    this.ensurePaperDateWithinLifeSpan(publishedOn);
    this.ensurePaperTitleIsUnique(title, id);
    paper.update(title, publishedOn, url);
  }

  removePaper(id: string): void {
    const index = this._papers.findIndex(p => p.id === id);
    if (index !== -1) this._papers.splice(index, 1);
  }

  findPaper(id: string): Paper | undefined {
    return this._papers.find(p => p.id === id);
  }

  // -- Affiliation management --

  addAffiliation(id: string, name: string, startDate: Date, endDate?: Date | null): Affiliation {
    this.ensureAffiliationPeriodWithinLifeSpan(startDate, endDate);
    this.ensureAffiliationNameIsUnique(name);
    const affiliation = Affiliation.create(id, name, startDate, endDate);
    this._affiliations.push(affiliation);
    return affiliation;
  }

  updateAffiliation(id: string, name: string, startDate: Date, endDate?: Date | null): void {
    const affiliation = this.requireAffiliation(id);
    this.ensureAffiliationPeriodWithinLifeSpan(startDate, endDate);
    this.ensureAffiliationNameIsUnique(name, id);
    affiliation.update(name, startDate, endDate);
  }

  removeAffiliation(id: string): void {
    const index = this._affiliations.findIndex(a => a.id === id);
    if (index !== -1) this._affiliations.splice(index, 1);
  }

  findAffiliation(id: string): Affiliation | undefined {
    return this._affiliations.find(a => a.id === id);
  }

  // -- Queries --

  // booksCount comes from outside the aggregate (server rule: no books → can delete).
  canBeDeleted(booksCount: number): boolean {
    return booksCount === 0;
  }

  // -- Private: require helpers --

  private requireAward(id: string): Award {
    const found = this.findAward(id);
    if (!found) throw new NotFoundException('Award', id);
    return found;
  }

  private requirePaper(id: string): Paper {
    const found = this.findPaper(id);
    if (!found) throw new NotFoundException('Paper', id);
    return found;
  }

  private requireAffiliation(id: string): Affiliation {
    const found = this.findAffiliation(id);
    if (!found) throw new NotFoundException('Affiliation', id);
    return found;
  }

  // -- Private: invariant guards --

  // Re-checks all children after a life span change.
  private ensureChildrenAreWithinLifeSpan(): void {
    const dob = this._lifeSpan.dateOfBirth;
    const dod = this._lifeSpan.dateOfDeath;

    for (const award of this._awards) {
      if (award.awardedOn < dob || (dod && award.awardedOn > dod)) {
        throw new InvalidAwardDateException(award.awardedOn, dob, dod);
      }
    }

    for (const paper of this._papers) {
      if (paper.publishedOn < dob || (dod && paper.publishedOn > dod)) {
        throw new InvalidPaperDateException(paper.publishedOn, dob, dod);
      }
    }

    for (const affiliation of this._affiliations) {
      this.ensureAffiliationPeriodWithinLifeSpan(affiliation.startDate, affiliation.endDate);
    }
  }

  private ensureAwardDateWithinLifeSpan(awardedOn: Date): void {
    const dob = this._lifeSpan.dateOfBirth;
    const dod = this._lifeSpan.dateOfDeath;
    if (awardedOn < dob || (dod && awardedOn > dod)) {
      throw new InvalidAwardDateException(awardedOn, dob, dod);
    }
  }

  private ensureAwardTitleIsUnique(title: string, ignoreId?: string): void {
    const exists = this._awards.some(
      a => a.titleValue.toLowerCase() === title.toLowerCase() && a.id !== ignoreId,
    );
    if (exists) throw new DuplicateAwardTitleException(title);
  }

  private ensurePaperDateWithinLifeSpan(publishedOn: Date): void {
    const dob = this._lifeSpan.dateOfBirth;
    const dod = this._lifeSpan.dateOfDeath;
    if (publishedOn < dob || (dod && publishedOn > dod)) {
      throw new InvalidPaperDateException(publishedOn, dob, dod);
    }
  }

  private ensurePaperTitleIsUnique(title: string, ignoreId?: string): void {
    const exists = this._papers.some(
      p => p.titleValue.toLowerCase() === title.toLowerCase() && p.id !== ignoreId,
    );
    if (exists) throw new DuplicatePaperTitleException(title);
  }

  private ensureAffiliationPeriodWithinLifeSpan(startDate: Date, endDate?: Date | null): void {
    const dob = this._lifeSpan.dateOfBirth;
    const dod = this._lifeSpan.dateOfDeath;

    if (startDate < dob || (dod && startDate > dod)) {
      throw InvalidAffiliationDateException.forStartDate(startDate, dob, dod);
    }
    if (endDate && (endDate < dob || (dod && endDate > dod))) {
      throw InvalidAffiliationDateException.forEndDate(endDate, dob, dod);
    }
  }

  private ensureAffiliationNameIsUnique(name: string, ignoreId?: string): void {
    const exists = this._affiliations.some(
      a => a.nameValue.toLowerCase() === name.toLowerCase() && a.id !== ignoreId,
    );
    if (exists) throw new DuplicateAffiliationNameException(name);
  }
}
