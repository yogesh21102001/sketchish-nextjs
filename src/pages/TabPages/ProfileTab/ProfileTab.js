import "./style.css";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { Button } from "../../../components/Buttons/Button";
import { LabledInputBox } from "../../../components/FormControles";
import { Typography } from "../../../components/Typography";
import { Form, Formik } from "formik";
import useUser from "../../../hooks/user/user";
import useLocations from "../../../hooks/common/useLocations";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../../../utils/notify";
import { ResponsiveModal } from "../../../components/ResponsiveModal";
import { UpdateEmail } from "../../../components/updateEmail/updateEmail";

export function ProfileTab() {
  const titleOptions = [
    {
      value: "orange",
      label: "Orange",
      key: "e98a3150-8ff7-5062-960e-df961b41ca15",
    },
    {
      value: "yellow",
      label: "Yellow",
      key: "727daba7-911c-5ba6-a0a8-815df4c68531",
    },
    {
      value: "green",
      label: "Green",
      key: "2a469db7-81ee-5a7e-8866-fd7c264809d7",
    },
    {
      value: "forest",
      label: "Forest",
      key: "f867f25f-4336-55eb-8ef1-f1faa6b5f3d3",
    },
    {
      value: "slate",
      label: "Slate",
      key: "a513b64c-75aa-5a39-964f-3103d33fa74c",
    },
    {
      value: "silver",
      label: "Silver",
      key: "6b915c2c-c3d1-506f-bbe5-b7db0655a96c",
    },
  ];

  const [listStates, setListStates] = useState([]);
  const [listCities, setListCities] = useState([]);

  // modal states
  const [isUpdateEmailOpen, setIsUpdateEmailOpen] = useState(false);
  const [getDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();
  const { useGetProfile, setUpdateProfile, setSetupProfile } = useUser();
  const { useGetCountries, getLocStates, getLocCities } = useLocations();
  const { countriesData } = useGetCountries({ search: "" });

  const { userDet, mutate } = useGetProfile();

  const handelUpgrade = () => navigate("/pricing");

  const handelEdit = () => {
    setIsDisabled(!getDisabled);
  };

  useEffect(() => {
    if (userDet && userDet.photo)
      localStorage.setItem("profileImg", userDet?.photo);
  });

  const handelEmailUpdate = async () => setIsUpdateEmailOpen(true);

  return (
    <>
      <div className="tab-page-main">
        <div className="tab-page-header">
          <h4>Profile</h4>
        </div>
        <div className="tab-page-body">
          <div className="ptab-form-con">
            <div className="ptab-profile-sec">
              <div className="ptab-prof-det">
                <input
                  name="profileUpload"
                  id="profileUpload"
                  type="file"
                  placeholder="Last Name"
                  accept="image/*"
                  onChange={async (event) => {
                    await setSetupProfile({
                      assets: event.currentTarget.files[0],
                    });
                    mutate();
                  }}
                  hidden
                />
                {userDet?.photo ? (
                  <label htmlFor="profileUpload">
                    <img
                      src={userDet?.photo}
                      alt=""
                      className="ptab-profile-badge"
                    />
                  </label>
                ) : (
                  <>
                    <label htmlFor="profileUpload">
                      <div className="ptab-profile-badge">
                        <span className="ptab-lbl-badge">
                          {userDet?.firstName && userDet?.lastName
                            ? userDet?.firstName[0] + userDet?.lastName[0]
                            : userDet?.fullName
                            ? userDet?.fullName[0]
                            : "?"}
                        </span>
                      </div>
                    </label>
                  </>
                )}
                <div className="ptab-fn-pln-info">
                  <span className="ptab-lbl-fl-name">{userDet?.fullName}</span>
                  <span className="ptab-lbl-plan">
                    {userDet?.plan === "pro"
                      ? "Pro "
                      : userDet?.plan === "advance"
                      ? "Advance "
                      : "Basic "}
                    Plan
                  </span>
                </div>
              </div>
              <div className="ptab-upgrade-sec">
                <Button
                  lable={"Upgrade"}
                  btnSize={"hg"}
                  onClick={handelUpgrade}
                />
              </div>
            </div>
            <div className="ptab-form-area">
              {userDet && (
                <Formik
                  enableReinitialize
                  initialValues={{
                    firstName: userDet?.firstName,
                    lastName: userDet?.lastName,
                    email: userDet?.email,
                    title: userDet?.title,
                    country: userDet?.country,
                    zipCode: userDet?.zipCode,
                    state: userDet?.state,
                    city: userDet?.city,
                  }}
                  validationSchema={Yup.object({
                    firstName: Yup.string(),
                    lastName: Yup.string(),
                    email: Yup.string().email(),
                    title: Yup.string(),
                    country: Yup.string(),
                    zipCode: Yup.string(),
                    state: Yup.string(),
                    city: Yup.string(),
                  })}
                  onSubmit={async (values) => {
                    const res = await setUpdateProfile({
                      firstName: values.firstName,
                      lastName: values.lastName,
                      title: values.title,
                      state: values.state,
                      city: values.city,
                      country: values.country,
                      zipCode: values.zipCode,
                    });
                    mutate();
                    if (res) notifySuccess("Profile updated successfully.");
                  }}
                >
                  {({ values, isValid, setFieldValue }) => {
                    return (
                      <Form>
                        <div className={getDisabled ? "disabled" : ""}>
                          <div className="ptab-fa-sec1">
                            <LabledInputBox
                              name={"firstName"}
                              type={"text"}
                              lable={"First Name"}
                              inputSize={"sm"}
                              defaultValue={values.firstName}
                              disabled={getDisabled}
                            />

                            <LabledInputBox
                              name={"lastName"}
                              type={"text"}
                              lable={"Last Name"}
                              inputSize={"sm"}
                              defaultValue={values.lastName}
                              disabled={getDisabled}
                            />
                          </div>
                          <div className="ptab-fa-sec2">
                            <LabledInputBox
                              name={"email"}
                              type={"email"}
                              lable={"Email*"}
                              inputSize={"lg"}
                              defaultValue={values.email}
                              disabled={getDisabled}
                            />
                          </div>
                          <div className="ptab-fa-sec3">
                            <span className="ptab-fa-upd-mail">
                              <Typography
                                variant={"cap"}
                                children={"Update"}
                                color={"blue"}
                                onClick={handelEmailUpdate}
                                disabled={getDisabled}
                              />
                            </span>
                          </div>
                          <div className="ptab-fa-sec2">
                            <LabledInputBox
                              name={"title"}
                              type={"text"}
                              lable={"Title"}
                              inputSize={"lg"}
                              options={titleOptions}
                              defaultValue={userDet?.title}
                              disabled={getDisabled}
                              onChange={(e) => setFieldValue("title", e.value)}
                            />
                            {/* <Selectdrop options={titleOptions} /> */}
                          </div>
                          <div className="ptab-fa-sec1 margin-top">
                            <LabledInputBox
                              name={"country"}
                              type={"select"}
                              lable={"Country"}
                              inputSize={"sm"}
                              options={countriesData}
                              disabled={getDisabled}
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
                              disabled={getDisabled}
                            />
                          </div>
                          <div className="ptab-fa-sec1 margin-top">
                            <LabledInputBox
                              name={"state"}
                              type={"select"}
                              lable={"State"}
                              inputSize={"sm"}
                              options={listStates}
                              disabled={getDisabled}
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
                              disabled={getDisabled}
                              onChange={(e) => setFieldValue("city", e.value)}
                              defaultValue={{
                                label: values.city,
                                value: values.city,
                              }}
                            />
                          </div>
                        </div>
                        {getDisabled && (
                          <div className="ptab-fa-sec4">
                            <Button
                              lable={"Edit Profile"}
                              btnSize={"mlg"}
                              onClick={handelEdit}
                            />
                          </div>
                        )}
                        {!getDisabled && (
                          <div className="ptab-fa-sec4">
                            <Button type="submit" lable="Update" btnSize="hg" />
                          </div>
                        )}
                      </Form>
                    );
                  }}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modals */}
      <ResponsiveModal
        isOpen={isUpdateEmailOpen}
        onClose={() => setIsUpdateEmailOpen(true)}
        showCloseIcon={false}
        component={
          <UpdateEmail setOpen={setIsUpdateEmailOpen} user={userDet} />
        }
      />
    </>
  );
}
