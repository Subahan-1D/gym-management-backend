# Gym Class Scheduling & Membership Management System

A robust and modular **Gym Management System** designed to efficiently handle class scheduling, trainer management, and trainee bookings. The system enforces strict business rules and role-based access using JWT authentication.

---

## 🚀 Project Overview

This system manages gym operations with three user roles:

| Role    | Permissions |
|--------|------------|
| **Admin**   | Create trainers • Create schedules • Assign trainers              |
| **Trainer** | View their assigned schedules                                  |
| **Trainee** | Manage profile • Book classes • Cancel bookings                 |

**Business Rules**

- Maximum **5 schedules per day**
- Each class lasts **2 hours**
- Maximum **10 trainees per class**
- Trainee cannot book multiple classes in the same time slot
- JWT authentication enforced on all protected routes

---

## 🛠 Technology Stack

| Layer          | Technology           |
| -------------- | -------------------- |
| Language       | TypeScript           |
| Web Framework  | Express.js           |
| Database       | MongoDB (Mongoose)   |
| Authentication | JWT                  |
| Architecture   | Modular              |

---

## 🌐 Live Deployed Link

**Gym Management API** → `<YOUR_DEPLOYED_URL>`

---

## 🔑 Admin Credentials

```json
{
  "email": "subahanislam523@gmail.com",
  "password": "S1234@"
}
✅ Admin Functionality
🔹 Create Trainer
Route: POST /api/user/create-trainer

Headers: Authorization: Bearer {"token"}

Body

json
Copy
Edit
{
  "name": "Subahan",
  "gender": "male",
  "email": "subahan@example.com",
  "contactNo": "+8801786727749",
  "password": "12345678"
}
Response

json
Copy
Edit
{
  "success": true,
  "statusCode": 200,
  "message": "Trainer is created successfully!",
  "data": [ { "_id":"trainer_id_here", "name":"subahan", "email":"subahan@example.com" } ]
}
🔹 Create Schedule
Route: POST /api/admin/create-schedule
Headers: Authorization: Bearer {"token"}

Body

{
  "date": "17-08-2025",
  "startTime": "04:00",
  "endTime": "06:00",
  "trainerId": "67b1dc78612d9e42d02ccefe",
  "capacity": 10
}

🔹 Get All Trainers
Route: GET /api/trainer
Headers: Authorization: Bearer {"token"}

Response

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


🧑‍🏫 Trainer Functionality
🔹 View My Schedules
Route: GET /api/trainer/my-schedules
Headers: Authorization: Bearer {"token"}

Response

{
  "success": true,
  "statusCode": 200,
  "message": "Schedules is retrieved successfully.",
  "data": [
    {
      "_id":"schedule_id_here",
      "date":"16-02-2025",
      "startTime":"22:00",
      "endTime":"24:00",
      "trainerId": {
        "_id":"trainer_id_here", "name":"subahan", "email":"subhan@example.com"
      },
      "capacity":10,
      "trainees":[]
    }
  ]
}


👨‍🎓 Trainee Functionality
🔹 Create Trainee
Route: POST /api/user/create-trainee

json
Copy
Edit
{
  "name": "Raju",
  "gender": "male",
  "email": "raju@example.com",
  "contactNo": "+8801786727749",
  "password": "12345678"
}
🔹 Book a Class
Route: POST /api/trainee/book-class
Headers: Authorization: Bearer {"token"}

json
Copy
Edit
{
  "classScheduleId": "67b2ec4e7112474d9f635429"
}
🔹 Cancel a Booking
Route: POST /api/trainee/cancel-booking
Headers: Authorization: Bearer {"token"}

{
  "classScheduleId": "67b2ec4e7112474d9f635429"
}
🔐 Login (All Users)
Route: POST /api/auth/login

{
  "email": "john@example.com",
  "password": "securepassword"
}

Response


{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": { "token": "jwt_token_here" }
}

⚙️ Setup Instructions
✅ Prerequisites
Node.js (v16+)

MongoDB (Local or Remote)

✅ Setup Steps

# 1. Clone the repository
git clone https://github.com/Subahan-1D/gym-management-backend.git
cd gym-management-backend

# 2. Install dependencies
npm install
npm run build


3. Configure .env file

MONGODB_URI=mongodb://localhost:27017/gym-management
PORT=5000
JWT_ACCESS_SECRET=access_secret_subahan1
BCRYPT_SALT_ROUNDS=10
NODE_ENV=development

# 4. Start the application
npm run dev