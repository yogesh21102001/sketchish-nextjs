import useSWR from "swr";
import { getPlansList } from "../../common-apis/subscription-plans/subscriptionplans";

export function useSubscriptionPlans() {
  const { data, mutate } = useSWR("/services/plan-list", getPlansList);
  return {
    plansList: data,
    mutate,
    isLoading: !data,
  };
}
