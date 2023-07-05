import { DropZone, LegacyCard } from "@shopify/polaris";
import React from "react";
import {
  ConfiguredImage,
  ConfiguredImageContainer,
  ConfiguredNoImage,
  DragableElement,
  DragableElementDisabled,
} from "../../constants/styles";

import Draggable from "react-draggable";

function ImageContainer({
  configuredImage,
  handleUploadImage,
  deltaPosition,
  setDeltaPosition,
  hotspots,
}) {
  const onDrag = (e, ui) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
      state: true,
    });
  };

  return (
    <LegacyCard title="Selected Image" sectioned>
      {configuredImage ? (
        <ConfiguredImageContainer>
          <ConfiguredImage
            src={
              ["image/gif", "image/jpeg", "image/png"].includes(
                configuredImage.type
              )
                ? window.URL.createObjectURL(configuredImage)
                : NoteMinor
            }
          />
          {deltaPosition.state ? (
            <Draggable
              defaultPosition={{ x: 0, y: -200 }}
              bounds="parent"
              onDrag={onDrag}
            >
              <DragableElement>Drag</DragableElement>
            </Draggable>
          ) : null}
          {hotspots?.map((spots, index) => (
            <Draggable
              defaultPosition={{ x: spots.x, y: spots.y }}
              bounds="parent"
              onStart={() => false}
            >
              <DragableElementDisabled>{index + 1}</DragableElementDisabled>
            </Draggable>
          ))}
        </ConfiguredImageContainer>
      ) : (
        <DropZone
          accept="image/svg, image/jpeg, image/png"
          allowMultiple={false}
          outline={false}
          onDrop={handleUploadImage}
        >
          <ConfiguredNoImage />
        </DropZone>
      )}
    </LegacyCard>
  );
}

export default ImageContainer;
