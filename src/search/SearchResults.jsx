
export function SearchResults({ results, status }) {
  // Nothing to show yet.
  if (status === "idle") {
    return null;
  }

  // Search is in progress.
  if (status === "loading") {
    return <p>Searching…</p>;
  }

  // Search failed.
  if (status === "error") {
    return <p>Search failed.</p>;
  }

  // Search completed, but no courses were found.
  if (status === "ready" && results.length === 0) {
    return <p>No courses match.</p>;
  }

  // Display matching courses.
  return (
    <ul>
      {results.map((course) => (
        <li key={course.id}>
          {course.code} · {course.title}
        </li>
      ))}
    </ul>
  );
}
