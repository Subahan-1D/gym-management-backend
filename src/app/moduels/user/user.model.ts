/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcryptjs';
import { UserRole } from './user.constant';
import { envVars } from '../../config/env';
import AppError from '../../errorHelpers/AppError';
import httpStatus from 'http-status-codes';

// Defining the User schema
const userSchema = new Schema<TUser, UserModel>(
    {
        name: {
            type: String,
            required: [true, 'Name id is required']
        },
        email: {
            type: String,
            required: [true, 'Email id is required'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Password id is required'],
            select: 0 // Password will not be selected by default
        },
        role: {
            type: String,
            enum: {
                values: UserRole, 
                message: '{VALUE} is not a valid user role.'
            },
            required: [true, 'role is required.']
        },
        isBlocked: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

// Middleware to hash the password before saving the user
userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(envVars.BCRYPT_SALT_ROUND)
    );
    next();
});

// Static method to check if a user exists by their email
userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await User.findOne({ email }).select('+password');
};

// Static method to check if a user is blocked
userSchema.statics.isUserBlocked = async function (isBlocked: boolean) {
    if (isBlocked) {
        throw new AppError(
            httpStatus.FORBIDDEN,
            'This account is currently blocked.'
        );
    }
    return isBlocked;
};
// Static method to compare a plain text password with a hashed password
userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);