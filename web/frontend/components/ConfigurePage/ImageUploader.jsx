import {
  Button,
  DropZone,
  HorizontalStack,
  LegacyCard,
  Text,
} from "@shopify/polaris";
import React from "react";

function ImageUploader({ configuredImage, handleUploadImage }) {
  return (
    <LegacyCard sectioned>
      <HorizontalStack blockAlign="center" align="space-between" wrap={false}>
        <Text variant="headingMd" as="h2">
          {configuredImage ? "Edit image" : "Please upload image"}
        </Text>
        <DropZone
          accept="image/jpeg, image/png, image/gif"
          allowMultiple={false}
          outline={false}
          onDrop={handleUploadImage}
        >
          <Button primary>{configuredImage ? "Edit" : "Add"}</Button>
        </DropZone>
      </HorizontalStack>
    </LegacyCard>
  );
}

export default ImageUploader;
