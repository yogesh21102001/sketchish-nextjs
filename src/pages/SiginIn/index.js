import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { setFigmaLoginId } from "../../common-apis/auth/auth";
import AuthContext from "../../context/AuthProvider";
import { isEmpty } from '../../utils/helpers'
import {
    ForgotPassword,
    VerifyMailSuccess
} from "../../components/AUTH";

import {
    Signup
} from "../../components/AUTH-v2";

import { Login } from "../../components/Auth-v3/Login/Login";


import "./style.css";
import NavBar from "../../components/NavBar/NavBar";
import { CongPopUp } from "../../components/Auth-v3";
import { ResponsiveModal } from "../../components/ResponsiveModal";
// the query string for you.
function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function UserLogin() {
    const navigate = useNavigate()
    const query = useQuery();
    const figmaLoginId = query.get('figmaLoginId');
    const { auth } = useContext(AuthContext);
    const [isLoginAtempted, setIsLoginAtempted] = useState(false);
    const [isForgotPassword, setForgotPassword] = useState(false);
    const [getExistingEmail, setExistingEmail] = useState("");
    const [isVerifyOpen, setIsVerifyOpen] = useState(false);
    const [isVerifyMailOpen, setIsVerifyMailOpen] = useState(false);
    const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("user")) {
            if (!isLoginAtempted) {
                setFigmaLoginId({ figmaClientId: figmaLoginId })
            }
            if (!isEmpty(figmaLoginId)) {
                navigate('/figma/success')
            } else {
                const _user = JSON.parse(localStorage.getItem("user"))
                if (_user?.role == "admin") {
                    navigate('/admin/icons')
                } else {
                    navigate('/icons')
                }
            }
        } else {
        }
    }, [auth]);

    useEffect(() => {
        sessionStorage.removeItem("loaded")
    }, [])

    return (
        <>
            <NavBar />
            <div className="user-signIn">
                <div className="login">
                    <div className="container">
                        <Login
                            setOpen={() => { }}
                            figmaLoginId={figmaLoginId}
                            setIsLoginAtempted={setIsLoginAtempted}
                            ForgotPassword={setForgotPassword}
                            userEmail={getExistingEmail}
                            CreateAccount={setIsVerifyOpen}
                            setIsSignUpSuccess={setIsSignUpSuccess}
                        />

                        <ResponsiveModal
                            isOpen={isSignUpSuccess}
                            onClose={() => {
                                sessionStorage.removeItem("accountInfo");
                                sessionStorage.removeItem("loaded");
                                setIsSignUpSuccess(false);
                            }}
                            closeOnOverlayClick={false}
                            component={
                                <CongPopUp
                                    setOpen={setIsSignUpSuccess}
                                />
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
