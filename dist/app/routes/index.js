"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../moduels/user/user.route");
const trainer_route_1 = require("../moduels/trainner/trainer.route");
const trainee_route_1 = require("../moduels/trainee/trainee.route");
const classSchedule_route_1 = require("../moduels/schedule/classSchedule.route");
const auth_route_1 = require("../moduels/auth/auth.route");
const admin_route_1 = require("../moduels/admin/admin.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRouter
    },
    {
        path: '/user',
        route: user_route_1.userRouter
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRouter
    },
    {
        path: '/trainer',
        route: trainer_route_1.TrainerRouter
    },
    {
        path: '/trainee',
        route: trainee_route_1.TraineeRouter
    },
    {
        path: '/schedule',
        route: classSchedule_route_1.ScheduleRouter
    }
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
