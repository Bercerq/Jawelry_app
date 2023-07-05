import { IndexTable } from "@shopify/polaris";
import React from "react";
import { headings, resourceName } from "../../redux/constants/ListConstants";
import ListRows from "./ListRows";

function List({
  isLoading,
  productsData,
}) {

  return (
    <IndexTable
      loading={isLoading}
      resourceName={resourceName}
      itemCount={productsData.length}
      headings={headings}
      selectable={false}
      lastColumnSticky
      hasZebraStriping
    >
      <ListRows 
      productsData={productsData} 
        />
    </IndexTable>
  );
}

export default List;
