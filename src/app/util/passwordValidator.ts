export class PasswordValidator {
  private _alphanumericRegex = /([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+)$/g;
  public validate(password: string, confirmPassword?: string) {
    console.log(`password: ${password}, confirmPassword: ${confirmPassword}`);
    const newPassword = password.trim();
    if (!newPassword) {
      throw new Error("Empty Field or only space is invalid.");
    }
    if (newPassword.length < 8) {
      throw new Error("Password must be of minimum 8 characters");
    }

    if (!newPassword.match(this._alphanumericRegex)) {
      throw new Error(
        "Password must be alphanumeric only, without any special character."
      );
    }

    if (confirmPassword && confirmPassword !== password) {
      throw new Error("Password and Confirm Password should be same");
    }
  }
}
