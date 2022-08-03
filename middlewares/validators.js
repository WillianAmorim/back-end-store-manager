const runSchema = (schema) => (value) => {
  const result = schema.validateAsync(value);
  return result;
};

module.exports = {
  runSchema,
}; 