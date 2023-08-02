import {
  Button,
  HorizontalStack,
  LegacyCard,
  Text,
  TextField,
} from "@shopify/polaris";
import React from "react";
import { Spacer } from "../../constants/styles";
import { getHotspotsFunctions } from "../../functions/hotSpots";

function HotSpots({
  deltaPosition,
  configuredImage,
  setDeltaPosition,
  hotspots,
  setHotspots,
}) {
  const {
    handleSetPositionByDefault,
    handleChangePosition,
    handleCancel,
    addHotspot,
  } = getHotspotsFunctions(
    deltaPosition,
    setHotspots,
    setDeltaPosition,
    hotspots
  );
  return (
    <LegacyCard sectioned>
      <HorizontalStack blockAlign="center" align="space-between" wrap={false}>
        <Text variant="headingMd" as="h2">
          Add Hotspot
        </Text>
        {!deltaPosition.state && (
          <Button
            disabled={!configuredImage}
            onClick={() => handleSetPositionByDefault(true)}
            primary
          >
            Add
          </Button>
        )}
      </HorizontalStack>
      {deltaPosition.state && (
        <>
          <Spacer spacer="margin-top:20px;"></Spacer>
          Hotspot ID: {deltaPosition.index + 1 || hotspots.length + 1}
          <Spacer spacer="margin-top:20px;"></Spacer>
          <TextField
            label="X position"
            type="number"
            value={deltaPosition?.x}
            onChange={(e) => handleChangePosition({ x: +e })}
            helpText="Horizontal"
            prefix="x"
            autoComplete="off"
          />
          <Spacer spacer="margin-top:20px;"></Spacer>
          <TextField
            label="Y position"
            type="number"
            value={deltaPosition?.y}
            onChange={(e) => handleChangePosition({ y: +e })}
            helpText="Vertical"
            prefix="y"
            autoComplete="off"
          />
          <Spacer spacer="margin-top:20px;"></Spacer>
          <TextField
            label="Rotation"
            type="number"
            value={deltaPosition?.rotate}
            onChange={(e) => handleChangePosition({ rotate: +e })}
            autoComplete="off"
            prefix="deg"
          />
          <Spacer spacer="margin-top:20px;"></Spacer>
          <HorizontalStack align="end" gap="2">
            <Button onClick={() => handleCancel()}>Cancel</Button>
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

