const yup = require('yup');
const UsersService = require("../services/UsersService");
const BadRequestError = require('../customerror/BadRequest');
const NotFoundError = require('../customerror/NotFound');
const ForbiddenError = require('../customerror/Forbidden');
const ValidationError = require('../customerror/Validation');
const UnauthorizedError = require('../customerror/Unauthorized');

// Validation Schemas
const signInSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  bio: yup.string()
});

const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required')
});

const updateProfileSchema = yup.object({
  username: yup.string(),
  firstName: yup.string(),
  lastName: yup.string(),
  bio: yup.string()
});

const signInUser = async (req, res) => {
  const payload = req.body;

  try {
    await signInSchema.validate(payload, { abortEarly: false });
  } catch (validationError) {
    throw new ValidationError(validationError.errors.join(', '));
  }

  // Pass errors from Service (e.g. database unique constraint) - Express catches them.
  // ErrorHandler handles 'SequelizeUniqueConstraintError' automatically.
  const result = await UsersService.signInUser(payload);
  return res.status(201).json({ message: "User created successfully", ...result });
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    await loginSchema.validate({ email, password }, { abortEarly: false });
  } catch (validationError) {
    throw new ValidationError(validationError.errors.join(', '));
  }

  try {
    const result = await UsersService.loginUser(email, password);

    if (!result) {
      throw new NotFoundError("User not found");
    }

    return res.status(200).json(result);
  } catch (error) {
    if (error.message === "Invalid password") {
      throw new BadRequestError("Invalid password");
    }
    throw error;
  }
}

const getUsersById = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new BadRequestError("User ID is required");
  }

  const retrievedUser = await UsersService.getUserById(userId);

  if (!retrievedUser) {
    throw new NotFoundError("User not found");
  }

  return res.status(200).json({ message: retrievedUser });
}

const getAllUsers = async (req, res) => {
  const users = await UsersService.getAllUsers();

  // Service returns empty array if no users.
  if (!users || users.length === 0) {
    return res.status(200).json({ message: [] });
  }

  return res.status(200).json({ message: users });
}

const updateProfileData = async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;

  if (!userId) {
    throw new BadRequestError("User ID is required");
  }

  try {
    await updateProfileSchema.validate(updates, { abortEarly: false });
  } catch (error) {
    throw new ValidationError(error.errors.join(', '));
  }

  const updatedUser = await UsersService.updateProfileData(userId, updates);
  if (!updatedUser) {
    throw new NotFoundError("User not found");
  }
  return res.status(200).json({ message: updatedUser });
}

const deleteUsers = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new BadRequestError("User ID is required");
  }

  const success = await UsersService.deleteUser(userId);

  if (success) {
    return res.status(200).json({ message: "Successfully deleted" });
  } else {
    throw new NotFoundError("User not found or already deleted");
  }
}

module.exports = {
  signInUser,
  loginUser,
  getAllUsers,
  getUsersById,
  updateProfileData,
  deleteUsers
}