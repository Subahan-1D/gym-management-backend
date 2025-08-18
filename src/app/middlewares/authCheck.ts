/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status-codes';
import { envVars } from '../config/env';
import { TUserRole } from '../moduels/user/user.interface';
import AppError from '../errorHelpers/AppError';
import { User } from '../moduels/user/user.model';

export interface CustomRequest extends Request {
    user: JwtPayload;
}
const authCheck = (...requiredRoles: TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization?.split(' ')[1];
            // if the token is sent from the client
            if (!token) {
                throw new AppError(
                   httpStatus.UNAUTHORIZED,
                    'You are not authorized!'
                );
            }
            // checking if the given token is valid
            let decoded;

            try {
                decoded = jwt.verify(
                    token,
                    envVars.JWT_ACCESS_SECRET as string
                ) as JwtPayload;
            } catch (err) {
                throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
            }

            const { role, userEmail, iat } = decoded;

            const user = await User.findOne({ email: userEmail });

            if (!user) {
                throw new AppError(
                   httpStatus.NOT_FOUND,
                    'The user is not found'
                );
            }

            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError(
                   httpStatus.UNAUTHORIZED,
                    'You are not authorized!'
                );
            }
            req.user = decoded as JwtPayload;
            next();
        }
    );
};

export default authCheck;