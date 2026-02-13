import { useEffect, useState } from "react";

const useFetch = (fetchFunction, autoFetch = true) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const results = await fetchFunction();
      setData(results);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("An error occured"));
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setData([]);
    setLoading(false);
    setError(null);
  };
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, reset, refetch: fetchData };
};

export default useFetch;
