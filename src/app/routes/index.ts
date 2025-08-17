import { Router } from "express";
import { userRouter } from "../moduels/user/user.route";
import { TrainerRouter } from "../moduels/Trainner/trainer.route";
import { TraineeRouter } from "../moduels/Trainee/trainee.route";
import { ScheduleRouter } from "../Schedule/classSchedule.route";

export const router = Router();

const moduleRoutes = [
  {
        path: '/user',
        route: userRouter
    },
  {
    path: "/trainer",
    route: TrainerRouter,
  },
  {
    path: "/trainee",
    route: TraineeRouter,
  },
  {
    path: "/schedule",
    route: ScheduleRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
