import React, { useState } from "react";
import Styles from "./style.module.css";

import { Typography } from "../../../components/Typography";
import useUser from "../../../hooks/user/user";
import useLocations from "../../../hooks/common/useLocations";

import { notifySuccess } from "../../../utils/notify";
import { Button, InputField } from "../../../ui";
import CustomDropDown from "../../../components/custom-dropdown/CustomDropDown";

const EditProfile = ({ setOpen, user, mutate }) => {
  const [listStates, setListStates] = useState([]);
  const [listCities, setListCities] = useState([]);
  const { setUpdateProfile } = useUser();
  const { useGetCountries, getLocStates, getLocCities } = useLocations();
  const { countriesData } = useGetCountries({ search: "" });
  console.log(countriesData);

  return (
    <div className={Styles.wraper}>
      <div className={Styles.cont}>
        <h3>Basic details</h3>
        <div className={Styles.input_cont}>
          <InputField
            className={Styles.input}
            width={"100%"}
            placeHolder={"First name"}
          />
          <InputField
            className={Styles.input}
            width={"100%"}
            placeHolder={"Last name"}
          />
          <CustomDropDown
            placeholder={"Select Country"}
            options={["1"]}
            onSelect={() => {}}
            width={"100%"}
            className={Styles.input}
          />
          <InputField
            className={Styles.input}
            width={"100%"}
            placeHolder={"State, City"}
          />
          <InputField
            className={Styles.input}
            width={"100%"}
            placeHolder={"Zip Code"}
          />
        </div>
        <div className={Styles.btn_cont}>
          <Button width={"49%"} onClick={() => {}}>
            Cancel
          </Button>
          <Button width={"49%"} onClick={() => {}} highlight={true}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
