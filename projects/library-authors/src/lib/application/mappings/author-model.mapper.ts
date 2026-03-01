import type { Author } from '../../domain/aggregates/author';
import type { AuthorModel } from '../models';

export class AuthorModelMapper {
  private constructor() {}

  static toModel(author: Author): AuthorModel {
    return {
      authorId:          author.authorId,
      firstName:         author.firstName,
      lastName:          author.lastName,
      fullName:          author.fullName,
      dateOfBirth:       author.dateOfBirth.toISOString(),
      dateOfDeath:       author.dateOfDeath?.toISOString() ?? null,
      age:               author.age,
      isDeceased:        author.isDeceased,
      literaryGenreId:   author.literaryGenreId,
      literaryGenreName: author.literaryGenreName,
    };
  }
}
