export class AuthorNotFoundException extends Error {
  constructor(authorId: string) {
    super(`Author with id '${authorId}' was not found.`);
    this.name = 'AuthorNotFoundException';
  }
}
