/* global google */
import React from "react";
import FacebookLogin from "react-facebook-login";
import { FacebookSVG, GoogleSVG } from "../assets/svg";
import useAuth from "../hooks/common/useAuth";
import { Button } from "../ui";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
const facebookAppId =
  process.env.REACT_APP_FACEBOOK_APP_ID || "185202659227880";

async function fetchGoogleData(token,) {
  const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    method: "GET",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + token,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export default function SocialLogin({ className, type = "GOOGLE", setOpen, figmaLoginId }) {
  const { setSocialLogin } = useAuth();

  const onSuccess = async (res) => {
    if (type === "GOOGLE") {
      const googleProfile = await fetchGoogleData(res.access_token)
      if (googleProfile?.email) {
        setSocialLogin({
          userEmail: googleProfile?.email,
          userFirstName: googleProfile?.given_name,
          userLastName: googleProfile?.family_name,
          userPhoto: googleProfile?.picture,
          figmaLoginId
        });
      }
    }
    if (type === "FACEBOOK") {
      console.log("[Login Success FACEBOOK] currentUser: ", res);
    }
    if (setOpen) setOpen(false);
  };

  const onFailure = (err) => {
    console.log("[Login failed] err: ", err);
  };
  const login = useGoogleLogin({
    onSuccess: onSuccess,
    onError: onFailure
  });
  if (type === "GOOGLE")
    return (
      <Button
        type="button"
        textStyle={"capitalize"}
        onClick={() => {
          login()
          setOpen(false)
          sessionStorage.removeItem("loaded");
        }}
        outlined={true}
        className={className}
      >
        <GoogleSVG />
        Continue With Google
      </Button>
    );

  if (type === "FACEBOOK")
    return (
      <FacebookLogin
        textButton="Continue with Facebook"
        appId={facebookAppId}
        fields="name,email,picture"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cssClass={"form-button-outlined form-facebook-btn"}
        isDisabled={true} // missing Facebook App ID thats why we disabled it.
        icon={<FacebookSVG />}
      />
    );
}
