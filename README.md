# Gym Class Scheduling & Membership Management System

A robust and modular Gym Management System designed to efficiently handle class scheduling, trainer management, and trainee bookings. The system enforces strict business rules and role-based access using JWT authentication.

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
  "password": "Su1502221967@"
}
