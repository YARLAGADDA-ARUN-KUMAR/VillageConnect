import { useState, useEffect, useCallback } from 'react';

/**
 * useFetch — generic data fetching hook
 * @param {Function} fetcherFn - async function that returns an axios response
 * @param {boolean} [immediate=true] - whether to fetch immediately on mount
 */
const useFetch = (fetcherFn, immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcherFn(...args);
      setData(response.data);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Something went wrong';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetcherFn]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []);

  return { data, loading, error, refetch: execute };
};

export default useFetch;
