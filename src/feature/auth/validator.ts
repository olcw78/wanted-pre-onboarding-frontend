export class Validator {
  /* prevent ctor */
  private Validator() {}

  public static validateEmail(email: string) {
    return email.includes("@");
  }

  public static validatePassword(password: string) {
    return password.length >= 8;
  }
}
