import { Router } from "express";
import { userRouter } from "../moduels/user/user.route";


export const router = Router();

const moduleRoutes = [
  {
    path: "/trainee",
    route: userRouter ,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});