/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errorHelpers/AppError";
import httpStatus from 'http-status-codes';
import { User } from "./user.model";
import mongoose from "mongoose";
import { TUser } from "./user.interface";
import { TTrainer } from "../trainner/trainer.interface";
import { Trainer } from "../trainner/trainer.model";
import { TTrainee } from "../trainee/trainee.interface";
import { Trainee } from "../trainee/trainee.model";


const  createTraineeService = async (payload: TTrainee) => {
    const userData: Partial<TUser> = {};
    
    const user = await User.findOne({ email: payload.email });
    if (user) {
        throw new AppError(httpStatus.BAD_REQUEST, 'A user with this email already exists.');
    }
    //set Trainee Info
    userData.role = 'trainee';
    userData.email = payload.email;
    userData.name = payload.name;
    userData.password = payload.password;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        // create a user (transaction-1)
        const newUser = await User.create([userData], { session });

        //create a Trainee
        if (!newUser.length) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to create user'
            );
        }

        // set id , _id as user
        payload.user = newUser[0]._id; //reference _id

        // create a Trainee (transaction-2)
        const newTrainee = await Trainee.create([payload], { session });

        if (!newTrainee.length) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to create Trainee'
            );
        }

        await session.commitTransaction();
        await session.endSession();

        return newTrainee;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};


const createTrainerService = async (payload: TTrainer) => {
    const userData: Partial<TUser> = {};
    //set Trainer Info
    
    const user = await User.findOne({ email: payload.email });
    if (user) {
        throw new AppError(httpStatus.BAD_REQUEST, 'A user with this email already exists.');
    }
    userData.role = 'trainer';
    userData.email = payload.email;
    userData.name = payload.name;
    userData.password = payload.password;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        // create a user (transaction-1)
        const newUser = await User.create([userData], { session });

        //create a Trainer
        if (!newUser.length) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to create user'
            );
        }

        // set id , _id as user
        payload.user = newUser[0]._id; //reference _id

        // create a Trainer (transaction-2)
        const newTrainer = await Trainer.create([payload], { session });

        if (!newTrainer.length) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to create Trainer'
            );
        }

        await session.commitTransaction();
        await session.endSession();

        return newTrainer;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

export const UserServices = {
  createTraineeService,
  createTrainerService
};
