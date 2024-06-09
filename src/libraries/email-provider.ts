import nodemailer from "nodemailer";
import * as process from "node:process";
import {Damage, RFS} from "@prisma/client";

export default class EmailProvider {

    public sendEmail(to: string, damage: Damage, rfsId: number, rfsName: string) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: to,
            subject: 'Your Damage Assessment Results',
            html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #4A90E2;">Damage Assessment Results</h2>
                <p>Hello,</p>
                <p>We have completed the assessment of your submission for RFS Test: ${rfsName}, #${rfsId}. Here are the details of the damages detected:</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: #f2f2f2;">
                            <th style="padding: 8px; border: 1px solid #ddd;">Location 1</th>
                            <th style="padding: 8px; border: 1px solid #ddd;">Location 2</th>
                            <th style="padding: 8px; border: 1px solid #ddd;">Depth 1</th>
                            <th style="padding: 8px; border: 1px solid #ddd;">Depth 2</th>
                            <th style="padding: 8px; border: 1px solid #ddd;">Cost of the AI model</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;">${damage.location1}</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${damage.location2}</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${damage.depth1}</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${damage.depth2}</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${damage.cost}</td>
                        </tr>
                    </tbody>
                </table>
                <p>If you have any questions, feel free to reply to this email.</p>
                <p>Best regards,<br>Your Damage Assessment Team</p>
            </div>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw new Error("Email error!")
            }
            console.log(`Message Sent: ${info.response}`);
        });
    }


}