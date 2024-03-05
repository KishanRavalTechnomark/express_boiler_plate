import { NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import { CustomError } from "../../utils/CustomError";
import { joiErrorFormat } from "../../utils/joiErrorFormatter";
import {
  userRegisterSchema,
  userLoginSchema,
  userForgetPasswordSchema,
  userResetPasswordSchema,
} from "../joi-schema/Auth.schema";

export const validateRegisterRequest = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const validationResult = userRegisterSchema.validate(req.body, {
      abortEarly: false,
    });

    if (validationResult.error) {
      const Err = new CustomError(
        422,
        "validation failed",
        joiErrorFormat(validationResult)
      );
      next(Err);
      return;
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

export const validateLoginRequest = async (req: any, res: any, next: any) => {
  try {
    const validationResult = userLoginSchema.validate(req.body, {
      abortEarly: false,
    });

    if (validationResult.error) {
      const Err = new CustomError(
        422,
        "validation failed",
        joiErrorFormat(validationResult)
      );
      return next(Err);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

export const validatePasswordForgetRequest = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const validationResult = userForgetPasswordSchema.validate(req.body, {
      abortEarly: false,
    });
    if (validationResult.error) {
      const Err = new CustomError(
        422,
        "validation failed",
        joiErrorFormat(validationResult)
      );
      return next(Err);
    } else {
      return next();
    }
  } catch (err) {
    return next(err);
  }
};

export const validatePasswordChangeRequest = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const validationResult = userResetPasswordSchema.validate(req.body, {
      abortEarly: false,
    });
    if (validationResult.error) {
      const Err = new CustomError(
        422,
        "validation failed",
        joiErrorFormat(validationResult)
      );
      return next(Err);
    } else {
      return next();
    }
  } catch (err) {
    return next(err);
  }
};

export const validatePasswordResetRequest = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    let token = req.params?.token;
    if (!token) {
      token = req.body.token;
    }
    let verify = await jwt.verify(token, process.env.SECRET_KEY!);
    if (verify) {
      req.body.user = verify;
      return next();
    } else {
      res.render("reset-password-error", {
        errorMessage: " token is expired or incorrect",
      });
    }
  } catch (err: any) {
    res.render("reset-password-error", {
      errorMessage: " token is expired or incorrect",
    });
  }
};

export const validateConfirmPasswordRequest = async (
  req: any,
  res: any,
  next: any
) => {
  let validationResult: any;
  try {
    validationResult = userResetPasswordSchema.validate(req.body, {
      abortEarly: false,
    });

    if (validationResult.error) {
      res.render("reset-password-error", {
        errorMessage: validationResult.error.details[0].message,
      });
      return;
    } else {
      next();
    }
  } catch (err) {
    res.render("reset-password-error", {
      errorMessage: validationResult.error.details[0].message,
    });
    return;
  }
};

export const validateJWTToken = async (req: any, res: any, next: any) => {
  let authorization = req.headers["authorization"];
  try {
    if (authorization && authorization.split(" ")?.[1]) {
      let verify = jwt.verify(
        authorization.split(" ")[1],
        process.env.SECRET_KEY!
      );
      if (verify) {
        req.body.user = verify;
        return next();
      }
    } else {
      const error = new CustomError(
        401,
        "provide the correct Access token",
        "[]"
      );
      return next(error);
    }
  } catch (err: any) {
    err.statusCode = 401;
    next(err);
  }
};
