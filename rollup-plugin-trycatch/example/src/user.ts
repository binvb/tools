class User {
  static age: number = 17
  constructor() {}
  public static getAge() {
    throw new Error('pretend be error')
    return this.age
  }
}

export default User