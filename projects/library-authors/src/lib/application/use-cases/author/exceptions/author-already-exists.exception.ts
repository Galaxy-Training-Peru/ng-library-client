export class AuthorAlreadyExistsException extends Error {
  constructor(firstName: string, lastName: string) {
    super(`Author '${firstName} ${lastName}' already exists.`);
    this.name = 'AuthorAlreadyExistsException';
  }
}
