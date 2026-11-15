
import { useEffect, useState } from "react";

import { apiFetch } from "../api/client.js";

export function useCourseSearch(query) {
  // Step 1: Trim whitespace from the query.
  const q = query.trim();

  // Step 2: Create state for results and status.
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle");

  // Step 3: Fetch courses whenever the trimmed query changes.
  useEffect(() => {
    // Do not send a request for an empty query.
    if (q === "") return;

    let ignore = false;

    // Mark the search as loading.
    setStatus("loading");

    apiFetch(`/api/courses?${new URLSearchParams({ q })}`)
      .then((courses) => {
        if (!ignore) {
          setResults(courses);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!ignore) {
          setStatus("error");
        }
      });

    // Cleanup: ignore outdated requests.
    return () => {
      ignore = true;
    };
  }, [q]);

  // Step 4: Handle blank queries.
  if (q === "") {
    return { results: [], status: "idle" };
  }

  // Step 5: Return current results and status.
  return { results, status };
}
