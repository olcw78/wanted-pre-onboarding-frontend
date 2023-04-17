export const validator = {
  validateEmail: function (email: string) {
    return email.includes("@");
  },
  validatePassword: function (password: string) {
    return password.length >= 8;
  }
};
