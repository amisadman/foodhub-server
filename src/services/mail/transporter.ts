import { env } from "../../config/env";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: `${env.smtpHost}`,
  port: 587,
  secure: false,
  auth: {
    user: `${env.smtpUser}`,
    pass: `${env.smtpPassword}`,
  },
});
