import joi from 'joi';
import passwordComplexity from 'joi-password-complexity';
import { User } from './repositories';

const complexityOptions = {
  min: 6,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  requirementCount: 5,
};

const loginSchema = joi
  .string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } })
  .required()
  .messages({
    'any.required': `Field 'login' must exist`,
    'string.base': `Type of 'login' must be a string`,
    'string.email': `'Login' is incorrect email address`,
  });

function authValidation({ login, password }: User) {
  if (!password || password === '') return { message: 'Please enter password' };
  const result = passwordComplexity(complexityOptions).validate(password);
  let resultError = '';
  result.error
    ? result.error.details.forEach((v) => {
        switch (v.type) {
          case 'passwordComplexity.tooShort': {
            resultError += 'Too short\n ';
            break;
          }
          case 'passwordComplexity.uppercase': {
            resultError += 'Must have 1 uppercase symbol\n';
            break;
          }
          case 'passwordComplexity.numeric': {
            resultError += 'Must have 1 numeric\n';
            break;
          }
          case 'passwordComplexity.tooLong': {
            resultError += 'Too long, must be less 30 symbols\n';
            break;
          }
          case 'passwordComplexity.lowercase': {
            resultError += 'Must have 1 lower case symbol\n';
            break;
          }
        }
      })
    : null;
  if (resultError !== '') return { message: `Password:\n` + resultError };
  const checkLogin = loginSchema.validate(login);
  console.log(checkLogin.error);
  return checkLogin.error;
}

function registrValidation({ login, password, confirmPassword }: User) {
  if (password !== confirmPassword) return { message: 'Password mismatch' };
  return authValidation({ login, password });
}

export { authValidation, registrValidation };
