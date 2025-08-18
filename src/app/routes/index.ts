import { Router } from "express";
import { userRouter } from "../moduels/user/user.route";
import { TrainerRouter } from "../moduels/trainner/trainer.route";
import { TraineeRouter } from "../moduels/trainee/trainee.route";
import { ScheduleRouter } from "../moduels/schedule/classSchedule.route";
import { AuthRouter } from "../moduels/auth/auth.route";
import { AdminRouter } from "../moduels/admin/admin.route";

export const router = Router();

const moduleRoutes = [
  {
        path: '/auth',
        route: AuthRouter
    },
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/admin',
        route: AdminRouter
    },
    {
        path: '/trainer',
        route: TrainerRouter
    },
    {
        path: '/trainee',
        route: TraineeRouter
    },
    {
        path: '/schedule',
        route: ScheduleRouter
    }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
