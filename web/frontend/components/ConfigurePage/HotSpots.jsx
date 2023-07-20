import {
  Button,
  HorizontalStack,
  LegacyCard,
  Text,
  TextField,
} from "@shopify/polaris";
import React from "react";
import { Spacer } from "../../constants/styles";

function HotSpots({
  deltaPosition,
  configuredImage,
  setDeltaPosition,
  hotspots,
  setHotspots,
}) {
  const addHotspot = () => {
    setHotspots((prevState) => [...prevState, deltaPosition]);
    setDeltaPosition({ state: false });
  };
  return (
    <LegacyCard sectioned>
      <HorizontalStack blockAlign="center" align="space-between" wrap={false}>
        <Text variant="headingMd" as="h2">
          Add Hotspot
        </Text>
        {!deltaPosition.state && (
          <Button
            disabled={!configuredImage}
            onClick={() => setDeltaPosition({ state: true })}
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
            value={
              deltaPosition?.position
                ?.split("translate(")[1]
                .split(")")[0]
                .split(", ")[0]
            }
            readOnly={true}
            helpText="Horizontal"
            autoComplete="off"
          />
          <Spacer spacer="margin-top:20px;"></Spacer>
          <TextField
            label="Y position"
            type="text"
            value={
              deltaPosition?.position
                ?.split("translate(")[1]
                .split(")")[0]
                .split(", ")[1]
            }
            readOnly={true}
            helpText="Vertical"
            autoComplete="off"
          />
          <Spacer spacer="margin-top:20px;"></Spacer>
          <TextField
            label="Rotation"
            type="text"
            value={deltaPosition?.position?.split('rotate(')[1]?.replace(')','')}
            readOnly={true}
            autoComplete="off"
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
  );
}

export default HotSpots;
