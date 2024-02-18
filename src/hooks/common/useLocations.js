import useSWR from "swr";
import {
  getCountries,
  getStates,
  getCities,
} from "../../common-apis/publicApis/locations";

export default function useLocations() {
  const useGetCountries = ({ search }) => {
    const queryParams = new URLSearchParams();

    if (search) queryParams.append("word", search);

    const url = `/services/DDlist-countries?` + queryParams.toString();

    const { data } = useSWR(url, getCountries);
    // eslint-disable-next-line no-unused-expressions
    data
      ? (data.name = { value: data.name, label: data.name, key: data._id })
      : null;

    const result = [];
    data?.map((e) => {
      result.push({
        value: e.name,
        label: e.name,
        key: e._id,
      });
      return 0;
    });

    return {
      countriesData: result,
      isLoading: !result,
    };
  };

  const getLocStates = async ({ search, countryId }) => {
    const queryParams = new URLSearchParams();
    const result = [];

    if (search) queryParams.append("word", search);
    if (countryId) queryParams.append("id", countryId);

    if (countryId) {
      const url = `/services/DDlist-states?` + queryParams.toString();

      const data = await getStates(url);
      // eslint-disable-next-line no-unused-expressions
      data
        ? (data.name = { value: data.name, label: data.name, key: data._id })
        : null;

      data?.map((e) => {
        result.push({
          value: e.name,
          label: e.name,
          key: e._id,
        });
        return 0;
      });
    }

    return result;
  };

  const getLocCities = async ({ search, stateId }) => {
    const queryParams = new URLSearchParams();
    const result = [];

    if (search) queryParams.append("word", search);
    if (stateId) queryParams.append("id", stateId);

    if (stateId) {
      const url = `/services/DDlist-cities?` + queryParams.toString();

      const data = await getCities(url);
      // eslint-disable-next-line no-unused-expressions
      data
        ? (data.name = { value: data.name, label: data.name, key: data._id })
        : null;

      data?.map((e) => {
        result.push({
          value: e.name,
          label: e.name,
          key: e._id,
        });
        return 0;
      });
    }
    return result;
  };

  return {
    useGetCountries,
    getLocStates,
    getLocCities,
  };
}
