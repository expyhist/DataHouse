const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth-config');
const User = require('../models/user-model');

const createUser = async (req, res) => {
  try {
    const resp = await User.create(req.body);
    return res.status(201).json({
      success: true,
      id: resp._id,
      message: 'user created',
    });
  } catch (error) {
    return res.status(422).json({
      success: false,
      error: error.toString(),
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    const resp = await User.findByIdAndUpdate(req.params.id, req.body);
    return res.status(201).json({
      success: true,
      id: resp._id,
      message: 'user updated',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.toString(),
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const resp = await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      id: resp._id,
      message: 'user deleted',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.toString(),
    });
  }
};

const getUser = async (req, res) => {
  try {
    const resp = await User.findOne({ username: req.body.username });

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      resp ? resp.password : '',
    );

    if (!resp || !passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password or Username!',
      });
    }

    const token = jwt.sign({ id: resp.id }, config.secret, { expiresIn: 86400 });

    const authorities = [];

    for (let i = 0; i < resp.roles.length; i++) {
      authorities.push(`ROLE_${resp.roles[i].name.toUpperCase()}`);
    }

    return res.status(200).json({
      success: true,
      id: resp._id,
      username: resp.username,
      email: resp.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.toString(),
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const resp = await User.find({});
    return res.status(200).json({
      success: true,
      data: resp,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.toString(),
    });
  }
};

module.exports = {
  createUser,
  updateUserById,
  deleteUserById,
  getUser,
  getAllUsers,
};
