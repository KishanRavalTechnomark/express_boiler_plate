import User from "../models/User";
import { sequelizeErrorFormat } from "../utils/errorFormatter";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as ejs from "ejs";
import * as path from "path";
import { CustomError } from "../utils/CustomError";
import { ValidationError } from "sequelize";
import { ResHandler } from "../utils/ResHandler";
import { UserAttributes } from "../models/User";
import transporter from "../utils/nodeMailer";

interface payloadDataType {
  id: number;
  email: string;
  token?: string;
}

export const register = async (req: Request, res: any, next: any) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    phoneNumber,
    employeeCode,
    password,
  } = req.body as unknown as UserAttributes;
  try {
    let userExist = await User.findOne({ where: { email: email } });
    if (userExist) {
      return ResHandler(res, 400, "email already taken", "[]");
    }

    //New User
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password.trim(), salt);

    const user = new User();
    user.organizationId = null;
    user.firstName = firstName.trim();
    user.lastName = lastName.trim();
    user.middleName = middleName.trim();
    user.email = email.trim();
    user.phoneNumber = phoneNumber.trim();
    user.gender = null;
    user.location = null;
    user.employeeCode = employeeCode.trim();
    user.department = null;
    user.process = null;
    user.role = null;
    user.designation = null;
    user.isAprrover = "YES";
    user.rightToRequistion = "No";
    user.requistionInAMonth = "0";
    (user.startDate = new Date()),
      (user.endDate = new Date()),
      (user.password = hashedPassword);
    (user.emailConfirmed = false),
      (user.rememberMe = false),
      (user.ssoLogin = false),
      (user.isDepartmentHead = false),
      (user.isReportingManager = false),
      (user.isActive = true),
      (user.isDelete = false),
      (user.createdBy = null);

    let createdUser = await user.save();
    let responseData = { ...createdUser.dataValues, id: undefined };

    return ResHandler(res, 200, "user registerd succssfully", responseData);
  } catch (err: any) {
    if (err instanceof ValidationError) {
      const error = sequelizeErrorFormat(err);
      const customError = new CustomError(422, "validation error", error);
      return next(customError);
    }
    return next(err);
  }
};

export const login = async (req: Request, res: any, next: any) => {
  const { password, email } = req.body as unknown as UserAttributes;
  try {
    const user = await User.findOne({
      where: {
        email: email,
        isActive: true,
        isDelete: false,
      },
    });
    if (!user) {
      const customError = new CustomError(
        400,
        "email address is not found",
        "[]"
      );
      return next(customError);
    }

    let hashedPassword = user.password;
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (isMatch) {
      let payload: payloadDataType = {
        id: user.id,
        email: user.email,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY!, {
        expiresIn: "1h",
      });
      payload.token = token;
      return ResHandler(res, 200, "Login successfully", payload);
    } else {
      const customError = new CustomError(400, "Invalid Password!", "[]");
      return next(customError);
    }
  } catch (err: any) {
    if (err instanceof ValidationError) {
      const error = sequelizeErrorFormat(err);
      const customError = new CustomError(422, "validation error", error);
      return next(customError);
    }
    return next(err);
  }
};

export const forgotPassword = async (req: any, res: any, next: any) => {
  const { email } = req.body as UserAttributes;
  try {
    const user = await User.findOne({
      where: {
        email: email,
        isActive: true,
        isDelete: false,
        emailConfirmed: true,
      },
    });

    if (!user) {
      const customError = new CustomError(
        400,
        "email address  is not found or not confirmed",
        "[]"
      );
      return next(customError);
    }

    let payload: payloadDataType = {
      id: user.id,
      email: user.email,
    };
    const baseUrl = req.protocol + "://" + req.get("host");
    const resetToken = jwt.sign(payload, process.env.SECRET_KEY!, {
      expiresIn: 60 * 45,
    });
    const resetLink = `${baseUrl}/api/auth/reset-password/${resetToken}`;

    //load and compiled forget password template
    const templatePath = path.join(
      __dirname,
      "..",
      "views/forget-password.ejs"
    );
    const compiledTemplate = ejs.compile(
      require("fs").readFileSync(templatePath, "utf-8")
    );

    const mailOptions = {
      from: process.env.EMAIL!,
      to: email,
      subject: "Password Reset",
      html: compiledTemplate({ resetLink: resetLink }),
      // text: `Click the following link to reset your password: ${resetLink}`,
    };
    await transporter.sendMail(mailOptions);
    return ResHandler(res, 200, "Password reset email sent successfully", "[]");
  } catch (err: any) {
    if (err instanceof ValidationError) {
      const error = sequelizeErrorFormat(err);
      const customError = new CustomError(422, "validation error", error);
      return next(customError);
    }
    return next(err);
  }
};

export const resetPassword = async (req: any, res: any, next: any) => {
  let token: string = req.params.token;
  res.render("reset-password", { token });
};

export const resetPasswordConfirmed = async (req: any, res: any, next: any) => {
  let user_data: payloadDataType = req.body.user;

  try {
    let user = await User.findByPk(user_data.id);
    if (user) {
      let password = req.body.password;
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(password, salt);
      user.password = hash;
      await user.save();
      res.render("reset-password-success");
    } else {
      res.render("reset-password-error", {
        errorMessage: "user with provided email is not found",
      });
    }
  } catch (err: any) {
    res.render("reset-password-error", {
      errorMessage: "user with provided email is not found",
    });
  }
};

export const changePassword = async (req: any, res: any, next: any) => {
  const { oldPassword, password, confirmPassword } = req.body;
  try {
    // Check if oldPassword matches the current user's password
    const user = await User.findByPk(req.body.user.id);

    if (!user) {
      return ResHandler(res, 404, "User not found", "[]");
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return ResHandler(res, 401, "Invalid old password", "[]");
    }

    // Check if newPassword and confirmPassword match
    if (password !== confirmPassword) {
      return ResHandler(res, 400, "New password and confirm password do not match", "[]");
    }

    // Hash the new password and update the user's password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
    await user.save();

    return ResHandler(res, 200, "Password changed successfully", "[]");
  } catch (err: any) {
    if (err instanceof ValidationError) {
      const error = sequelizeErrorFormat(err);
      const customError = new CustomError(422, "Validation error", error);
      return next(customError);
    }
    return next(err);
  }
};
