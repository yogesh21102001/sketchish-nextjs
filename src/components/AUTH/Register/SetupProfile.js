import "../style.css";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button } from "../../Buttons/Button";
import { ProfileUploadSVG } from "../../../assets/svg";
import { notifySuccess } from "../../../utils/notify";
import { useNavigate } from "react-router-dom";

import useUser from "../../../hooks/user/user";
import { LabledInputBox } from "../../FormControles/LabledInputBox/LabledInputBox";

export function SetupProfile({ setOpen }) {
  const { setSetupProfile } = useUser();
  const navigate = useNavigate();
  const handelSkip = () => {
    setOpen(false);
    navigate("/");
  };
  const titleOptions = [
    {
      id: 1,
      value: "softwareDeveloper",
      label: "Software Developer",
    },
    {
      id: 2,
      value: "teamLead",
      label: "Team Lead",
    },
    {
      id: 3,
      value: "student",
      label: "Student",
    },
  ];

  const validate = Yup.object({
    firstName: Yup.string().required("firsName is require"),
    lastName: Yup.string().required("lastName is require"),
    title: Yup.string(),
  });

  const handleSubmit = async (values) => {
    const res = await setSetupProfile({
      firstName: values.firstName,
      lastName: values.lastName,
      assets: values.profilePic,
      title: values.title,
    });

    if (res === "OK") {
      const user = JSON.parse(localStorage.getItem("user"));

      user.firstName = values.firstName;
      user.lastName = values.lastName;

      localStorage.setItem("user", JSON.stringify(user));

      setOpen(false);
      notifySuccess("Your profile has been updated");
      navigate("/");
    }
  };

  return (
    <>
      <div className="snp-main">
        <div className="snp-con">
          <div className="snp-header"></div>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              profilePic: null,
              title: "",
            }}
            validationSchema={validate}
            onSubmit={handleSubmit}
          >
            {({ isValid, values, setFieldValue }) => {
              const isDisabled =
                values.firstName && values.lastName ? !isValid : true;
              return (
                <Form>
                  <div className="snp-profile-img-area">
                    <label htmlFor="profileUpload">
                      {values && values.profilePic ? (
                        <img
                          src={URL.createObjectURL(values.profilePic)}
                          alt=""
                          className="sp-uploded-img"
                        />
                      ) : (
                        <ProfileUploadSVG className="sp-uploded-img" />
                      )}
                    </label>
                    <Field
                      name="profileUpload"
                      id="profileUpload"
                      type="file"
                      placeholder="Last Name"
                      accept="image/*"
                      onChange={(event) => {
                        setFieldValue(
                          "profilePic",
                          event.currentTarget.files[0]
                        );
                      }}
                      hidden
                    />
                    <label className="sp-uploded-img-lable">
                      {values && values.profilePic ? "" : "Add a photo"}
                    </label>
                  </div>
                  <div className="snp-input-area">
                    <div className="snp-input-fields">
                      <div className="snp-input-box">
                        <LabledInputBox
                          name="firstName"
                          type="text"
                          placeholder="First Name"
                          autoComplete="off"
                          inputSize="xsm"
                          // className="snp-input-box"
                        />
                      </div>
                      <div className="snp-input-box">
                        <LabledInputBox
                          name="lastName"
                          type="text"
                          placeholder="Last Name"
                          autoComplete="off"
                          inputSize="xsm"
                          // className="snp-input-box"
                        />
                      </div>
                    </div>
                    <div className="snp-input-sel-box">
                      <LabledInputBox
                        name="title"
                        type={"text"}
                        options={titleOptions}
                      />
                    </div>
                  </div>
                  <div className="snp-btn-area">
                    <div className="form-padding">
                      <Button
                        styleName={"margin-top"}
                        lable={"Continue"}
                        type={"submit"}
                        btnSize="lg"
                        disabled={isDisabled}
                      />
                    </div>
                    <div className="form-padding hide">
                      <Button
                        styleName={"margin-top"}
                        lable={"Skip for now"}
                        type={"submit"}
                        btnSize="lg"
                        outlined={true}
                        onClick={handelSkip}
                      />
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
}
