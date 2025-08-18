

import jwt from 'jsonwebtoken';
import AppError from '../../errorHelpers/AppError';
import { TUser } from '../user/user.interface';
import httpStatus from 'http-status-codes';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { envVars } from '../../config/env';

const registerUserIntoDB = async (payload: TUser) => {
    if (payload.role === 'admin') {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            'Only Super Admin can create an Admin account.'
        );
    } else if (payload.role === 'trainer') {
        throw new AppError(
           httpStatus.UNAUTHORIZED,
            'Only Admin can create a Trainer account.'
        );
    }

    const user = await User.create(payload);

    const result = await User.findById(user._id)
        .select('_id name email isBlocked role')
        .lean();
    return result;
};
const loginUser = async (payload: TLoginUser) => {
    const user = await User.isUserExistsByEmail(payload?.email);

    // checking if the user is exist
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
    }
    // checking if the user is Blocked
    await User.isUserBlocked(user.isBlocked);

    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!');
    }

    // create token and send to the client
    const jwtPayload = {
        userId: user._id,
        userEmail: user.email,
        role: user.role
    };

    const accessToken = jwt.sign(
        jwtPayload,
         envVars.JWT_ACCESS_SECRET as string,
        {
            expiresIn: '30d'
        }
    );

    return { token: accessToken };
};

export const AuthServices = {
    registerUserIntoDB,
    loginUser
};