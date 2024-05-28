const signInUser = (req, res) => {
  res.status(200).json({ message: "Sign In user" });
}

const loginUser = (req, res) => {
  res.status(200).json({ message: `login user` });
}

const getUsersById = (req, res) => {
  const { userId } = req.params;
  // Assuming you will process and validate auction update data here
  res.status(200).json({ message: `getUsersById with ID: ${userId}` });
}

const getAllUsers = (req, res) => {
  // Assuming you will process and validate auction update data here
  res.status(200).json({ message: `getAllUsers` });
}

const updateProfileData = (req, res) => {
  const { userId } = req.params;
  // Assuming you will handle auction deletion here
  res.status(200).json({ message: `updateProfileData with ID: ${userId}` });
}
const deleteUsers = (req, res) => {
  const { userId } = req.params;
  // Assuming you will handle auction deletion here
  res.status(200).json({ message: `deleteUsers with ID: ${userId}` });
}

module.exports = {
  signInUser, loginUser, getAllUsers, getUsersById, updateProfileData, deleteUsers
}