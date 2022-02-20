module.exports = () => async (req, res, next) => {
  const id = await req.params.id;
  if (id.length !== 24) {
    return res.status(400).json({
      success: false,
      error: 'The length of id is error',
    });
  }
  next();
};
