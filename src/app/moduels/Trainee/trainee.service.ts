
import mongoose from 'mongoose';
import AppError from '../../errorHelpers/AppError';
import ClassSchedule from '../schedule/classSchedule.model';
import httpStatus from 'http-status-codes';
import { Trainee } from "../trainee/trainee.model";

const bookClassSchedule = async (traineeId: string, classId: string) => {
    // Check if class exists
    const classSchedule =
        await ClassSchedule.findById(classId).populate('trainerId');
    if (!classSchedule) {
        throw new AppError(httpStatus.NOT_FOUND, 'Class not found');
    }

    // Check if the class has available seats (Max 10 trainees)
    if (classSchedule.trainees.length >= 10) {
        throw new AppError (httpStatus.BAD_REQUEST, 'No seats available');
    }

    // Check if the trainee is already book in the class
    const traineeExists = classSchedule.trainees.some(
        trainee => trainee.toString() === traineeId.toString()
    );
    if (traineeExists) {
        throw new AppError(
           httpStatus.BAD_REQUEST,
            'You are already booked a seat in this class.'
        );
    }

    //  Check if the trainee already has a class at the same time
    const existingBooking = await ClassSchedule.findOne({
        _id: { $ne: classId }, // Exclude the current class
        trainees: traineeId,
        date: classSchedule.date,
        startTime: classSchedule.startTime
    });

    if (existingBooking) {
        throw new AppError(
           httpStatus.CONFLICT,
            'You already have a class at this time'
        );
    }
    //  Add trainee to the class
    classSchedule.trainees.push(new mongoose.Types.ObjectId(traineeId));
    await classSchedule.save();

    return classSchedule;
};

const cancelBooking = async (traineeId: string, classId: string) => {
    const classSchedule = await ClassSchedule.findById(classId);

    if (!classSchedule) {
        throw new AppError(httpStatus.NOT_FOUND, 'Class not found.');
    }
    // **Ensure traineeId exists in the list**
    if (
        !classSchedule.trainees.some(
            id => id.toString() === traineeId.toString()
        )
    ) {
        throw new AppError(
           httpStatus.BAD_REQUEST,
            'You are not enrolled in this class.'
        );
    }

    // Remove trainee
    classSchedule.trainees = classSchedule.trainees.filter(
        id => id.toString() !== traineeId.toString()
    );
    await classSchedule.save();
    return classSchedule;
};
const getAllTraineeFromDB = async (query: Record<string, unknown>) => {
    const result = await Trainee.find(query); 
    return { result };
};

export const TraineeServices = {
    bookClassSchedule,
    cancelBooking,
    getAllTraineeFromDB
};