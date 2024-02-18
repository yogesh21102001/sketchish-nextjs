import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./style.css";
import { Button } from "../../../components/Buttons/Button";

import { LabledInputBox } from "../../../components/FormControles/LabledInputBox/LabledInputBox";
import { Typography } from "../../../components/Typography";
import useUser from "../../../hooks/user/user";
import useLocations from "../../../hooks/common/useLocations";

import { notifySuccess } from "../../../utils/notify";
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
function UpdateEmail({ setOpen, user, mutate }) {
    const [listStates, setListStates] = useState([]);
    const [listCities, setListCities] = useState([]);
    const { setUpdateProfile } = useUser();
    const { useGetCountries, getLocStates, getLocCities } = useLocations();
    const { countriesData } = useGetCountries({ search: "" });

    return (
        <>
            <div className="upd-prof-con-main">
                <div className="upd-prof-head">
                    <Typography variant={"h4"}>Basic Details</Typography>
                </div>
                <Formik
                    initialValues={{
                        firstName: user?.firstName,
                        lastName: user?.lastName,
                        title: user?.title,
                        country: user?.country,
                        zipCode: user?.zipCode,
                        state: user?.state,
                        city: user?.city,
                    }}
                    validationSchema={Yup.object({
                        firstName: Yup.string(),
                        lastName: Yup.string(),
                        title: Yup.string(),
                        country: Yup.string(),
                        zipCode: Yup.number(),
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
                            zipCode: values.zipCode + "",
                        });
                        mutate();
                        setOpen(false);
                        if (res) notifySuccess("Profile updated successfully.");
                    }}
                >
                    {({ isValid, values, errors, setFieldValue }) => {
                        console.log('isValid', isValid)
                        return (
                            <Form>
                                <div className="inpit_cont">
                                    <LabledInputBox
                                        name={"firstName"}
                                        type={"text"}
                                        lable={"First Name"}
                                        inputSize={"sm"}
                                        defaultValue={values.firstName}

                                    />

                                    <LabledInputBox
                                        name={"lastName"}
                                        type={"text"}
                                        lable={"Last Name"}
                                        inputSize={"sm"}
                                        defaultValue={values.lastName}

                                    />

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
                                        type={"number"}
                                        lable={"Zip Code"}
                                        inputSize={"sm"}
                                        defaultValue={values.zipCode}
                                    />

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
                                {/* <div className="ptab-fa-sec2">
                                    <LabledInputBox
                                        name={"title"}
                                        type={"text"}
                                        lable={"Title"}
                                        inputSize={"lg"}
                                        options={titleOptions}
                                        defaultValue={user?.title}
                                        onChange={(e) => setFieldValue("title", e.value)}
                                    />
                                </div> */}
                                {/* <div className="ptab-fa-sec1 margin-top">
                                
                                </div> */}
                                <div style={{ width: "340px" }} >
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
                                        lable={"Save"}
                                        type={"submit"}
                                        btnSize="full"
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

export default UpdateEmail;