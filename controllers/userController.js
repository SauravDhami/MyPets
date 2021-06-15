/* eslint-disable prettier/prettier */
const User = require('../models/userModel');

const catchAsync = require('../helpers/catchAsync');
const AppError = require('../helpers/appError');
const factory = require('../controllers/handlerFactory');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};

    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.getMe = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) return next(new AppError('The user data couldnot be obtained!', 401));

    res.status(200).json({
        status: 'success',
        data: user,
    });
});

exports.updateMe = catchAsync(async (req, res, next) => {
    //*1.Create error if user post password data
    if (req.body.password) {
        return next(new AppError('You are not allowed to update password', 400));
    }

    //*2. Update user document
    const filterBody = filterObj(req.body, 'name', 'email', 'contact', 'address');

    const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: 'success',
        data: updatedUser,
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, {
        active: false,
    });

    res.status(200).json({
        status: 'success',
        message: ' The user is successfully deleted!!',
    });
});

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);

exports.getAllUsers = factory.getAll(User);

exports.getOneUser = factory.getOne(User);

exports.createUser = factory.createOne(User);
