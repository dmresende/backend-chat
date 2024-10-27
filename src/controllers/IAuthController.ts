import { Request, Response } from "express";

interface IAuthController {
  signup(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined>;

  login(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined>;
}

export default IAuthController;
