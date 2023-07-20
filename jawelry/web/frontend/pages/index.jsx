import { Page, AlphaCard, Pagination, Heading, Text } from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";

import List from "../components/homepage/List";
import Filters from "../components/homepage/Filters";
import { PaginationContainer, Spacer } from "../constants/styles";
import { useAuthenticatedFetch } from "../hooks";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [queryVal, setQueryVal] = useState();
  const fetch = useAuthenticatedFetch();
  useEffect(() => {
    handlePaginatePage();
  }, []);
  const handlePaginatePage = async (pageInfo) => {
    let response;
    setIsLoading(true);
    if (pageInfo) {
      response = await fetch(`/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...pageInfo,
        }),
      });
    } else {
      response = await fetch(`/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first: 10,
        }),
      });
    }

    let res = await response.json();
    if (res.body?.data) {
      setProductsData(res.body.data.products.nodes);
      setPageInfo(res.body.data.products.pageInfo);
    }
    setIsLoading(false);
  };

  return (
    <Page fullWidth>
      <TitleBar title={"Bundler settings"} primaryAction={null} />
      <Spacer spacer="margin-top:20px;" />
      <Text variant="headingLg" as="h1">
        Find a product you want to configure.
      </Text>
      <Spacer spacer="margin-bottom:40px;" />
      <AlphaCard padding={0}>
        <Filters
          handlePaginatePage={handlePaginatePage}
          setQueryVal={setQueryVal}
        />
        <List isLoading={isLoading} productsData={productsData} />
      </AlphaCard>
      <PaginationContainer>
        <Pagination
          hasPrevious={pageInfo?.hasPreviousPage || false}
          onPrevious={() => {
            handlePaginatePage({
              before: pageInfo.startCursor,
              last: 10,
              ...queryVal,
            });
          }}
          hasNext={pageInfo?.hasNextPage || false}
          onNext={() => {
            handlePaginatePage({
              after: pageInfo.endCursor,
              first: 10,
              ...queryVal,
            });
          }}
        />
      </PaginationContainer>
    </Page>
  );
}
