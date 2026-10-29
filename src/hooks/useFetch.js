import { useCallback, useEffect, useState } from "react";

/**
 * Runs an async function whenever `deps` change and reports loading / error / data.
 * The function receives an AbortSignal so it can cancel its request on unmount.
 */
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetcher(controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((caught) => {
        if (!controller.signal.aborted) {
          setError(caught);
          setLoading(false);
        }
      });

    return () => controller.abort();
    // The fetcher is recreated on every render on purpose; `deps` is the real trigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  const retry = useCallback(() => setAttempt((current) => current + 1), []);

  return { data, loading, error, retry };
}
