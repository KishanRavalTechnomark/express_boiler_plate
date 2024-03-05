import * as Joi from "joi";

export const userRegisterSchema = Joi.object({
  organizationId: Joi.number().integer(),
  firstName: Joi.string().trim().max(50).required(),
  middleName: Joi.string().trim().max(50).required(),
  lastName: Joi.string().trim().max(50).required(),
  email: Joi.string().trim().email().max(100).required(),
  // phoneNumber: Joi.string().trim().regex(  /^\+(?:[0-9] ?){6,14}[0-9]$/).required(),
  phoneNumber: Joi.string()
  .pattern(/^[0-9]{10}$/) 
  .message('Phone number must be a valid numeric string with a length of 10 digits'),
  gender: Joi.string().trim(),
  location: Joi.string().trim(),
  employeeCode: Joi.string().trim().max(50),
  department: Joi.string().trim(),
  process: Joi.string().trim(),
  role: Joi.string().trim(),
  designation: Joi.string().trim(),
  isApprover: Joi.boolean(),
  rightToRequistion: Joi.boolean(),
  requistionInAMonth: Joi.number().integer().min(0),
  startDate: Joi.date(),
  endDate: Joi.date(),
  password: Joi.string().trim().min(8)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
  .required()
  .messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 8 characters long',
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
    'any.required': 'Password is required',
  }),
  emailConfirmed: Joi.boolean(),
  rememberMe: Joi.boolean(),
  ssoLogin: Joi.boolean(),
  isDepartmentHead: Joi.boolean(),
  isReportingManager: Joi.boolean(),
  isActive: Joi.boolean(),
  isDelete: Joi.boolean(),
  deletedOn: Joi.date(),
  createdBy: Joi.number().integer().min(1),
  createdOn: Joi.date(),
  updatedBy: Joi.number().integer().min(1),
  updatedOn: Joi.date(),
});

export const userLoginSchema = Joi.object({
  password: Joi.string()
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } }) 
    .required(),
});

export const userForgetPasswordSchema =  Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } }) 
    .required(),
}).unknown(true);

export const userResetPasswordSchema = Joi.object({
  password:  Joi.string().trim().min(8)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
  .required()
  .messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 8 characters long',
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
    'any.required': 'Password is required',
  }),
  confirmPassword:Joi.string().trim()
  .valid(Joi.ref('password'))
  .required()
  .messages({
    'any.only': 'Passwords do not match',
    'any.required': 'Password confirmation is required',
  })
}).unknown(true);
