const formatZodError = (errors) => {
  return errors.map((error) => {
    if (error.path && error.path.length > 0) {
      return `${error.path.join('.')} ${error.message}`;
    }
    return error.message;
  }).join('\n');
};

 module.exports = formatZodError