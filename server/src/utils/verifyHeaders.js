module.exports = (req, res, next) => {
  const contentType = req.headers['content-type'];
  if (/POST|PUT/.test(req.method) && !contentType.includes('application/json')) {
    return res.status(406).json({
      success: false,
      error: 'Your content-type must be correct',
    });
  }
  next();
};
