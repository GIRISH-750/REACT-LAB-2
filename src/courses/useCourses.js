// The hook: fetch and logic for the Courses page.
// useCourses() → { courses, status, error, addCourse }
import { useEffect, useState } from "react";
import { apiFetch } from "../api/client.js";

function byCode(a, b) {
  return a.code.localeCompare(b.code);
}

export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  // Load the list once, when the page first appears.
  useEffect(() => {
    let ignore = false;
    apiFetch("/api/courses")
      .then((data) => {
        if (!ignore) {
          setCourses(data);
          setStatus("ready");
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message);
          setStatus("error");
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

  // POST the course, then insert the 201 body in code order (no reload).
  // Errors are not caught here: the form shows them.
  async function addCourse(courseRequest) {
    const created = await apiFetch("/api/courses", { method: "POST", body: courseRequest });
    setCourses((prev) => [...prev, created].sort(byCode));
    return created;
  }

  return { courses, status, error, addCourse };
}
