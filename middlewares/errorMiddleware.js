const errorMiddleware = (err, _req, res, _next) => {
  if (err.isJoi && err.details[0].type === 'string.min') {
      return res.status(422).json({ message: err.message }).end();
  } 

  switch (err.name) {
    case 'ValidationError':
      res.status(400).json({ message: err.message });
      break;
    case 'ProductNotFoundError':
      res.status(404).json({ message: err.message });
      break;
    default:
      res.status(500).json({ message: err.message });
  }
};

module.exports = errorMiddleware; 