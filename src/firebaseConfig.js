import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import credsDev from "./secret/firebase.dev.json";
import credsProd from "./secret/firebase.prod.json";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const env = process.env.REACT_APP_ENV || "PROD";

const firebaseConfig = env === "PROD" ? credsProd : credsDev;

let app;
let analytics;

if (env === "PROD") {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
}

export default function logFaEvent(event, data = undefined) {
  if (env === "PROD") {
    if (data) logEvent(analytics, event, data);
    else logEvent(analytics, event);
  }
}