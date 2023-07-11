import { Page, AlphaCard, Pagination } from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";

import List from "../components/homepage/List";
import Filters from "../components/homepage/Filters";
import { PaginationContainer } from "../constants/styles";
import { useAuthenticatedFetch } from "../hooks";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [filteredProductsData, setFilteredProductsData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
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

  const app = useAppBridge();
  const fetch = useAuthenticatedFetch(app);

  async function getOrdersList() {
    const orderData = await fetch("/collections").then((res) =>
      console.log(res.json())
    );
  }

  useEffect(() => {
    getOrdersList();
  }, []);
  return (
    <Page fullWidth>
      <TitleBar title={"Bundler settings"} primaryAction={null} />
      <AlphaCard padding={0}>
        <Filters
          setIsLoading={setIsLoading}
          setProductsData={setProductsData}
          productsData={productsData}
          handlePaginatePage={handlePaginatePage}
          setFilteredProductsData={setFilteredProductsData}
        />
        <List
          isLoading={isLoading}
          productsData={
            (filteredProductsData.length && filteredProductsData) ||
            productsData
          }
        />
      </AlphaCard>
      <PaginationContainer>
        <Pagination
          hasPrevious={pageInfo?.previousPageUrl || false}
          onPrevious={() => {
            handlePaginatePage(pageInfo.previousPageUrl);
          }}
          hasNext={pageInfo?.nextPageUrl || false}
          onNext={() => {
            handlePaginatePage(pageInfo.nextPageUrl);
          }}
        />
      </PaginationContainer>
    </Page>
  );
}
