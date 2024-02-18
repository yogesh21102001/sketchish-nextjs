import { useState } from "react";
import useSWR from "swr";
import { format } from "date-fns";
import useAuth from "../common/useAuth";
import {
  setupProfile,
  getDownloadHistory,
  updateProfile,
  updateBillingAddrs,
  updatePassword,
  getBillingAddrs,
  getCustomerList,
  updateEmail,
  updateSetNewMail,
  userInvite,
  archiveUser,
  unArchiveUser,
  getReportList,
  getInvoicetList,
  getInvoiceDetail,
  registerUser,
  getContactUs,
  getUserDetail,
} from "../../common-apis/user/user";

import { setFigmaLoginId } from "../../common-apis/auth/auth"

import { Typography } from "../../components/Typography";
import { isAuthenticated, isEmpty } from "../../utils/helpers";
import { notifyError, notifySuccess } from "../../utils/notify";

export default function useUser() {
  const [isLoading, setLoading] = useState(false);
  const { setAppAuth } = useAuth()

  const iconCon = (icon, name) => {
    return (
      <div className="ht-ico-tb-con">
        <img src={icon} alt="" className="ht-ico-tb-preview" />
        <Typography variant={"body1"}> {name}</Typography>
      </div>
    );
  };

  const setSetupProfile = async ({ firstName, lastName, assets, title }) => {
    try {
      setLoading(true);

      const formData = new FormData();

      if (!isEmpty(firstName)) formData.append("firstName", firstName);
      if (!isEmpty(lastName)) formData.append("lastName", lastName);
      if (assets) formData.append("assets", assets);

      if (!isEmpty(title)) formData.append("title", title);

      const response = await setupProfile(formData);

      setLoading(false);

      return response;
    } catch (e) {
      setLoading(false);
      notifyError(e.message);
      return false;
    }
  };

  const setRegisterUser = async ({ firstName, password, email }, figmaLoginId = undefined) => {
    try {
      setLoading(true);
      if (figmaLoginId == null) {
        figmaLoginId = undefined;
      }

      const payload = {};

      if (!isEmpty(firstName)) payload.firstName = firstName;
      if (!isEmpty(password)) payload.password = password;
      if (!isEmpty(email)) payload.email = email;

      const response = await registerUser(payload);
      sessionStorage.removeItem("accountInfo")

      setAppAuth({
        id: response?.user?._id,
        firstName: response?.user?.firstName,
        lastName: response?.user?.lastName,
        fullName: response?.user?.fullName,
        email: response?.user?.email,
        role: response?.user?.role,
        photo: response?.user?.photo,
        token: response?.token,
        plan: response?.user?.role == 'admin' ? response?.plan : response?.user?.plan,
      });
      if (isEmpty(response?.figmaClientId) && !isEmpty(figmaLoginId)) {
        await setFigmaLoginId({ figmaClientId: figmaLoginId })
      }
      notifySuccess("You are logged in successfully");
      setLoading(false);
      return response;
    } catch (e) {
      setLoading(false);
      return false;
    }
  };

  const UseDownloadHistory = async() => {
   try{
     const url = `/user/download-history`;
     const data = await getDownloadHistory(url)
    //  data
    //    ? (data.name = { value: data.name, label: data.name, key: data._id })
    //    : null;
     const result = [];
     data?.map((e) => {
       result.push({
         id: e._id,
         productId: e?.productVariants?._id,
         productVariants: e?.productVariants,
         iconData: iconCon(
           e?.productVariants?.previewUrl,
           e?.productVariants?.label
         ),
         url: e?.productVariants?.previewUrl,
         label: e?.productVariants?.label,
         mainLabel: e?.productDetails?.label + `.${e?.type || "png"}`,
         price: e?.isPurchased ? "$1.99" : e.isSubscribed ? "-" : "Free",
         paid: e?.productVariants?.paid,
         isCustomized: e?.isCustomized,
         type: e?.type,
         subscription: e?.subscription,
         date: format(new Date(e.createdAt), "dd MMM yyyy"),
       });
       return 0;
     });
     return result

   }catch(err){
   }
  };

  const useGetProfile = () => {
    const url = `/user`;

    const { data, mutate } = useSWR(
      isAuthenticated() ? url : null,
      getDownloadHistory
    );

    return {
      userDet: data,
      isLoading: !data,
      mutate,
    };
  };
  
  const getAdminCustomerProfile = async (id) => {
    setLoading(true);
    const response = await getUserDetail(id)
    setLoading(false);
    return {
      userDet: response,
      isLoading
    };
  };

  const setUpdateProfile = async ({
    firstName,
    lastName,
    title,
    zipCode,
    city,
    state,
    country,
    renewAccount,
    newCollection,
  }) => {
    try {
      setLoading(true);

      const payload = {};

      if (!isEmpty(firstName)) payload.firstName = firstName;
      if (!isEmpty(lastName)) payload.lastName = lastName;
      if (!isEmpty(title)) payload.title = title;
      if (!isEmpty(zipCode)) payload.zipCode = zipCode;
      if (!isEmpty(city)) payload.city = city;
      if (!isEmpty(state)) payload.state = state;
      if (!isEmpty(country)) payload.country = country;
      if (!isEmpty(renewAccount)) payload.renewAccount = renewAccount;
      if (!isEmpty(newCollection)) payload.newCollection = newCollection;

      const response = await updateProfile(payload);

      setLoading(false);

      return response;
    } catch (e) {
      setLoading(false);
      return false;
    }
  };

  const setUpdatePassword = async ({ oldPassword, newPassword }) => {
    try {
      setLoading(true);

      const payload = {};

      if (!isEmpty(oldPassword)) payload.oldPassword = oldPassword;
      if (!isEmpty(newPassword)) payload.password = newPassword;

      const response = await updatePassword(payload);

      setLoading(false);

      return response;
    } catch (e) {
      setLoading(false);
      return false;
    }
  };

  const setUpdateBillingAddrs = async ({
    name,
    line1,
    line2,
    zipCode,
    city,
    state,
    country,
  }) => {
    try {
      setLoading(true);

      const payload = {};

      if (!isEmpty(name)) payload.name = name;
      if (!isEmpty(line1)) payload.line1 = line1;
      if (!isEmpty(line2)) payload.line2 = line2;
      if (!isEmpty(zipCode)) payload.zipCode = zipCode;
      if (!isEmpty(city)) payload.city = city;
      if (!isEmpty(state)) payload.state = state;
      if (!isEmpty(country)) payload.country = country;

      const response = await updateBillingAddrs(payload);

      setLoading(false);

      return response;
    } catch (e) {
      setLoading(false);
      return false;
    }
  };

  const useGetBillingAddrs = () => {
    const url = `/user/get-addrs`;

    const { data, error, mutate } = useSWR(url, getBillingAddrs);

    return {
      userBillAddr: error ? {} : data,
      isLoading: !data,
      mutate,
    };
  };

  const useGetCustomerList = () => {
    const [search, onSearch] = useState("");
    const [page, setPage] = useState(1);
    const [isArchived, setArchived] = useState(false);
    const limit = 30;
    const order = "desc";
    const orderBy = "createdAt";

    const { data, mutate } = useSWR(() => {
      if (search === "") {
        return `/user/list?page=${page}&limit=${limit}&order=${order}&orderBy=${orderBy}&isArchived=${isArchived}`;
      }
      if (search !== "") {
        return `/user/list?search=${search}&page=${page}&limit=${limit}&order=${order}&orderBy=${orderBy}&isArchived=${isArchived}`;
      }

      return null;
    }, getCustomerList);

    if (data && data.length === 0 && page > 1) setPage((pre) => pre - 1);

    return {
      customer: data,
      search,
      isLoading: !data,
      onSearch,
      setPage,
      mutate,
      setArchived,
      isArchived,
      page,
    };
  };

  const setUpdateEmail = async ({ newEmail }) => {
    try {
      setLoading(true);

      const payload = {};

      if (!isEmpty(newEmail)) payload.newEmail = newEmail;

      const response = await updateEmail(payload);

      setLoading(false);

      return response;
    } catch (e) {
      setLoading(false);
      return false;
    }
  };

  const setUpdateNewEmail = async ({ hash }) => {
    try {
      setLoading(true);

      const payload = {};

      if (!isEmpty(hash)) payload.hash = hash;
      payload.type = "UPDATE_EMAIL";

      const response = await updateSetNewMail(payload);

      setLoading(false);

      return response;
    } catch (e) {
      setLoading(false);
      return false;
    }
  };

  const setUserInvite = async ({ userEmail }) => {
    try {
      setLoading(true);
      const payload = {
        email: userEmail,
      };

      const response = await userInvite(payload);

      setLoading(false);
      notifySuccess("we have sent you an link");

      return response;
    } catch (e) {
      setLoading(false);
      notifyError(e.message);
      return false;
    }
  };
  const setContactUs = async ({ email, name, message }) => {
    try {
      setLoading(true);

      const payload = {
        email: email,
        name: name,
        message: message,
      };
      if (!email || !name || !message){
        notifyError("All fields are required");
        return false
      }
      const response = await getContactUs(payload);
      setLoading(false);
      notifySuccess("Your message has been sent");
      return response;
    } catch (e) {
      setLoading(false);
      notifyError(e.message);
      return false;
    }
  };

  const setUserArchive = async ({ id }) => {
    try {
      setLoading(true);
      const payload = {
        id,
      };

      const response = await archiveUser(payload);

      setLoading(false);

      return response;
    } catch (e) {
      setLoading(false);
      return false;
    }
  };

  const setUnUserArchive = async ({ id }) => {
    try {
      setLoading(true);
      const payload = {
        id,
      };

      const response = await unArchiveUser(payload);

      setLoading(false);

      return response;
    } catch (e) {
      setLoading(false);
      return false;
    }
  };

  const useGetReportList = () => {
    const [search, onSearch] = useState("");
    const [page, setPage] = useState(1);
    const limit = 30;
    const order = "desc";
    const orderBy = "description";

    const { data, mutate } = useSWR(() => {
      if (search === "") {
        return `/user/reportList?page=${page}&limit=${limit}&order=${order}&orderBy=${orderBy}`;
      }
      if (search !== "") {
        return `/user/reportList?search=${search}&page=${page}&limit=${limit}&order=${order}&orderBy=${orderBy}`;
      }

      return null;
    }, getReportList);

    if (data && data.length === 0 && page > 1) setPage((pre) => pre - 1);

    return {
      report: data,
      search,
      isLoading: !data,
      onSearch,
      setPage,
      mutate,
      page,
    };
  };
  const useGetInvoice = () => {
    const [page, setPage] = useState(1);
    const limit = 30;
    const order = "desc";
    const orderBy = "description";

    const url = `/user/invoice?page=${page}&limit=${limit}&order=${order}&orderBy=${orderBy}`;

    const { data } = useSWR(url, getInvoicetList);

    if (data && data.length === 0 && page > 1) setPage((pre) => pre - 1);

    return {
      invoice: data,
      isLoading: !data,
      setPage,
      page,
    };
  };

  const useInvoiceDetail = ({ userId, paymentIntent }) => {
    const url = `/services/invoice-detail?userId=${userId}&paymentIntent=${paymentIntent}`;
    const { data } = useSWR(url, getInvoiceDetail);    
    return {
      invoiceDetail: data,
      isLoading: !data,
    };
  }

  return {
    isLoading,
    setRegisterUser,
    setSetupProfile,
    UseDownloadHistory,
    useGetProfile,
    setUpdateProfile,
    setUpdatePassword,
    setUpdateBillingAddrs,
    useGetBillingAddrs,
    useGetCustomerList,
    setUpdateEmail,
    setUpdateNewEmail,
    setUserInvite,
    setUserArchive,
    useGetReportList,
    useGetInvoice,
    useInvoiceDetail,
    setUnUserArchive,
    setContactUs,
    getAdminCustomerProfile
  };
}
