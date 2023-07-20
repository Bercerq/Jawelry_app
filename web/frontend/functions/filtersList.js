import { useCallback } from "react";

export function handleUseFilters(
  setTaggedWith,
  setQueryValue
) {


  const handleFiltersQueryChange = useCallback(
    (value) => setQueryValue(value),
    []
  );


  const handleTaggedWithRemove = useCallback(() => setTaggedWith(""), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);
  const handleFiltersClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [
    handleQueryValueRemove,
    handleTaggedWithRemove,
  ]);
  return {
    handleTaggedWithRemove,
    handleFiltersQueryChange,
    handleFiltersClearAll,
  };
}
export function disambiguateLabel(key, value) {
  switch (key) {
    case "moneySpent":
      return `Money spent is between $${value[0]} and $${value[1]}`;
    case "taggedWith":
      return `Tagged with ${value}`;
    case "accountStatus":
      return value.map((val) => `Customer ${val}`).join(", ");
    default:
      return value;
  }
}

export function isEmpty(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else {
    return value === "" || value == null;
  }
}
