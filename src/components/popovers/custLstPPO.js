import React from "react";
import { notifySuccess } from "../../utils/notify";
import useUser from "../../hooks/user/user";
import "./style.css";

export function CustLstPPO({ setClickedMore, customerData }) {
  const {
    setUserInvite,
    setUserArchive,
    setUnUserArchive,
    useGetCustomerList,
  } = useUser();
  const { mutate } = useGetCustomerList();
  const handleClose = () => setClickedMore("");

  const handelInvite = async () => {
    handleClose();
    await setUserInvite({
      userEmail: customerData?.email,
    });
  };

  const handelArchive = async () => {
    handleClose();
    if (customerData && !customerData?.isArchived) {
      await setUserArchive({ id: customerData?._id });
      mutate();
      notifySuccess("Archived Successfully.");
    } else {
      await setUnUserArchive({ id: customerData?._id });
      mutate();
      notifySuccess("Active Successfully.");
    }
  };

  return (
    <div className="clp-popover-container clp-p-c-margin-right">
      <div className="clp-p-i-link">
        {customerData &&
        customerData?.status &&
        customerData?.status === "invited" &&
        !customerData?.isArchived ? (
          <div className="clp-popover-items" onClick={handelInvite}>
            Resend Invite
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="clp-p-i-link">
        <div className="clp-popover-items" onClick={handelArchive}>
          {customerData && !customerData?.isArchived ? "Archive" : "Active"}
        </div>
      </div>
    </div>
  );
}
