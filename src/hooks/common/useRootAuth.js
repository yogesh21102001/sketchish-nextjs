import {
    login,
    socialLogin,
    verifyMail,
    setupNewPassword,
    forgotPassword,
    userLimit
} from "../../common-apis/auth/auth";

import { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { notifyError, notifySuccess } from "../../utils/notify";
export default function useAuth() {

    const [isLoading, setLoading] = useState(false);

    const { auth, setAuth } = useContext(AuthContext);

    const setAppAuth = (data) => {
        // setting up the auth provider
        setAuth({
            type: "LOGIN",
            payload: data,
        });

        // setting up localStorage
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("profileImg", data.photo);
        localStorage.setItem("plan", data.plan);
    };
    const getUserLimit = async () => {
        try {
            const response = await userLimit();
            setAuth({ ...auth, ...{ userLimit: response } });
            return true;
        } catch (e) {
            return false;
        }
    };
    const setLogin = async (userEmail, userPassword, type = "user") => {
        try {
            setLoading(true);

            const loginData = await login({
                email: userEmail,
                password: userPassword,
            });

            if (type === "user") {
                setAppAuth({
                    id: loginData?.user?._id,
                    firstName: loginData?.user?.firstName,
                    lastName: loginData?.user?.lastName,
                    fullName: loginData?.user?.fullName,
                    email: loginData?.user?.email,
                    role: loginData?.user?.role,
                    photo: loginData?.user?.photo,
                    token: loginData?.token,
                    plan: loginData?.plan,
                });
            } else {
                if (loginData?.user?.role === "admin") {
                    setAppAuth({
                        id: loginData?.user?._id,
                        firstName: loginData?.user?.firstName,
                        lastName: loginData?.user?.lastName,
                        fullName: loginData?.user?.fullName,
                        email: loginData?.user?.email,
                        role: loginData?.user?.role,
                        photo: loginData?.user?.photo,
                        token: loginData?.token,
                    });
                }
            }

            setLoading(false);
            notifySuccess("You are logged in successfully");

            return loginData;
        } catch (e) {
            if (e.message === "Invalid Password") {
                // notifyError("Please enter correct password.");
            }
            setLoading(false);
            return false;
        }
    };

    const setSocialLogin = async ({
        userFirstName,
        userLastName,
        userEmail,
        userPhoto,
        type = "GOOGLE",
    }) => {
        try {
            setLoading(true);

            const loginData = await socialLogin({
                firstName: userFirstName,
                lastName: userLastName,
                email: userEmail,
                photo: userPhoto,
                type,
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

    return {
        isLoading,
        setLogin,
        setSocialLogin,
        setVerifyMail,
        setForgotPassword,
        getUserLimit
    };
}
