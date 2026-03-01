import { Author } from '../../domain/aggregates/author';
import { FullName } from '../../domain/value-objects/full-name';
import { LifeSpan } from '../../domain/value-objects/life-span';
import { LiteraryGenre } from '../../domain/value-objects/literary-genre';
import { AwardTitle } from '../../domain/value-objects/award-title';
import { PaperTitle } from '../../domain/value-objects/paper-title';
import { AffiliationName } from '../../domain/value-objects/affiliation-name';
import { AffiliationPeriod } from '../../domain/value-objects/affiliation-period';
import type { AuthorDto, AwardDto, PaperDto, AffiliationDto } from '../rest-clients/dtos';

export class AuthorDtoMapper {
  private constructor() {}

  static fromDto(dto: AuthorDto): Author {
    return Author.create(
      dto.authorId,
      FullName.create(dto.firstName, dto.lastName),
      LifeSpan.create(new Date(dto.dateOfBirth), dto.dateOfDeath ? new Date(dto.dateOfDeath) : null),
      LiteraryGenre.create(dto.literaryGenreId, dto.literaryGenreName),
    );
  }

  static addChildren(
    author: Author,
    awards: readonly AwardDto[],
    papers: readonly PaperDto[],
    affiliations: readonly AffiliationDto[],
  ): Author {
    for (const a of awards) {
      author.addAward(a.awardId, AwardTitle.create(a.title), new Date(a.awardedOn));
    }

    for (const p of papers) {
      author.addPaper(p.paperId, PaperTitle.create(p.title), new Date(p.publishedOn), p.url);
    }

    for (const af of affiliations) {
      author.addAffiliation(
        af.affiliationId,
        AffiliationName.create(af.institutionName),
        AffiliationPeriod.create(new Date(af.startDate), af.endDate ? new Date(af.endDate) : null),
      );
    }

    return author;
  }

  static rehydrate(
    dto: AuthorDto,
    awards: readonly AwardDto[],
    papers: readonly PaperDto[],
    affiliations: readonly AffiliationDto[],
  ): Author {
    return AuthorDtoMapper.addChildren(AuthorDtoMapper.fromDto(dto), awards, papers, affiliations);
  }
}
