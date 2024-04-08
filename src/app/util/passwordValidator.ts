export class PasswordValidator {
  private _alphanumericRegex = /[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))$/g;
  public validate(password: string, confirmPassword?: string) {
    const newPassword = password.trim();
    if (!newPassword) {
      throw new Error("Empty Field or only space is invalid.");
    }

    if (!newPassword.match(this._alphanumericRegex)) {
      throw new Error(
        "Password should be alphanumeric with at least one Uppercase/Lowercase and special character with min length 8"
      );
    }
    if (newPassword.length < 8) {
      throw new Error("Password should be alphanumeric with at least one Uppercase/Lowercase and special character with min length 8");
    }

    if (confirmPassword && confirmPassword !== password) {
      throw new Error("Password and Confirm Password should be same");
    }
  }
}
