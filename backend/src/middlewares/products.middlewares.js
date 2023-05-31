const validateId = (data) => !(!data);

const validateProductName = (name) => {
if (!name) return { type: 400, message: '"name" is required' };
if (name.length < 5) {
 return { 
  type: 422, message: '"name" length must be at least 5 characters long', 
};
} return { type: 200, message: 'ok' }; 
};

module.exports = {
  validateId,
  validateProductName,
};
