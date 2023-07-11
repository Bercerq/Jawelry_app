import { Badge, Page, Toast } from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CharmLocation from "../components/ConfigurePage/CharmLocation";
import HotSpots from "../components/ConfigurePage/HotSpots";
import ImageContainer from "../components/ConfigurePage/ImageContainer";
import ImageUploader from "../components/ConfigurePage/ImageUploader";
import VariantPicker from "../components/ConfigurePage/VariantPicker";
import HotSpotsList from "../components/ConfigurePage/HotSpotsList";

import { ConfiguredContainer, ConfiguredElement } from "../constants/styles";
import { useAuthenticatedFetch } from "../hooks";
import { useUploadImage } from "../hooks/useUploadImage";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_ID } from "../constants/graphql";

function ConfigurePage() {
  const { selectedProduct } = useSelector((state) => state.productReducer);
  const navigate = useNavigate();

  const [selectedVariant, setSelectedVariant] = useState("");
  const [configuredImage, setConfiguredImage] = useState();
  const [charmLocation, setCharmLocation] = useState({
    state: false,
    value: "",
  });
  const [deltaPosition, setDeltaPosition] = useState({ state: false });
  const [hotspots, setHotspots] = useState([]);

  const handleUploadImage = useUploadImage(setConfiguredImage);
  const fetch = useAuthenticatedFetch();

  const [showToast, setShowToast] = useState(false);

  const showActiveToast = useCallback(
    () => setShowToast((showToast) => !showToast),
    []
  );

  const toastMarkup = showToast ? (
    <Toast content="The configuration is saved" onDismiss={showActiveToast} />
  ) : null;

  useEffect(() => {
    if (!selectedProduct.handle) {
      navigate(`/`, { replace: true, reloadDocument: true });
    } else {
      setSelectedVariant(selectedProduct?.variants[0]?.title);
    }
  }, [selectedProduct]);
  let queryData = useQuery(GET_PRODUCTS_BY_ID);
  const { error, data, loading } = queryData;
  console.log(data);
  const saveChanges = async () => {
    alert(
      JSON.stringify({
        // selectedProduct,
        charmLocation: charmLocation.value,
        hotspots,
      })
    );
    // await fetch(`/admin/api/2023-07/graphql.json`);
  };
  const coppyConfigure = () => {
    let configureObj = {
      hotspots,
      charmLocation,
    };
    showActiveToast();
    localStorage.setItem("jawelry_config", JSON.stringify(configureObj));
  };
  const applyConfigure = () => {
    let lsConfigure = JSON.parse(localStorage.getItem("jawelry_config"));
    showActiveToast();
    if (lsConfigure?.hotspots) {
      setHotspots(lsConfigure.hotspots);
    }
    if (lsConfigure?.charmLocation) {
      setCharmLocation(lsConfigure.charmLocation);
    }
  };
  const goBackClick = () => {
    navigate(`/`, { replace: true, reloadDocument: true });
  };
  return (
    <Page
      backAction={{ content: "homepage", onAction: () => goBackClick() }}
      title={selectedProduct.title}
      titleMetadata={<Badge>No Configuration</Badge>}
      subtitle={selectedProduct.handle}
      compactTitle
      primaryAction={{
        content: "Save",
        onAction: () => saveChanges(),
        disabled: !hotspots.length,
      }}
      secondaryActions={[
        {
          content: "Apply saved configuration",
          accessibilityLabel: "Secondary action label",
          onAction: () => applyConfigure(),
          disabled: !localStorage.getItem("jawelry_config") || !configuredImage,
        },
        {
          content: "Copy Configuration",
          onAction: () => coppyConfigure(),
          disabled: !hotspots.length,
        },
      ]}
      actionGroups={[
        {
          title: "More actions",
          actions: [
            {
              content: "Share on Facebook",
              accessibilityLabel: "Individual action label",
              onAction: () => alert("Share on Facebook action"),
            },
          ],
        },
      ]}
    >
      <ConfiguredContainer>
        {/* Left image container  */}
        <ConfiguredElement width="65%">
          <ImageContainer
            configuredImage={configuredImage}
            handleUploadImage={handleUploadImage}
            deltaPosition={deltaPosition}
            setDeltaPosition={setDeltaPosition}
            hotspots={hotspots}
            setHotspots={setHotspots}
          />
        </ConfiguredElement>

        {/* Right configure options  */}
        <ConfiguredElement width="35%">
          {/* Variant Picker */}
          <VariantPicker
            selectedProduct={selectedProduct}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          />
          {/* Image uploader  */}
          <ImageUploader
            configuredImage={configuredImage}
            handleUploadImage={handleUploadImage}
          />
          {/* Charm/Font Location */}
          <CharmLocation
            charmLocation={charmLocation}
            setCharmLocation={setCharmLocation}
          />
          {/* Hotspots */}
          <HotSpots
            deltaPosition={deltaPosition}
            configuredImage={configuredImage}
            setDeltaPosition={setDeltaPosition}
            hotspots={hotspots}
            setHotspots={setHotspots}
          />
          {/* Hotspots list */}
          <HotSpotsList
            deltaPosition={deltaPosition}
            hotspots={hotspots}
            setDeltaPosition={setDeltaPosition}
            setHotspots={setHotspots}
          />
        </ConfiguredElement>
        {toastMarkup}
      </ConfiguredContainer>
    </Page>
  );
}

export default ConfigurePage;
