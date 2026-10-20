// middleware to validate request bodies against Zod schemas

const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    const issues = err.issues || err.errors || [];
    const errors = issues.map((i) => ({
      field: Array.isArray(i.path) ? i.path.join(".") : "",
      message: i.message,
    }));
    const first = errors[0];
    return res.status(400).json({
      message: first
        ? `Validation error: ${first.field ? first.field + " - " : ""}${first.message}`
        : "Validation error",
      errors,
    });
  }
};

module.exports = validate;
