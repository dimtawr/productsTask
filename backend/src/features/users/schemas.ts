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

const loginSchema = joi.string().regex(/^.*$/).required().min(5).max(30).messages({
  'any.required': `Поле login должно существовать`,
  'string.base': `Тип login должен быть string`,
  'string.min': `Минимум 5 символов в поле login`,
  'string.max': `Максимум 30 символов в поле login`,
  'string.pattern.base': `Используйте только латиницу и/или цифры`,
});

function authValidation({ login, password, confirmPassword }: User) {
  if (!password || password === '') return { message: 'Please enter password' };
  if (password !== confirmPassword) return { message: 'Password mismatch' };
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
  return checkLogin.error;
}

export default authValidation;
