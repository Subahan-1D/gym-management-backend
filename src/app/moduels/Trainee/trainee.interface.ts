/* eslint-disable @typescript-eslint/consistent-type-definitions */

import { Model, Types } from 'mongoose';

export type TTrainee = {
    user: Types.ObjectId;
    name: string;
    password: string;
    email: string;
    contactNo: string;
    gender: 'male' | 'female' | 'other';
};

export interface TraineeModel extends Model<TTrainee> {
    isUserExists(id: string): Promise<TTrainee | null>;
}