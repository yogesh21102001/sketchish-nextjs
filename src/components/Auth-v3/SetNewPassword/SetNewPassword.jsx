import React, { useEffect, useState } from "react";
import Styles from "../Login/styles.module.css";

import { InputField, Button } from "../../../ui";
import useAuth from "../../../hooks/common/useAuth";
import { useNavigate } from "react-router-dom";

import { notifySuccess } from "../../../utils/notify";

export const SetNewPassword = ({ hash, setOpen, type = "CREATE_NEW_ACCT" }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate();

  const { setPassword } = useAuth();

  const onDone = (status) => {
    setOpen(false);
    navigate("/");
  };
  const hendelSubmit = async (confirmPass) => {
    const res = await setPassword(
      {
        hash,
        password: confirmPass,
        type,
      },
      onDone
    );
    if (res === "Password set successfully") {
      setOpen(false);
      notifySuccess("Password set successfully");
      sessionStorage.removeItem("loaded");
      window.location.replace("/");
    }
  };

  return (
    <div className={Styles.login_wraper}>
      <div className={Styles.login_cont}>
        <>
          <div className={Styles.top}>
            <div>
              <h2 style={{ fontSize: "1rem" }}>Set a password</h2>
              <p className={Styles.pass_desc}>
                Use a password at least 15 letters long, or at least 8
                characters long with both letters and numbers.
              </p>
            </div>
            <div className={Styles.inp_field_cont}>
              <div className={Styles.inp_cont}>
                <InputField
                  placeHolder={"Enter new password"}
                  value={newPassword}
                  type={"password"}
                  onChange={setNewPassword}
                />

                <InputField
                  placeHolder={"Confirm your new password"}
                  value={confirmPass}
                  type={"password"}
                  onChange={setConfirmPass}
                />
              </div>

              <Button
                onClick={() => hendelSubmit(confirmPass)}
                highlight={
                  newPassword && confirmPass && newPassword == confirmPass
                    ? true
                    : false
                }
                className={Styles.social_login_btn}
                style={{ fontWeight: "400" }}
                textStyle={"capitalize"}
                disable={
                  newPassword && confirmPass && newPassword == confirmPass
                    ? false
                    : true
                }
              >
                Send reset code
              </Button>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};
