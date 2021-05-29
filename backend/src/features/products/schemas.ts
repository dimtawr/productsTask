import joi from 'joi';
import ApiError from '../../common/ApiError';
import { Products } from './repositories';

const productsSchema = joi.object({
  name: joi.string().min(3).max(64).required().messages({
    'any.required': `Field 'Name' must exist`,
    'string.base': `Field 'Name' must be a string`,
    'string.min': `Field 'Name' must be more 2 symbols`,
    'string.max': `Field 'Name' must be less 64 symbols`,
  }),

  price: joi.number().min(0).required().messages({
    'any.required': `Field 'Price' must exist`,
    'number.base': `Field 'Price' must be a number`,
    'number.min': `Field 'Price' must be positive`,
  }),

  amount: joi.number().min(0).required().messages({
    'any.required': `Field 'Amount' must exist`,
    'number.base': `Field 'Amount' must be a number`,
    'number.min': `Field 'Amount' must be positive`,
  }),
});

const addValidation = (body: Products) => {
  const result = productsSchema.validate(body);
  return result.error;
};

const uuidValidation = (uuid: string) => {
  const result = joi
    .string()
    .uuid()
    .required()
    .messages({
      'any.required': `UUID must exist`,
      'string.base': `UUID must be a string`,
      'string.guid': `UUID not correct`,
    })
    .validate(uuid);
  return result.error;
};

const editValidation = ({ uid, body }: { uid: string; body: Products }) => {
  const uidResult = uuidValidation(uid);
  const bodyResult = addValidation(body);
  return uidResult ? uidResult : bodyResult;
};

const nameValidation = (name: string) => {
  const result = joi
    .string()
    .min(3)
    .required()
    .messages({
      'any.required': `Name must exist`,
      'string.base': `Name must be a string`,
      'string.min': 'Min 3 symbols',
    })
    .validate(name);
  return result.error;
};

const priceRangeValidation = ({ after, before }: { after: Number; before: Number }) => {
  const schema = joi.object({
    after: joi.number().min(0).required().messages({
      'any.required': `'After' must exist`,
      'number.base': `'After' must be a number`,
      'number.min': `'After' must be a positive`,
    }),
    before: joi.number().when('after', {
      is: joi.number().required(),
      then: joi.number().greater(joi.ref('after')),
    }),
  });
  const result = schema.validate({ after, before });
  return result.error;
};

export { uuidValidation, editValidation, addValidation, nameValidation, priceRangeValidation };
