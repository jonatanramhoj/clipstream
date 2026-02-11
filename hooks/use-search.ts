import { useState } from "react";
import { useDebounce } from "./use-debounce";

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const { debounce } = useDebounce();

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  }, 600);

  return {
    searchQuery,
    handleSearch,
  };
}
