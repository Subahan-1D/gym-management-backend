# Gym Class Scheduling & Membership Management System

A robust and modular **Gym Management System** designed to efficiently handle class scheduling, trainer management, and trainee bookings. The system enforces strict business rules and role-based access using JWT authentication.

---

## 🚀 Project Overview

This system manages gym operations with three user roles: **Admin**, **Trainer**, and **Trainee**, each with specific permissions:

### Admin
- Create and manage trainers.
- Schedule up to **5 classes per day**.
- Assign trainers to class schedules.

### Trainer
- View their assigned schedules.
- Cannot create schedules or manage trainees.

### Trainee
- Create and manage their profile.
- Book available class schedules (max **10 trainees per class**).
- Cancel bookings if needed.

**Business Rules:**
- Maximum 5 schedules per day.
- Each class lasts 2 hours.
- Each schedule can accommodate **up to 10 trainees**.
- Trainees cannot book multiple classes in the same time slot.
- JWT authentication ensures secure role-based access.

---

## 🛠 Technology Stack

| Layer         | Technology                |
|---------------|--------------------------|
| Language      | TypeScript               |
| Web Framework | Express.js               |
| Database      | MongoDB (Mongoose)      |
| Authentication| JWT (JSON Web Token)     |
| Architecture  | Modular                  |

---

## 🌐 Live Deployed Link

[Gym Management API Live](#)  

*Provide your deployed server URL.*

---

## 🔑 Admin Credentials

```json
{
  "email": "subahanislam523@gmail.com",
  "password": "S1234@"
}


1️⃣ Admin Functionality
a) Create Trainer

Route: POST /api/user/create-trainer

Headers: Authorization: Bearer {{admin-token}}

Body:


{
  "name": "Rohan",
  "gender": "male",
  "email": "rohan@example.com",
  "contactNo": "+8801786727749",
  "password":"12345678"
}


{
  "success": true,
  "statusCode": 200,
  "message": "Trainer is created successfully!",
  "data": [
    {
      "_id": "trainer_id_here",
      "name": "Rohan",
      "email": "rohan@example.com"
    }
  ]
}


Create Schedule

Route: POST /api/admin/create-schedule

Headers: Authorization: Bearer {{admin-token}}

Body:


{
  "date": "17-08-2025",
  "startTime": "04:00",
  "endTime": "06:00",
  "trainerId": "67b1dc78612d9e42d02ccefe",
  "capacity": 10
}



Response:

{
  "success": true,
  "statusCode": 201,
  "message": "Schedule created successfully",
  "data": {
    "_id": "schedule_id_here",
    "date": "16-02-2025",
    "startTime": "04:00",
    "endTime": "06:00",
    "trainerId": "67b1dc78612d9e42d02ccefe",
    "capacity": 10,
    "trainees": []
  }
}


Get All Trainers

Route: GET /api/trainer

Headers: Authorization: Bearer {{admin-token}}

Response:

{
  "success": true,
  "statusCode": 200,
  "message": "All Trainer retrieved successfully",
  "data": [
    {
      "_id": "trainer_id_here",
      "name": "Rohan",
      "email": "rohan@example.com",
      "assignedClasses": []
    }
  ]
}


2️⃣ Trainer Functionality
a) View My Schedules

Route: GET /api/trainer/my-schedules

Headers: Authorization: Bearer {{trainer-token}}

Response:

{
  "success": true,
  "statusCode": 200,
  "message": "Schedules is retrieved successfully.",
  "data": [
    {
      "_id": "schedule_id_here",
      "date": "16-02-2025",
      "startTime": "22:00",
      "endTime": "24:00",
      "trainerId": {
        "_id": "trainer_id_here",
        "name": "subahan",
        "email": "subhan@example.com"
      },
      "capacity": 10,
      "trainees": []
    }
  ]
}


Trainee Functionality
a) Create Trainee

Route: POST /api/user/create-trainee

Body:

{
  "name": "Raju",
  "gender": "male",
  "email": "raju@example.com",
  "contactNo": "+8801786727749",
  "password":"12345678"
}


b) Book a Class

Route: POST /api/trainee/book-class

Headers: Authorization: Bearer {{trainee-token}}

Body:

{
  "classScheduleId": "67b2ec4e7112474d9f635429"
}


Response:

{
  "success": true,
  "statusCode": 200,
  "message": "Class booked successfully",
  "data": {
    "_id": "schedule_id_here",
    "date": "16-02-2025",
    "startTime": "08:00",
    "endTime": "10:00",
    "trainees": ["trainee_id_here"]
  }
}

c) Cancel Booking

Route: POST /api/trainee/cancel-booking

Headers: Authorization: Bearer {{trainee-token}}

Body:

{
  "classScheduleId": "67b2ec4e7112474d9f635429"
}


Response:

{
  "success": true,
  "statusCode": 200,
  "message": "Booking canceled successfully",
  "data": {
    "_id": "schedule_id_here",
    "trainees": []
  }
}

4️⃣ Login (All Users)

Route: POST /api/auth/login

Body:

{
  "email": "john@example.com",
  "password": "securepassword"
}


Response:

{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "jwt_token_here"
  }
}

5️⃣ Database Schemas (MongoDB)
// Admin
const AdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: 'admin' }
});

// Trainer
const TrainerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  assignedSchedules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }]
});

// Trainee
const TraineeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  assignedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }]
});

// Schedule

const ScheduleSchema = new mongoose.Schema({
  date: Date,
  startTime: String,
  endTime: String,
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },
  trainees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trainee' }],
  maxTrainees: { type: Number, default: 10 }
});


6️⃣ Setup Instructions
Prerequisites

Node.js (v16+)

MongoDB (Local or Remote)

Steps

Clone the repository

git clone https://github.com/Subahan-1D/gym-management-backend.git
cd Gym-Management

Install dependencies

npm install
npm run build


Configure Environment Variables
Create a .env file in the root directory:

MONGODB_URI=mongodb://localhost:27017/gym-management
PORT=5000
JWT_ACCESS_SECRET=access_secret_subahan1
BCRYPT_SALT_ROUNDS=10
NODE_ENV=development