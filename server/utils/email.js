import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendInquiryConfirmation = async (inquiry) => {
  const mailOptions = {
    from: `"Shivuu Aqua Supplies" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Inquiry Received - Shivuu Aqua Supplies',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0A2463;">New Inquiry Received</h2>
        <p>A new inquiry has been submitted:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${inquiry.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Business:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${inquiry.businessName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${inquiry.phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>City:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${inquiry.city}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Bottle Size:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${inquiry.bottleSize}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Quantity:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${inquiry.quantity}</td>
          </tr>
          ${inquiry.address ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Address:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${inquiry.address}</td>
          </tr>
          ` : ''}
          ${inquiry.message ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Message:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${inquiry.message}</td>
          </tr>
          ` : ''}
        </table>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default transporter;
