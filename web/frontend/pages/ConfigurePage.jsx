import {
  Badge,
  Button,
  HorizontalStack,
  LegacyCard,
  Page,
  Text,
  TextField,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CharmLocation from "../components/ConfigurePage/CharmLocation";
import ImageContainer from "../components/ConfigurePage/ImageContainer";
import ImageUploader from "../components/ConfigurePage/ImageUploader";
import VariantPicker from "../components/ConfigurePage/VariantPicker";

import { useUploadImage } from "../constants/hooks/useUploadImage";

import {
  ConfiguredContainer,
  ConfiguredElement,
  Spacer,
} from "../constants/styles";

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
  // const [metafieldObj, setMetafieldObj] = useState({});
  useEffect(() => {
    if (!selectedProduct.handle) {
      navigate(`/`, { replace: true, reloadDocument: true });
    } else {
      setSelectedVariant(selectedProduct?.variants[0]?.title);
    }
  }, [selectedProduct]);

  const addHotspot = () => {
    setHotspots((prevState) => [
      ...prevState,
      { x: deltaPosition.x, y: deltaPosition.y },
    ]);
    setDeltaPosition({ state: false });
  };

  return (
    <Page
      backAction={{ content: "homepage", url: "/" }}
      title={selectedProduct.title}
      titleMetadata={<Badge>No Configuration</Badge>}
      subtitle={selectedProduct.handle}
      compactTitle
      primaryAction={{ content: "Save", disabled: true }}
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

          <LegacyCard sectioned>
            <HorizontalStack
              blockAlign="center"
              align="space-between"
              wrap={false}
            >
              <Text variant="headingMd" as="h2">
                Add Hotspot
              </Text>
              {!deltaPosition.state && (
                <Button
                disabled={!configuredImage}
                  onClick={() =>
                    setDeltaPosition({ x: 0, y: -200, state: true })
                  }
                  primary
                >
                  Add
                </Button>
              )}
            </HorizontalStack>
            {deltaPosition.state && (
              <>
                <Spacer spacer="margin-top:20px;"></Spacer>
                Hotspot ID: {hotspots.length ? hotspots.length + 1 : "1"}
                <Spacer spacer="margin-top:20px;"></Spacer>
                <TextField
                  label="X position"
                  type="text"
                  value={deltaPosition.x}
                  readOnly={true}
                  helpText="Horizontal"
                  autoComplete={false}
                />
                <Spacer spacer="margin-top:20px;"></Spacer>
                <TextField
                  label="Y position"
                  type="text"
                  value={deltaPosition.y}
                  readOnly={true}
                  helpText="Vertical"
                  autoComplete={false}
                />
                <Spacer spacer="margin-top:20px;"></Spacer>
                <TextField
                  label="Rotation"
                  type="text"
                  value="0"
                  readOnly={true}
                  autoComplete={false}
                />
                <Spacer spacer="margin-top:20px;"></Spacer>
                <HorizontalStack align="end" gap="2">
                  <Button onClick={() => setDeltaPosition({ state: false })}>
                    Cancel
                  </Button>
                  <Button onClick={() => addHotspot()} primary>
                    Save
                  </Button>
                </HorizontalStack>
              </>
            )}
          </LegacyCard>

          <LegacyCard sectioned>
            <Text variant="headingMd" as="h2">
              Hotspots
            </Text>
            <Spacer spacer="margin-top:20px;" />

            <Text>No hotspots added</Text>
          </LegacyCard>
        </ConfiguredElement>
      </ConfiguredContainer>
    </Page>
  );
}

export default ConfigurePage;
