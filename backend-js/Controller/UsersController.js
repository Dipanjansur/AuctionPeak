const Users = require("../models/Users");
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const signInUser = async (req, res) => {
  const { username, password, firstName, lastname, email } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
      usersId: uuidv4(),
      username,
      firstName,
      lastname,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "User created successfully", userId: newUser.usersId });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({
      where: {
        email: email
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", userId: user.userId });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
}

const getUsersById = async (req, res) => {
  const { userId } = req.params;
  // Assuming you will process and validate auction update data here
  try {
    const retrievedUser = await Users.findOne({
      where: {
        usersId: userId,
      },
    });
    if (retrievedUser == null) {
      return res.status(400).json({ message: "no entity found" })
    }
    return res.status(200).json({ message: retrievedUser });
  }
  catch (err) {
    return res.status(500).json({ message: "something went wrong" })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const retrievedUser = await Users.findAll();
    if (retrievedUser == null) {
      return res.status(400).json({ message: "no entity found" })
    }
    return res.status(200).json({ message: retrievedUser })
  }
  catch (err) {
    return res.status(500).json({ message: "something went wrong" })
  }
}

const updateProfileData = async (req, res) => {
  const { userId } = req.params;
  // Assuming you will handle auction deletion here
  res.status(200).json({ message: `updateProfileData with ID: ${userId}` });
}
const deleteUsers = async (req, res) => {
  const { userId } = req.params;
  // Assuming you will handle auction deletion here
  try {
    const RetrivedUser = await Users.destroy({
      where: {
        usersId: userId,
      },
    });
    if (RetrivedUser == 1) {
      return res.status(200).json({ message: "sucessfully deleted" });
    } else {
      return res.status(200).json({ message: RetrivedUser });
    }
  }
  catch (err) {
    console.log("something unexpected" + err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
}

module.exports = {
  signInUser, loginUser, getAllUsers, getUsersById, updateProfileData, deleteUsers
}