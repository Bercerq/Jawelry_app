import {
  Button,
  HorizontalStack,
  LegacyCard,
  Text,
  TextField,
} from "@shopify/polaris";
import React from "react";
import { Spacer } from "../../constants/styles";

function CharmLocation({ charmLocation, setCharmLocation }) {
  return (
    <LegacyCard sectioned>
      <HorizontalStack blockAlign="center" align="space-between" wrap={false}>
        <Text variant="headingMd" as="h2">
          {charmLocation.value
            ? "Edit Charm/Font Location"
            : "Charm/Font Location"}
        </Text>
        {!charmLocation.state && (
          <Button
            onClick={() =>
              setCharmLocation((prevState) => ({
                ...prevState,
                state: true,
              }))
            }
            primary
          >
            {charmLocation.value ? "Edit" : "Add"}
          </Button>
        )}
      </HorizontalStack>
      {charmLocation.state && (
        <>
          <Spacer spacer="margin-top:20px;" />
          <TextField
            label="Enter location"
            placeholder="Default: charm_font_location"
            value={charmLocation.value}
            onChange={(val) =>
              setCharmLocation((prevState) => ({
                ...prevState,
                value: val,
              }))
            }
            autoComplete="off"
          />
          <Spacer spacer="margin-bottom:20px;" />

          <HorizontalStack align="end" gap="2">
            <Button
              onClick={() => setCharmLocation({ state: false, value: "" })}
            >
              {charmLocation.value ? "Clear" : "Cancel"}
            </Button>
            <Button
              onClick={() =>
                setCharmLocation((prevState) => ({
                  ...prevState,
                  state: false,
                }))
              }
              primary
            >
              Save
            </Button>
          </HorizontalStack>
        </>
      )}
    </LegacyCard>
  );
}

export default CharmLocation;
