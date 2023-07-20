import { IndexTable } from "@shopify/polaris";
import React from "react";
import { headings, resourceName } from "../../constants/list";
import ListRows from "./ListRows";

function List({ isLoading, productsData }) {
  return (
    <IndexTable
      loading={isLoading}
      resourceName={resourceName}
      itemCount={productsData?.length || 0}
      headings={headings}
      selectable={false}
      lastColumnSticky
      hasZebraStriping
    >
      <ListRows productsData={productsData} />
    </IndexTable>
  );
}

export default List;
