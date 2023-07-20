import { HorizontalStack, Icon, LegacyCard, Text } from "@shopify/polaris";
import React from "react";
import { editHotspot, handleDeleteHotSpot } from "../../functions/configurePage";
import { DeleteHotspot, HotSpotLabel, Spacer } from "../../constants/styles";
import { CancelMajor } from '@shopify/polaris-icons';

function HotSpotsList({
  deltaPosition,
  hotspots,
  setDeltaPosition,
  setHotspots,
}) {
  return (
    <LegacyCard sectioned>
      <Text variant="headingMd" as="h2">
        Hotspots
      </Text>
      <Spacer spacer="margin-top:20px;" />
      {hotspots.length ? (
        <HorizontalStack wrap gap="2">
          {hotspots.map((spotsParams, index) => (
            <HotSpotLabel key={index}>
              <span
                onClick={() =>
                  editHotspot(
                    deltaPosition,
                    index,
                    hotspots,
                    spotsParams,
                    setDeltaPosition,
                    setHotspots
                  )
                }
              >
                Hotspot {index + 1}
              </span>
              <DeleteHotspot
                onClick={() => handleDeleteHotSpot(hotspots, setHotspots, index)}
              >
                <Icon source={CancelMajor} color="base" />
              </DeleteHotspot>
            </HotSpotLabel>
          ))}
        </HorizontalStack>
      ) : (
        <Text>No hotspots added</Text>
      )}
    </LegacyCard>
  );
}

export default HotSpotsList;
