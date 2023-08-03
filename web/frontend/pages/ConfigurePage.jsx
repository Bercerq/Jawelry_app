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
import { configureActions } from "../functions/configurePage";

function ConfigurePage() {
  const { selectedProduct } = useSelector((state) => state.productReducer);
  const navigate = useNavigate();

  const [selectedVariant, setSelectedVariant] = useState("");
  const [configuredImage, setConfiguredImage] = useState();
  const [charmLocation, setCharmLocation] = useState({
    state: false,
    value: "charm_font_location",
  });
  const [deltaPosition, setDeltaPosition] = useState({
    state: false,
    x: 0,
    y: 0,
    rotate: 0
  });
  const [hotspots, setHotspots] = useState([]);
  const handleUploadImage = useUploadImage(setConfiguredImage);
  const fetch = useAuthenticatedFetch();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState();
  const [reqLoading, setReqLoading] = useState(false);

  const showActiveToast = useCallback(
    () => setShowToast((showToast) => !showToast),
    []
  );
  const toastMarkup = showToast ? (
    <Toast content={toastMessage} onDismiss={showActiveToast} />
  ) : null;

  useEffect(() => {
    if (!selectedProduct.handle) {
      navigate(`/`, { replace: true, reloadDocument: true });
    } else {
      setSelectedVariant(selectedProduct?.variants.nodes[0]?.title);
    }
  }, [selectedProduct]);
  const { goBackClick, saveChanges, applyConfigure, coppyConfigure } =
    configureActions(
      selectedProduct,
      selectedVariant,
      configuredImage,
      fetch,
      hotspots,
      charmLocation,
      showActiveToast,
      setHotspots,
      setCharmLocation,
      navigate,
      setReqLoading,
      setToastMessage
    );

  useEffect(async () => {
    let metafield = selectedProduct.variants.nodes.find(({ title }) => {
      return title === selectedVariant;
    })?.metafield?.value;

    if (
      selectedProduct.tags.includes("image-visualiser-configured") &&
      metafield
    ) {
      let metafieldObj = JSON.parse(metafield);
      setReqLoading(true);

      if (metafieldObj.charmLocation) {
        setCharmLocation({ value: metafieldObj.charmLocation, state: false });
      }
      if (metafieldObj.configuredImage) {
        setConfiguredImage(metafieldObj.configuredImage);
      }
      if (metafieldObj.hotspots.length) {
        setHotspots(metafieldObj.hotspots);
      }

      setReqLoading(false);
    } else {
      setHotspots([]);
      setConfiguredImage();
    }
  }, [selectedVariant]);

  return (
    <Page
      backAction={{ content: "homepage", onAction: () => goBackClick() }}
      title={selectedProduct.title}
      titleMetadata={
        selectedProduct.tags.includes("image-visualiser-configured") ? (
          <Badge status="success">Configured</Badge>
        ) : (
          <Badge>No Configuration</Badge>
        )
      }
      subtitle={selectedProduct.handle}
      compactTitle
      primaryAction={{
        content: "Save",
        onAction: () => saveChanges(),
        disabled: !hotspots.length || !charmLocation.value,
        loading: reqLoading,
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
        <ConfiguredElement container_width="496px" container_height="100%">
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
        <ConfiguredElement container_width="45%" container_height="100%" mobile="100%">
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
