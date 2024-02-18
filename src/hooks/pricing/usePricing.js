import useSWR from "swr";
import {
  getPlansList,
  getSubscribe,
  getPurchase,
  getPurchaseStatus,
} from "../../common-apis/pricing/pricing";

export default function usePricing() {
  const useGetPlansList = () => {
    const url = `/services/plan-list`;

    const { data } = useSWR(url, getPlansList);

    const result = {};

    data?.map((e) => {
      result[e.name] = e;
      return 0;
    });

    return {
      plansListData: result,
    };
  };

  const getSubscription = ({ plan, opt }) => {
    const queryParams = new URLSearchParams();

    if (plan) queryParams.append("plan", plan);
    if (opt) queryParams.append("opt", opt);


    const url = `plan/subscribe?` + queryParams.toString();

    const data = getSubscribe(url);

    return data;
  };

  const getPurchaseIcon = ({ id, searchKeyword, isCopy = false }) => {
    const queryParams = new URLSearchParams();

    if (searchKeyword) queryParams.append("searchKeyword", searchKeyword);
    // queryParams.append("isCopy", isCopy);
    const url = `/plan/purchase/${id}?` + queryParams.toString();

    const data = getPurchase(url);

    return data;
  };

  const getProdPurchaseStatus = async ({ session_id }) => {
    const queryParams = new URLSearchParams();
    if (session_id) queryParams.append("session_id", session_id);

    const url = `/plan/success?` + queryParams.toString();

    const data = await getPurchaseStatus(url);

    return data;
  };


  return {
    useGetPlansList,
    getSubscription,
    getPurchaseIcon,
    getProdPurchaseStatus,
  };
}
