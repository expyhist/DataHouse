module.exports = (req, res, next) => {
  const { id } = req.params;
  if (id.length !== 24) {
    return res.status(400).json({
      success: false,
      msg: 'The length of id is error',
    });
  }
  next();
};
