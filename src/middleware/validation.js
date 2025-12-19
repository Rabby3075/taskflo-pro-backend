import Joi from "joi";

// Validation middleware factory
export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message).join(", ");
      return res.status(400).json({ message: errors });
    }
    next();
  };
};

// Vadlidation schemas
export const registerSchema = Joi.object({
  name: Joi.string().required().trim().messages({
    "string.empty": "Please enter your full name",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().trim().messages({
    "string.empty": "Please enter your email address",
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Please enter a password",
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().trim().messages({
    "string.empty": "Please enter your email address",
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Please enter a password",
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

//task creation schema

export const taskSchema = Joi.object({
  title: Joi.string().required().trim().messages({
    "string.empty": "Please enter task title",
    "any.required": "Title is required",
  }),
  description: Joi.string().allow("").trim(),
  status: Joi.string()
    .valid("pending", "in-progress", "completed")
    .default("pending")
    .messages({
      "any.only": "Status must be one of pending, in-progress, or completed",
    }),
  dueDate: Joi.date().min("now").required().messages({
    "date.base": "Due date must be a valid date",
    "date.min": "Due date cannot be in the past",
    "any.required": "Due date is required",
  }),

  createdAt: Joi.date().optional().strip(),
});

//task update schema
export const updateTaskSchema = Joi.object({
  title: Joi.string().optional().trim(),
  // Allow empty description on update, same as create schema
  description: Joi.string().allow("").trim(),
  status: Joi.string().valid("pending", "in-progress", "completed").messages({
    "any.only": "Status must be one of pending, in-progress, or completed",
  }),
  dueDate: Joi.date().min("now").messages({
    "date.base": "Due date must be a valid date",
    "date.min": "Due date cannot be in the past",
    "any.required": "Due date is required",
  }),
  createdAt: Joi.string().optional().strip(),
});
