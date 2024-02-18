import "./style.css";
import React, { useEffect, useState } from "react";
import useUser from "../../../hooks/user/user";
import useLocations from "../../../hooks/common/useLocations";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import {
  // ToggleSwitch,
  LabledInputBox,
} from "../../../components/FormControles";
import { Button } from "../../../components/Buttons/Button";
import { notifySuccess } from "../../../utils/notify";

export function SettingTab() {
  const {
    setUpdatePassword,
    setUpdateBillingAddrs,
    useGetBillingAddrs,
    // setUpdateProfile,
    // useGetProfile,
  } = useUser();

  const [listStates, setListStates] = useState([]);
  const [listCities, setListCities] = useState([]);
  const [userBilling, setUserBilling] = useState(undefined);

  const { useGetCountries, getLocStates, getLocCities } = useLocations();
  const { countriesData } = useGetCountries({ search: "" });
  const { userBillAddr, mutate } = useGetBillingAddrs();

  useEffect(() => {
    if (userBillAddr) setUserBilling(userBillAddr);
  }, [userBillAddr]);

  // const { userDet, mutate } = useGetProfile();

  // const handelRenewChange = async (e) => {
  //   await setUpdateProfile({
  //     renewAccount: e.target.checked,
  //   });
  //   mutate();
  // };

  // const handelAvailableChange = async (e) => {
  //   await setUpdateProfile({
  //     newCollection: e.target.checked,
  //   });
  //   mutate();
  // };

  return (
    <div>
      <div className="tab-page-main">
        <div className="tab-page-header">
          <h4>Settings</h4>
        </div>
        <div className="stab-page-body">
          <div className="stab-form-con">
            {/* <div className="stab-text-container">
              <h5 className="stab-heading-primary">Emailers</h5>
              <p className="stab-form-text">
                I would like to receive an email when
              </p>
            </div>{" "} */}
            {/* <div className="switch-body">
              <div className="switch-con">
                <ToggleSwitch
                  // isOn={values.renew}
                  id={"set-renew"}
                  // onChange={(e) => setFieldValue("renew", e.target.checked)}
                />
                <p className="stab-text-primary">Your account get renew</p>
              </div>
              <div className="switch-con">
                <ToggleSwitch
                  // isOn={values.available}
                  id={"set-available"}
                  // onChange={(e) => setFieldValue("available", e.target.checked)}
                />
                <p className="stab-text-primary">
                  New icons collection are available
                </p>
              </div>
            </div> */}
            {userBilling && (
              <Formik
                initialValues={{
                  billingName: userBilling?.name,
                  street: userBilling?.line1,
                  address: userBilling?.line2,
                  zipCode: userBilling?.zipCode,
                  country: userBilling?.country,
                  state: userBilling?.state,
                  city: userBilling?.city,
                }}
                validationSchema={Yup.object({
                  billingName: Yup.string(),
                  street: Yup.string(),
                  address: Yup.string(),
                  country: Yup.string(),
                  zipCode: Yup.string()
                    .matches(/^[0-9]+$/, "Must be only digits")
                    .max(6, "Must be exactly 5 digits"),
                  state: Yup.string(),
                  city: Yup.string(),
                })}
                onSubmit={async (values) => {
                  const res = await setUpdateBillingAddrs({
                    name: values.billingName,
                    line1: values.street,
                    line2: values.address,
                    zipCode: values.zipCode,
                    city: values.city,
                    state: values.state,
                    country: values.country,
                  });
                  if (res) {
                    mutate();
                    notifySuccess("data updated successfully.");
                  }
                }}
              >
                {({ values, isValid, setFieldValue }) => {
                  return (
                    <Form>
                      <div className="stab-text-container">
                        <div>
                          <h5 className="stab-heading-primary">
                            Billing details
                          </h5>
                          <p className="stab-form-text">
                            Invoice will be created to this billing details.
                          </p>
                        </div>
                        <div>
                          <Button
                            styleName={"margin-top"}
                            lable={"Update"}
                            type={"submit"}
                            btnSize="md"
                          />
                        </div>
                      </div>

                      <div className="stab-billing-body">
                        <div className="stab-bill-con">
                          <div className="stab-sec1">
                            <LabledInputBox
                              name={"billingName"}
                              type={"text"}
                              lable={"Billing Name"}
                              inputSize={"full"}
                              defaultValue={values.billingName}
                            />
                          </div>
                          <div className="stab-sec1">
                            <LabledInputBox
                              name={"street"}
                              type={"text"}
                              lable={"Street"}
                              inputSize={"full"}
                              defaultValue={values.street}
                            />
                          </div>
                          <div className="stab-sec1">
                            <LabledInputBox
                              name={"address"}
                              type={"text"}
                              lable={"Apt, Unite, Suite"}
                              inputSize={"full"}
                              defaultValue={values.address}
                            />
                          </div>
                          <div className="stab-sec1 margin-top">
                            <LabledInputBox
                              name={"country"}
                              type={"select"}
                              lable={"Country"}
                              inputSize={"sm"}
                              options={countriesData}
                              onChange={async (e) => {
                                setFieldValue("country", e.value);
                                const statesData = await getLocStates({
                                  countryId: e?.key,
                                  search: "",
                                });

                                if (statesData && statesData.length > 0) {
                                  setListStates(statesData);
                                }
                              }}
                              defaultValue={{
                                label: values.country,
                                value: values.country,
                              }}
                            />

                            <LabledInputBox
                              name={"zipCode"}
                              type={"text"}
                              lable={"Zip Code"}
                              inputSize={"sm"}
                              defaultValue={values.zipCode}
                            />
                          </div>
                          <div className="stab-sec1 margin-top">
                            <LabledInputBox
                              name={"state"}
                              type={"select"}
                              lable={"State"}
                              inputSize={"sm"}
                              options={listStates}
                              onChange={async (e) => {
                                setFieldValue("state", e.value);

                                const citiesData = await getLocCities({
                                  stateId: e?.key,
                                  search: "",
                                });

                                if (citiesData && citiesData.length > 0) {
                                  setListCities(citiesData);
                                }
                              }}
                              defaultValue={{
                                label: values.state,
                                value: values.state,
                              }}
                            />
                            <LabledInputBox
                              name={"city"}
                              type={"select"}
                              lable={"City"}
                              inputSize={"sm"}
                              options={listCities}
                              onChange={(e) => setFieldValue("city", e.value)}
                              defaultValue={{
                                label: values.city,
                                value: values.city,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            )}
            <Formik
              initialValues={{
                currentPassword: "",
                newPassword: "",
                conNewPass: "",
              }}
              validationSchema={Yup.object({
                currentPassword: Yup.string(),
                newPassword: Yup.string(),
                conNewPass: Yup.string().oneOf(
                  [Yup.ref("newPassword"), null],
                  "Passwords must match"
                ),
              })}
              onSubmit={async (values) => {
                const res = await setUpdatePassword({
                  oldPassword: values.currentPassword,
                  newPassword: values.conNewPass,
                });

                if (res) {
                  notifySuccess("Password updated successfully.");
                }
              }}
            >
              {({ values, isValid }) => {
                const isDisabled =
                  values.currentPassword && values.conNewPass ? !isValid : true;
                return (
                  <Form>
                    <div className="stab-text-container">
                      <div className="stab-security-container">
                        <h5 className="stab-heading-primary">Security</h5>
                        <p className="stab-form-text">Change your password.</p>
                      </div>
                      <div>
                        <Button
                          styleName={"margin-top"}
                          lable={"Update"}
                          type={"submit"}
                          btnSize="md"
                          disabled={isDisabled}
                        />
                      </div>
                    </div>
                    <div className="margin-bottom">
                      <div className="stab-bill-con">
                        <div className="stab-sec1">
                          <LabledInputBox
                            name={"currentPassword"}
                            type={"password"}
                            lable={"Current Password"}
                            inputSize={"full"}
                            placeholder={"Type"}
                            defaultValue={values.currentPassword}
                          />
                        </div>
                        <div className="stab-sec1">
                          <LabledInputBox
                            name={"newPassword"}
                            type={"password"}
                            lable={"New Password"}
                            inputSize={"full"}
                            defaultValue={values.newPassword}
                          />
                        </div>
                        <div className="stab-sec1">
                          <LabledInputBox
                            name={"conNewPass"}
                            type={"text"}
                            lable={"Confirm New Password"}
                            inputSize={"full"}
                            defaultValue={values.conNewPass}
                          />
                        </div>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
