module.exports = (model) => async (req, res, next) => {
  try {
    const id = await req.params.id;
    if (id.length !== 24) {
      return res.status(400).json({
        success: false,
        error: 'The id is error',
      });
    }

    const isExists = await model.exists({ _id: id });
    if (!isExists) {
      return res.status(400).json({
        success: false,
        error: 'The id is not existent',
      });
    }
    next();
  } catch (error) {
    next();
  }
};
