import { Badge, Page } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CharmLocation from "../components/ConfigurePage/CharmLocation";
import HotSpots from "../components/ConfigurePage/HotSpots";
import ImageContainer from "../components/ConfigurePage/ImageContainer";
import ImageUploader from "../components/ConfigurePage/ImageUploader";
import VariantPicker from "../components/ConfigurePage/VariantPicker";
import HotSpotsList from "../components/ConfigurePage/HotSpotsList";

import { useUploadImage } from "../constants/hooks/useUploadImage";

import { ConfiguredContainer, ConfiguredElement } from "../constants/styles";
import { useAuthenticatedFetch } from "../hooks";

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
  

  useEffect(() => {
    if (!selectedProduct.handle) {
      navigate(`/`, { replace: true, reloadDocument: true });
    } else {
      setSelectedVariant(selectedProduct?.variants[0]?.title);
    }
  }, [selectedProduct]);

  const saveChanges = async () => {
    
    await fetch(`/api/products/7308381356225/variants.json`);
  };
  return (
    <Page
      backAction={{ content: "homepage", url: "/" }}
      title={selectedProduct.title}
      titleMetadata={<Badge>No Configuration</Badge>}
      subtitle={selectedProduct.handle}
      compactTitle
      primaryAction={{
        content: "Save",
        onAction: () => saveChanges(),
      }}
      secondaryActions={[
        {
          content: "Duplicate",
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Duplicate action"),
        },
        {
          content: "View on your store",
          onAction: () => alert("View on your store action"),
        },
      ]}
      actionGroups={[
        {
          title: "Promote",
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
      </ConfiguredContainer>
    </Page>
  );
}

export default ConfigurePage;
