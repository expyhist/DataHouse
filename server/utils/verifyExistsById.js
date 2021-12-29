module.exports = (model, methodRegx) => async (req, res, next) => {
  const isExists = await model.exists({ _id: req.params.id });
  if (methodRegx.test(req.method) && /\/\w+/.test(req.url) && isExists) {
    return res.status(400).json({
      success: false,
      error: 'The apitable do not existent',
    });
  }
  next();
};
