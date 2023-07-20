import {
  TextField,
  IndexFilters,
  useSetIndexFiltersMode,
} from "@shopify/polaris";

import { useEffect, useState } from "react";
import React from "react";
import {
  disambiguateLabel,
  handleUseFilters,
  isEmpty,
} from "../../functions/filtersList";
import { itemStrings, sortOptions } from "../../constants/list";

function Filters({ handlePaginatePage, setQueryVal }) {
  const tabs = itemStrings.map((item, index) => ({
    content: item,
    index,
    onAction: () => {},
    id: `${item}-${index}`,
    isLocked: index === 0,
  }));
  const [selected, setSelected] = useState(0);

  const { mode, setMode } = useSetIndexFiltersMode();

  const [taggedWith, setTaggedWith] = useState("");
  const [queryValue, setQueryValue] = useState("");
  const [sortSelected, setSortSelected] = useState(["title asc"]);
  const {
    handleTaggedWithRemove,
    handleFiltersQueryChange,
    handleFiltersClearAll,
  } = handleUseFilters(setTaggedWith, setQueryValue);

  const onHandleCancel = () => {
    handlePaginatePage({
      first: 10,
    });
    setQueryValue("");
  };
  useEffect(() => {
    if (queryValue) {
      handlePaginatePage({ query: `query:title:${queryValue}`, first: 10 });
      setQueryVal({ query: `query:title:${queryValue}` });
    }
  }, [queryValue]);

  const handleSort = (e) => {
    setSortSelected(e);
    handlePaginatePage({
      sortKey: {
        type: e[0],
        reverse: e[0].includes("asc") ? false : true,
      },
      first: 10,
    });
    setQueryVal({
      sortKey: {
        type: e[0],
        reverse: e[0].includes("asc") ? false : true,
      },
    });
  };
  const handleSelect = (e) => {
    setSelected(e);
    if (e === 1) {
      handlePaginatePage({
        query: `tag:image-visualiser-configured`,
        first: 10,
      });
      setQueryVal({
        query: `tag:image-visualiser-configured`,
      });
    } else if (e === 0) {
      handlePaginatePage({
        first: 10,
      });
      setQueryVal();
    }
  };
  const handleTagChange = (e) => {
    setTaggedWith(e);
    if (e) {
      handlePaginatePage({
        query: `tag:${taggedWith}`,
        first: 10,
      });
      setQueryVal({
        query: `tag:${taggedWith}`,
      });
    } else {
      handlePaginatePage({
        first: 10,
      });
      setQueryVal();
    }
  };

  const filters = [
    {
      key: "taggedWith",
      label: "Tagged with",
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={(e) => handleTagChange(e)}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = [];
  if (!isEmpty(taggedWith)) {
    const key = "taggedWith";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, taggedWith),
      onRemove: handleTaggedWithRemove,
    });
  }

  return (
    <IndexFilters
      sortOptions={sortOptions}
      sortSelected={sortSelected}
      onSort={(e) => handleSort(e)}
      queryValue={queryValue}
      queryPlaceholder="Searching in all"
      onQueryChange={handleFiltersQueryChange}
      onQueryClear={() => setQueryValue("")}
      cancelAction={{
        onAction: onHandleCancel,
        disabled: false,
        loading: false,
      }}
      tabs={tabs}
      selected={selected}
      canCreateNewView={false}
      onSelect={(e) => handleSelect(e)}
      filters={filters}
      appliedFilters={appliedFilters}
      onClearAll={handleFiltersClearAll}
      mode={mode}
      setMode={setMode}
    />
  );
}

export default Filters;
