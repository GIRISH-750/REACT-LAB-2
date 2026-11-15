
import { useState } from "react";
import { useCourseSearch } from "./useCourseSearch.js";
import { SearchResults } from "./SearchResults.jsx";

export function CourseSearch() {
  const [query, setQuery] = useState("");

  const { results, status } = useCourseSearch(query);

  return (
    <section>
      <h2>Search the catalogue</h2>

      <label htmlFor="search-query">Search courses</label>

      <input
        id="search-query"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <SearchResults results={results} status={status} />
    </section>
  );
}

