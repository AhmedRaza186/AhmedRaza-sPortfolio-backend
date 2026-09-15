import { Request, Response, NextFunction } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import nodemailer from 'nodemailer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const submitFeedback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { rating, text, audioBase64 } = req.body;
    let audioUrl = '';

    // 1. Upload audio to Cloudinary if provided
    if (audioBase64) {
      // Cloudinary's parser sometimes rejects data URIs with extra parameters like ';codecs=opus'. 
      // We extract just the base64 data and construct a clean data URI that Cloudinary accepts.
      const base64Data = audioBase64.replace(/^data:audio\/[^;]+(?:;codecs=[^;]+)?;base64,/, '');
      const cleanDataUri = `data:video/webm;base64,${base64Data}`;

      const uploadResponse = await cloudinary.uploader.upload(cleanDataUri, {
        resource_type: 'video',
        format: 'webm',
      });
      audioUrl = uploadResponse.secure_url;
    }

    // 2. Send Email
    const mailOptions = {
      from: `"Portfolio Feedback" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER,
      subject: `New ${rating || 0}-Star Portfolio Feedback!`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">New Portfolio Review</h2>
          
          <p style="font-size: 16px;">
            <strong>⭐ Rating:</strong> 
            <span style="color: #f39c12; font-weight: bold; font-size: 18px;">${rating ? `${rating} / 5 Stars` : 'No Rating'}</span>
          </p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0;">
            <p style="margin: 0;"><strong>💬 Comment:</strong></p>
            <p style="margin: 10px 0 0 0; font-style: italic;">${text || 'No text comment provided.'}</p>
          </div>

          ${audioUrl ? `
            <div style="margin-top: 30px; text-align: center;">
              <p style="font-size: 16px;">
                🔊 <strong><a href="${audioUrl}" style="background-color: #2ecc71; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Click here to listen to the Voice Note</a></strong>
              </p>
            </div>
          ` : ''}
          
          <hr style="border: none; border-top: 1px solid #eaeaea; margin-top: 40px;" />
          <p style="font-size: 12px; color: #888; text-align: center;">This is an automated message from your Portfolio Review System.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true });
  } catch (error) {
    console.error('Feedback Submission Error:', error);
    next(error);
  }
};
