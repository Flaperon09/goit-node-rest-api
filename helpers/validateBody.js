import HttpError from "./HttpError.js";

const validateBody = (schema) => {
  console.log("вход в валидатор");
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateBody;