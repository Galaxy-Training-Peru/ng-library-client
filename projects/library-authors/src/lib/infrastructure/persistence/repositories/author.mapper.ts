import type { AffiliationModel, AuthorModel, AwardModel, PaperModel } from '../../../application/models';
import { Author } from '../../../domain/aggregates/author';

// Maps HTTP response models to Author domain entities.
// Used exclusively by AuthorRepositoryImpl to reconstruct aggregates.
export class AuthorMapper {
  private constructor() {}

  // Build Author from flat model only (no child collections).
  // Suitable for list views where collections are not required.
  static fromModel(model: AuthorModel): Author {
    return Author.create(
      model.authorId,
      model.firstName,
      model.lastName,
      new Date(model.dateOfBirth),
      model.literaryGenreId,
      model.literaryGenreName,
      model.dateOfDeath ? new Date(model.dateOfDeath) : null,
    );
  }

  // Reconstruct Author with all child collections loaded from the API.
  // Suitable for aggregate operations that require full state.
  static rehydrate(
    model: AuthorModel,
    awards: readonly AwardModel[],
    papers: readonly PaperModel[],
    affiliations: readonly AffiliationModel[],
  ): Author {
    const author = AuthorMapper.fromModel(model);

    for (const a of awards) {
      author.addAward(a.awardId, a.title, new Date(a.awardedOn));
    }

    for (const p of papers) {
      author.addPaper(p.paperId, p.title, new Date(p.publishedOn), p.url);
    }

    for (const af of affiliations) {
      author.addAffiliation(
        af.affiliationId,
        af.institutionName,
        new Date(af.startDate),
        af.endDate ? new Date(af.endDate) : null,
      );
    }

    return author;
  }
}
