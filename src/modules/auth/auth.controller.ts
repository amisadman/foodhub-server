import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/response";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;

    const data = await AuthService.login(payload);
    // const token = data.token;
    // const maxAge = 60 * 60 * 24 * 1000;
    // res.cookie("better-auth.session_token", token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "none",
    //   path: "/",
    //   maxAge: maxAge,
    // });
   const cookie = data.headers.get('set-cookie');
//    console.log(cookie);

res.setHeader("Set-Cookie", cookie as string);
    return sendResponse(res, 200, true, "Login successfully", data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;

    const data = await AuthService.register(payload);
      const cookie = data.headers.get('set-cookie');
//    console.log(cookie);


    return sendResponse(res, 201, true, "Register successfully", data);
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  login,
  register,
};
