import User from '@/models/user.model';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(String(userId), 10)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(
                userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000,
                }
            )
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(
                userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000,
                }
            )
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER || "mailtrap user",
                pass: process.env.MAILTRAP_PASS || "mailtrap pass"
            }
        });

        const mailOptions = {
            from: 'noReply@denahub.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        console.log(mailResponse)
        return mailResponse
    } catch (error: any) {
        throw new Error(error.message)
    }
}