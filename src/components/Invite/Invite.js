import { Formik, Form } from "formik";
import "./style.css";
import { Button } from "../Buttons/Button";
import useUser from "../../hooks/user/user";
import React from "react";
import { LabledInputBox } from "../../components/FormControles/LabledInputBox/LabledInputBox";

export function InvitePopovcer({ setOpen }) {
  const { setUserInvite, useGetCustomerList } = useUser();

  const { mutate } = useGetCustomerList();
  return (
    <>
      {
        <div className="invite-popover-section">
          <div className="login">
            <div className="invite-popover">
              <div className="form-login">
                <div className="verify-suc-main heading-margin">
                  <div className="heading-primary form-padding margin">
                    Send an Invite to join OpenStroke!
                    <br />
                  </div>
                  <Formik
                    initialValues={{ email: "" }}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                      setSubmitting(false);

                      await setUserInvite({
                        userEmail: values?.email,
                      });

                      mutate();
                      setOpen(false);
                    }}
                  >
                    {({ values, isDisabled, outlined = true }) => {
                      return (
                        <Form>
                          <div>
                            <div className="form-padding margin-bottom">
                              <LabledInputBox
                                lable={"Email"}
                                name="email"
                                type="email"
                                placeholder="email"
                                autoComplete="off"
                              />
                              <span className="error">
                                Email already exist.
                              </span>
                            </div>
                          </div>
                          <div className="form-padding">
                            <Button
                              styleName={"margin-top"}
                              lable={"Invite"}
                              type={"submit"}
                              btnSize="lg"
                              disabled={isDisabled}
                            />
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
