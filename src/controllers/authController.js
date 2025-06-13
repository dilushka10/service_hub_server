const { checkEmailExists, registerUser,sendVerificationEmail } = require("../services/authService");
const axios = require("axios");
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY ;

async function register(req, res) {
  const { email, password, firstName, lastName, photoUrl, role } = req.body;

  if (!email || !password || !firstName || !lastName || !role) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const exists = await checkEmailExists(email);
    if (exists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const userRecord = await registerUser({
      email,
      password,
      firstName,
      lastName,
      photoUrl,
      role,
    });

    await sendVerificationEmail(email, `${firstName} ${lastName}`);

    res.status(201).json({
      message: "User created. Verification email sent.",
      uid: userRecord.uid,
    });
  } catch (err) {
    console.error("Registration Error:", err.message);
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
}


async function signIn(req, res) {
  const { email, password } = req.body;

  console.log("FIREBASE_API_KEY:", FIREBASE_API_KEY);

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    const { idToken, refreshToken, localId } = response.data;

    // Optionally fetch user data from Firestore
    const { db } = require("../config/firebase");
    const userDoc = await db.collection("users").doc(localId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User profile not found" });
    }

    const userData = userDoc.data();

    res.json({
      message: "Sign-in successful",
      idToken,
      refreshToken,
      user: {
        uid: localId,
        ...userData,
      },
    });
  } catch (err) {
    const msg = err.response?.data?.error?.message || err.message;
    res.status(401).json({ message: "Sign-in failed", error: msg });
  }
}

module.exports = { register, signIn };
