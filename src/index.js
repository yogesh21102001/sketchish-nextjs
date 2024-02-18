import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./style/general.css";
import "./style/login.css";
import "./style/queries.css";
import "./style/style.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datalist-input/dist/styles.css";
import "react-responsive-modal/styles.css";
import "react-color-palette/lib/css/styles.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { ToastContainer } from "react-toastify";
import logFaEvent from "./firebaseConfig";
import { CloseBtnSVG } from "./assets/ossvg";
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById("root"));
logFaEvent("home_page_visited");
root.render(
  // <React.StrictMode>
  <>
    <GoogleOAuthProvider clientId="963723204692-okm7iopo2fmf530su072v002kda3k9e3.apps.googleusercontent.com">
      <AuthProvider>
        <App />
      </AuthProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName={"toast-container"}
        bodyClassName={"toast-body"}
        closeButton={
          <CloseBtnSVG
            style={{
              height: "30px",
              width: "30px",
              alignSelf: "center",
            }}
          />
        }
      />
    </GoogleOAuthProvider>
  </>
  // </React.StrictMode>
);
