import { Request, Response, NextFunction } from "express";
import passport from "passport";

export const passportAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "local",
    { session: false },
    (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res
          .status(401)
          .json({ error: "Falha na autenticação - " + info?.message });
      }

      req.user = user;
      next();
    }
  )(req, res, next);
};
