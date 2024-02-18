import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./style.css";
import { Button } from "../Buttons/Button";
import React from "react";
import { LabledInputBox } from "../FormControles/LabledInputBox/LabledInputBox";
import { Typography } from "../Typography";
import useUser from "../../hooks/user/user";

import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../../utils/notify";

export function UpdateEmail({ setOpen, user }) {
  const navigate = useNavigate();
  const { setUpdateEmail } = useUser();

  return (
    <>
      <div className="upd-prof-con-main">
        <div className="upd-prof-head">
          <Typography variant={"h4"}>Update Email</Typography>
        </div>
        <Formik
          initialValues={{ email: user?.email, newEmail: "" }}
          validationSchema={Yup.object({
            newEmail: Yup.string().email(),
          })}
          onSubmit={async (values) => {
            const res = await setUpdateEmail({ newEmail: values.newEmail });
            if (
              res == "Email send successfully"
            ) {
              setOpen(false);
              notifySuccess("Verify Email send successfully.");
            }
          }}
        >
          {({ isValid, values, errors }) => {
            const isDisabled = values.newEmail ? !isValid : true;
            return (
              <Form>
                <div className="upd-prof-tb">
                  <LabledInputBox
                    name="email"
                    type="email"
                    placeholder="New password"
                    lable="Current Email"
                    autoComplete="off"
                    defaultValue={values.email}
                    inputSize="lg"
                    disabled={true}
                  />

                  <LabledInputBox
                    name="newEmail"
                    type="email"
                    placeholder="Email"
                    lable="New Email"
                    autoComplete="off"
                    inputSize="lg"
                  />

                  <Typography variant={"para1"}>
                    We will send a verification link to your new email.
                  </Typography>
                </div>

                <div className="upd-prof-btns">
                  <Button
                    styleName={"margin-top"}
                    lable={"Cancel"}
                    type={"button"}
                    btnSize="full"
                    onClick={() => {
                      setOpen(false);
                    }}
                    outlined={true}
                  />

                  <Button
                    styleName={"margin-top"}
                    lable={"Continue"}
                    type={"submit"}
                    btnSize="full"
                    disabled={isDisabled}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}
