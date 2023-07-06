import { Page, AlphaCard, Pagination } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";

import List from "../components/homepage/List";
import Filters from "../components/homepage/Filters";
import { PaginationContainer } from "../constants/styles";
import { useAuthenticatedFetch } from "../hooks";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const fetch = useAuthenticatedFetch();

  useEffect(() => {
    handlePaginatePage();
  }, []);

  const handlePaginatePage = async (pageInfo) => {
    let response;

    setIsLoading(true);

    if (pageInfo) {
      response = await fetch(`/api/products?` + pageInfo);
    } else {
      response = await fetch(`/api/products`);
    }

    setIsLoading(false);
    let res = await response.json();
    setProductsData(res.data);
    setPageInfo(res.pageInfo);
  };
  return (
    <Page fullWidth>
      <TitleBar title={"Bundler settings"} primaryAction={null} />
      <AlphaCard padding={0}>
        <Filters />
        <List isLoading={isLoading} productsData={productsData} />
      </AlphaCard>
      <PaginationContainer>
        <Pagination
          hasPrevious={pageInfo.previousPageUrl}
          onPrevious={() => {
            handlePaginatePage(pageInfo.previousPageUrl);
          }}
          hasNext={pageInfo.nextPageUrl}
          onNext={() => {
            handlePaginatePage(pageInfo.nextPageUrl);
          }}
        />
      </PaginationContainer>
    </Page>
  );
}
