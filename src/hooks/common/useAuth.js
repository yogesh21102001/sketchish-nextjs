import {
  login,
  socialLogin,
  verifyMail,
  setupNewPassword,
  forgotPassword,
  userLimit,
  setFigmaLoginId,
  findEmailInDB,
  verifyEmailOTP
} from "../../common-apis/auth/auth";

import { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { notifyError, notifySuccess } from "../../utils/notify";
import { isEmpty } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const setAppAuth = (data) => {
    setAuth({
      type: "LOGIN",
      payload: data,
    });
    getUserLimit();
    // setting up localStorage
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("profileImg", data.photo);
    localStorage.setItem("plan", data.plan);
  };

  const setLogin = async (userEmail, userPassword, type = "user", figmaLoginId = undefined) => {
    try {
      setLoading(true);
      if (figmaLoginId == null) {
        figmaLoginId = undefined;
      }
      const loginData = await login({
        email: userEmail,
        password: userPassword,
        figmaLoginId
      });
      sessionStorage.removeItem("accountInfo")

      setAppAuth({
        id: loginData?.user?._id,
        firstName: loginData?.user?.firstName,
        lastName: loginData?.user?.lastName,
        fullName: loginData?.user?.fullName,
        email: loginData?.user?.email,
        role: loginData?.user?.role,
        photo: loginData?.user?.photo,
        token: loginData?.token,
        plan: loginData?.user?.role == 'admin' ? loginData?.plan : loginData?.user?.plan,
      });
      setLoading(false);
      notifySuccess("You are logged in successfully");
      if (isEmpty(loginData?.figmaClientId) && !isEmpty(figmaLoginId)) {
        await setFigmaLoginId({ figmaClientId: figmaLoginId })
      }
      return loginData;
    } catch (e) {
      setLoading(false);
      return false;
    }
  };
  const getUserLimit = async () => {
    try {
      const response = await userLimit();
      setAuth({ ...auth, ...{ userLimit: response } });
      return true;
    } catch (e) {
      console.log('getUserLimit_e', e)
      return false;
    }
  };
  const setSocialLogin = async ({
    userFirstName,
    userLastName,
    userEmail,
    userPhoto,
    type = "GOOGLE",
    figmaLoginId = undefined
  }) => {
    try {
      setLoading(true);

      const loginData = await socialLogin({
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        photo: userPhoto,
        type,
        figmaLoginId,
      });

      const data = {
        token: loginData?.token,
        ...loginData?.user,
      };

      setAppAuth(data);

      setLoading(false);
      notifySuccess("You are logged in successfully");

      return loginData;
    } catch (e) {
      if (e.message === "Invalid Password") {
        notifyError("Please enter correct password.");
      }
      setLoading(false);
      return false;
    }
  };
  const setVerifyMail = async ({ userEmail }) => {
    try {
      setLoading(true);

      const result = {
        isVerified: false,
        response: null,
      };

      const payload = {
        email: userEmail,
      };

      const response = await verifyMail(payload);

      setLoading(false);

      result.response = response;

      if (response._id) {
        result.isVerified = true;
        notifySuccess("Your account is already verified, please log in.");
      } else {
        // notifySuccess("Your account has been verified");
      }

      return response;
    } catch (e) {
      setLoading(false);
      return false;
    }
  };
  const setPassword = async ({ hash, password, type }, callback) => {
    try {
      setLoading(true);
      const payload = { hash, password, type };
      console.log("payload", payload);
      const result = await setupNewPassword(payload);
      setLoading(false);
      setAppAuth({
        id: result?.user?._id,
        firstName: result?.user?.firstName,
        lastName: result?.user?.lastName,
        fullName: result?.user?.fullName,
        email: result?.user?.email,
        role: result?.user?.role,
        photo: result?.user?.photo,
        token: result?.token,
        plan: result?.plan,
      });
      if (callback && typeof callback == 'function') {
        callback(true)
      }
      notifySuccess("New Password set successfully");
      return result;
    } catch (e) {
      if (e.message === "Hash not found") {
        navigate("/");
      }
      if (callback && typeof callback == 'function') {
        callback(false)
      }
      setLoading(false);
      navigate("/");
      notifyError("Something went wrong! please try again...");
      return false;
    }
  };
  const setForgotPassword = async ({ userEmail }) => {
    try {
      setLoading(true);
      const payload = {
        email: userEmail,
      };

      const response = await forgotPassword(payload);

      setLoading(false);
      notifySuccess("we have sent you an link");

      return response;
    } catch (e) {
      setLoading(false);
      return false;
    }
  };

  // New On Boarding Flow v3 //
  const findAccountInDB = async({ userEmail }) =>{
    try{
      const payload = {
        email: userEmail,
      };

      const response = await findEmailInDB(payload);
      if(response){
        sessionStorage.setItem("accountInfo", JSON.stringify({
          ...response
        }));
        sessionStorage.setItem("userEmail", userEmail)
      }
      return response
    }catch(err){
       console.log("Error from finding account in DB", err);
       notifyError(err.message)
      return false;
    }
  }

  const verifyEmail = async({userEmail, code})=>{

    const payload = {
      email: userEmail,
      code: code
    };
      try{
        const response = await verifyEmailOTP(payload)
        if (response){  
          sessionStorage.setItem("accountInfo", JSON.stringify(response));
        }
        return response
      }catch(err){
        console.log("Error from verify mail OTP", err);
        notifyError(err.message)
        return false;
      }
  }
  return {
    isLoading,
    setLogin,
    setSocialLogin,
    setVerifyMail,
    setPassword,
    setForgotPassword,
    getUserLimit,
    findAccountInDB,
    verifyEmail,
    setAppAuth
    
  };
}
