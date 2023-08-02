import { DropZone, LegacyCard } from "@shopify/polaris";
import React, { useRef } from "react";
import Moveable from "react-moveable";
import {
  ConfiguredImage,
  ConfiguredImageContainer,
  ConfiguredNoImage,
  DragableActiveContainer,
  DragableDisabledContainer,
  DragableElement,
  DragableElementDisabled,
} from "../../constants/styles";

import { throttle } from "@daybrush/utils";
import { editHotspot } from "../../functions/configurePage";
function ImageContainer({
  configuredImage,
  handleUploadImage,
  deltaPosition,
  setDeltaPosition,
  hotspots,
  setHotspots,
}) {
  const dragRef = useRef(null);
  const disabledDragRef = useRef(null);
  const uploadedImage = useRef(null);
  let timeoutId;
  const debouncePositionValue = (value) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setDeltaPosition((prevState) => ({
        ...prevState,
        ...value,
      }));
    }, 500);
  };
  return (
    <LegacyCard title="Selected Image" sectioned>
      {configuredImage ? (
        <ConfiguredImageContainer className="resizable_target">
          <ConfiguredImage
            ref={uploadedImage}
            src={
              ["image/gif", "image/jpeg", "image/png"].includes(
                configuredImage.type
              )
                ? window.URL.createObjectURL(configuredImage)
                : configuredImage
            }
          />
          {deltaPosition.state ? (
            <DragableActiveContainer>
              <DragableElement
                ref={dragRef}
                style={{
                  transform: `translate(${deltaPosition.x}px, ${deltaPosition.y}px) rotate(${deltaPosition.rotate}deg)`,
                }}
              >
                Drag
              </DragableElement>
              <Moveable
                target={dragRef}
                // resizable={true}
                draggable={true}
                rotatable={true}
                snappable={true}
                bounds={{
                  left: 0,
                  top: 0,
                  bottom: 0,
                  right: 0,
                  position: "css",
                }}
                // onResizeStart={(e) => {
                //   e.setFixedDirection([0, 0]);
                // }}
                onDrag={(e) => {
                  e.target.style.transform = e.transform;
                  debouncePositionValue({
                    x: e.translate[0],
                    y: e.translate[1],
                  });
                }}
                // onBeforeResize={(e) => {
                //   if (keycon.global.shiftKey) {
                //     e.setFixedDirection([-1, -1]);
                //   } else {
                //     e.setFixedDirection([0, 0]);
                //   }
                // }}
                // onResize={(e) => {
                //   e.target.style.cssText += `width: ${e.width}px; height: ${e.height}px`;
                //   e.target.style.transform = e.drag.transform;
                //   debouncePositionValue({
                //     resize: { width: e.width, height: e.height },
                //     position: e.drag.transform,
                //   });
                // }}
                onBeforeRotate={(e) => {
                  e.setRotation(throttle(e.rotation, 1));
                }}
                onRotate={(e) => {
                  e.target.style.transform = e.drag.transform;
                  debouncePositionValue({
                    rotate: e.rotate,
                  });
                }}
              />
            </DragableActiveContainer>
          ) : null}
          {hotspots?.map((spotsParams, index) => (
            <DragableDisabledContainer
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
              key={index}
            >
              <DragableElementDisabled
                ref={disabledDragRef}
                x={spotsParams.x}
                y={spotsParams.y}
                rotate={spotsParams.rotate}
                hidden={spotsParams.hidden}
              >
                {index + 1}
              </DragableElementDisabled>
              <Moveable
                target={disabledDragRef}
                resizable={false}
                draggable={false}
                rotatable={false}
                snappable={true}
                bounds={{
                  left: 0,
                  top: 0,
                  bottom: 0,
                  right: 0,
                  position: "css",
                }}
                // onBeforeResize={(e) => {
                //   if (keycon.global.shiftKey) {
                //     e.setFixedDirection([-1, -1]);
                //   } else {
                //     e.setFixedDirection([0, 0]);
                //   }
                // }}
                onBeforeRotate={(e) => {
                  e.setRotation(throttle(e.rotation, 1));
                }}
              />
            </DragableDisabledContainer>
          ))}
        </ConfiguredImageContainer>
      ) : (
        <DropZone
          accept="image/svg, image/jpeg, image/png"
          allowMultiple={false}
          outline={false}
          onDrop={handleUploadImage}
        >
          <ConfiguredNoImage src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-4.png" />
        </DropZone>
      )}
    </LegacyCard>
  );
}

export default ImageContainer;
