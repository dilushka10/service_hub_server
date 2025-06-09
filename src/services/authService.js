const { admin, db } = require("../config/firebase");
const { getDateTime } = require("../utils/dateTime");
const { sendEmail } = require("../utils/mailer");

async function checkEmailExists(email) {
    try {
        await admin.auth().getUserByEmail(email);
        return true;
    } catch (err) {
        if (err.code === 'auth/user-not-found') return false;
        throw err;
    }
}

async function registerUser(data) {
    const { email, password, firstName, lastName, photoUrl, role } = data;

    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName: `${firstName} ${lastName}`,
        photoURL: photoUrl,
        emailVerified: false, // important
    });

    // Create Firestore user
    const userProfile = {
        uid: userRecord.uid,
        email,
        firstName,
        lastName,
        photoUrl,
        role,
        emailVerified: false,
        createdAt: getDateTime(),
    };

    await db.collection("users").doc(userRecord.uid).set(userProfile);

    return userRecord;
}

/**
 * Generates email verification link and sends it using your email provider.
 */
async function sendVerificationEmail(email, displayName) {
    const link = await admin.auth().generateEmailVerificationLink(email);

    // Send the link via email
    await sendEmail({
        to: email,
        subject: "Verify your email",
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
            padding: 30px;
            text-align: center;
            color: white;
        }
        .logo {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 5px;
            letter-spacing: -0.5px;
        }
        .tagline {
            font-weight: 300;
            opacity: 0.9;
            margin-top: 0;
            font-size: 14px;
        }
        .content {
            padding: 30px;
        }
        h1 {
            color: #2c3e50;
            font-weight: 700;
            font-size: 22px;
            margin-top: 0;
            text-align: center;
        }
        .message-text {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 25px;
        }
        .otp-container {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 20px;
            margin: 30px 0;
            text-align: center;
        }
        .otp-code {
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 8px;
            color: #4a6cf7;
            margin: 15px 0;
            font-family: monospace;
            animation: pulse 2s infinite;
        }
        .note {
            font-size: 14px;
            color: #7f8c8d;
            text-align: center;
            margin-top: 25px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #7f8c8d;
            border-top: 1px solid #ecf0f1;
        }
        @keyframes pulse {
            0% { opacity: 0.9; }
            50% { opacity: 0.6; }
            100% { opacity: 0.9; }
        }
        .security-badge {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px 0;
        }
        .badge-icon {
            margin-right: 10px;
            animation: spin 8s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Service Connect</div>
            <p class="tagline">Secure access to your account</p>
        </div>
        
        <div class="content">
            <h1>Your One-Time Passcode</h1>
            
            <p class="message-text">
                Hi ${displayName},<br><br>
                We received a request to verify your email address. Use the following OTP to complete your verification:
            </p>
            
            <div class="otp-container">
                <div style="font-size: 14px; color: #7f8c8d;">Your verification code</div>
                <div class="otp-code">123456</div>
                <div style="font-size: 14px; color: #7f8c8d;">Expires in 10 minutes</div>
            </div>
            
            <div class="security-badge">
                <div class="badge-icon">🔒</div>
                <div>This code is for your eyes only. Never share it with anyone.</div>
            </div>
            
            <p class="note">
                If you didn't request this code, please ignore this email or contact our support team immediately.
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
}

// Simulated email sending function (replace with real service)
async function sendWelcomeEmail(email, displayName) {
    await sendEmail({
        to: email,
        subject: "🚀 Welcome to Service Connect - Your Journey Begins!",
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
            <h1>Welcome aboard, ${displayName}! 👋</h1>
            
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
}
module.exports = { checkEmailExists, registerUser, sendVerificationEmail, sendWelcomeEmail };
