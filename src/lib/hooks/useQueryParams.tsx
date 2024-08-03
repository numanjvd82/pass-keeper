import { useSearchParams } from "react-router-dom";

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParams = (keys: string[]) => {
    const params: {
      [key: string]: string;
    } = {};
    keys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        params[key as string] = value;
      }
    });
    return params;
  };

  const setParams = (params: { [key: string]: string }) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    setSearchParams(newParams);
  };

  const deleteParams = (keys: string[]) => {
    const newParams = new URLSearchParams(searchParams);
    keys.forEach((key) => {
      newParams.delete(key);
    });
    setSearchParams(newParams);
  };

  return { getParams, setParams, deleteParams };
};

export default useQueryParams;
