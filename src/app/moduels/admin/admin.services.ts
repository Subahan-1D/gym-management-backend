import { TClassSchedule } from "../schedule/classSchedule.interface";
import ClassSchedule from "../schedule/classSchedule.model";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { Trainer } from "../trainner/trainer.model";

const createClassScheduleIntoDB = async (payload: TClassSchedule) => {
  const { date, startTime, trainerId } = payload;

  // Check if the trainer already has 5 classes scheduled on this date
  const existingScheduleCount = await ClassSchedule.countDocuments({
    date,
    trainerId,
  });

  if (existingScheduleCount >= 5) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "A trainer can schedule up to 5 classes per day."
    );
  }

  // Check if the trainer has another class at the same time
  const existingSchedule = await ClassSchedule.findOne({
    date,
    startTime,
    trainerId,
  });

  if (existingSchedule) {
    throw new AppError(
      httpStatus.CONFLICT,
      "The trainer already has a class at this time."
    );
  }

  // Create the class schedule
  const newClassSchedule = await ClassSchedule.create(payload);

  // Update Trainer's assignedClasses field
  await Trainer.findByIdAndUpdate(trainerId, {
    $push: { assignedClasses: newClassSchedule._id },
  });

  return newClassSchedule;
};

export const AdminServices = {
  createClassScheduleIntoDB,
};
