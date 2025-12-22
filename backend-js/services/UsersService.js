const Users = require("../models/Users");
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { generateAuthToken } = require("../utils/JwtHelper");
const Logging = require("../utils/Logger");
const { Logging_level, Entity, Events, Models } = require("../utils/LoggerParams");

const signInUser = async (userData) => {
    const { username, password, firstName, lastName, email, bio } = userData;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
        usersId: uuidv4(),
        username,
        firstName,
        lastName,
        email,
        bio,
        password: hashedPassword
    });

    Logging(
        Logging_level.info,
        Entity.Service,
        Events.CREATE_OP,
        `User created: ${newUser.usersId}`,
        Models.Users
    );

    const jwttoken = generateAuthToken(newUser);
    return { userId: newUser.usersId, jwt: jwttoken };
};

const loginUser = async (email, password) => {
    const user = await Users.findOne({
        where: {
            email: email
        },
        attributes: { include: ['password'] } // Explicitly include password for check
    });

    if (!user) {
        return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid password");
    }

    Logging(
        Logging_level.info,
        Entity.Service,
        Events.READ_OP,
        `User logged in: ${user.usersId}`,
        Models.Users
    );

    const jwttoken = generateAuthToken(user);
    return { userId: user.usersId, jwt: jwttoken };
};

const getUserById = async (userId) => {
    const user = await Users.findOne({
        where: {
            usersId: userId,
        },
        attributes: { exclude: ['password'] } // Security: don't return password
    });

    if (!user) {
        return null;
    }

    return user;
};

const getAllUsers = async () => {
    const users = await Users.findAll({
        attributes: { exclude: ['password'] }
    });

    if (!users || users.length === 0) {
        return [];
    }

    return users;
};

const updateProfileData = async (userId, updates) => {
    //  Implement update logic
    const user = await Users.findOne({ where: { usersId: userId } });
    if (!user) return null;

    if (updates.username) user.username = updates.username;
    if (updates.firstName) user.firstName = updates.firstName;
    if (updates.lastName) user.lastName = updates.lastName;
    if (updates.bio) user.bio = updates.bio;
    // Handle password update separately or here carefully

    await user.save();
    return user;
};

const deleteUser = async (userId) => {
    const deletedCount = await Users.destroy({
        where: {
            usersId: userId,
        },
    });

    if (deletedCount === 0) {
        return false;
    }

    Logging(
        Logging_level.info,
        Entity.Service,
        Events.DELETE_OP,
        `User deleted: ${userId}`,
        Models.Users
    );

    return true;
};

module.exports = {
    signInUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateProfileData,
    deleteUser
};
