import admin from "firebase-admin";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const serviceAccount = require("./config/auctionify-app-firebase-adminsdk-fbsvc-8054b503d0.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
