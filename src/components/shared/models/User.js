/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.name = null;
    this.username = null;
    this.password = null;
    this.token = null;
    this.status = null;
    this.games = null;
    this.moves = null;
    this.birthday = null;
    this.creationDate = null;
    Object.assign(this, data);
  }
}
export default User;
