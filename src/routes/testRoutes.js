// routes/testRoutes.js
const express = require("express");
const { sendEmail } = require("../utils/mailer");
const router = express.Router();

router.get("/test-email", async (req, res) => {
  try {
    await sendEmail({
      to: "dilushka10@gmail.com",
      subject: "Test Email",
      html: ` 
<!DOCTYPE html>
<html>
<head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap');
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
            color: #212529;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(0,0,0,0.05);
        }
        .header {
            background: linear-gradient(135deg, #6e8efb 0%, #4a6cf7 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        .logo {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
            letter-spacing: -0.5px;
        }
        .tagline {
            font-weight: 300;
            opacity: 0.9;
            margin-top: 0;
        }
        .content {
            padding: 30px;
        }
        h1 {
            color: #2c3e50;
            font-weight: 700;
            font-size: 24px;
            margin-top: 0;
        }
        .welcome-text {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 25px;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #6e8efb 0%, #4a6cf7 100%);
            color: white !important;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 8px;
            font-weight: 500;
            margin: 20px 0;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(74, 108, 247, 0.25);
        }
        .features {
            margin: 30px 0;
        }
        .feature {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        .feature-icon {
            width: 24px;
            height: 24px;
            margin-right: 12px;
            color: #4a6cf7;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #7f8c8d;
            border-top: 1px solid #ecf0f1;
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo animate-float">Service Connect</div>
            <p class="tagline">The future of service integration</p>
        </div>
        
        <div class="content">
            <h1>Welcome aboard, Suresh! 👋</h1>
            
            <p class="welcome-text">
                Thank you for joining Service Connect! Your email has been verified and 
                your account is now ready to use. We're excited to have you on board.
            </p>
            
            <center>
                <a href="https://app.serviceconnect.com/dashboard" class="cta-button">
                    Launch Your Dashboard
                </a>
            </center>
            
            <div class="features">
                <div class="feature">
                    <div class="feature-icon">⚡</div>
                    <div>Instant access to thousands of services</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">🔒</div>
                    <div>Enterprise-grade security</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">🤖</div>
                    <div>AI-powered recommendations</div>
                </div>
            </div>
            
            <p class="welcome-text">
                Need help getting started? Check out our <a href="https://serviceconnect.com/guides" style="color: #4a6cf7; text-decoration: none; font-weight: 500;">quickstart guides</a> 
                or reach out to our support team anytime.
            </p>
        </div>
        
        <div class="footer">
            <p>© ${new Date().getFullYear()} Service Connect. All rights reserved.</p>
            <p>
                <a href="https://serviceconnect.com/privacy" style="color: #7f8c8d; text-decoration: none; margin: 0 10px;">Privacy Policy</a> | 
                <a href="https://serviceconnect.com/terms" style="color: #7f8c8d; text-decoration: none; margin: 0 10px;">Terms of Service</a>
            </p>
        </div>
    </div>
</body>
</html>
    `,
    });
    res.send("Email sent!");
  } catch (err) {
    res.status(500).send("Failed: " + err.message);
  }
});

module.exports = router;
