module.exports = (req, res, next) => {
  const contentType = req.headers['content-type'];
  if (req.method === 'POST' && !contentType.includes('application/json')) {
    return res.status(406).json({
      success: false,
      error: 'Your content-type must be correct',
    });
  }
  next();
};
