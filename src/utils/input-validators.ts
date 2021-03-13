export class Validator {
  static isEmailFormatValid(rule: any, value: string, callback: Function) {
    const emailRegexPattern = '^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$';
    const emailMatched = new RegExp(emailRegexPattern).test(value);

    if (emailMatched) {
      callback();
    }

    callback(new Error('Email không đúng dịnh dạng !'));
  }
}
