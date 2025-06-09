// generateToken.js
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

admin
  .auth()
  .createCustomToken("test-user-id")
  .then((customToken) => {
    console.log("Custom Token:", customToken);
  })
  .catch((error) => {
    console.error("Error creating token:", error);
  });
