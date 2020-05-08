export class PasswordValidator {
  private _alphanumericRegex = /[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))$/g;
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
        "Password must be contain atleast 1 number and 1 alphabet."
      );
    }

    if (confirmPassword && confirmPassword !== password) {
      throw new Error("Password and Confirm Password should be same");
    }
  }
}
