import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
`;

export const ConfiguredContainer = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 1190px) {
    flex-direction: column;
  }
`;
export const ConfiguredElement = styled.div`
  ${({ container_width }) => "width:" + container_width};
  ${({ container_height }) => "height:" + container_height};
  ${({ mobile }) => mobile && `@media (max-width: 1190px) {width:${mobile}}`};
`;
export const ConfiguredNoImage = styled.img`
  border-radius: 2px;
  background: #f2f2f2;
  height: 515px;
  object-fit: contain;
  width: 100%;
  border: none;
  cursor: pointer;
`;

export const ConfiguredImageContainer = styled.div`
  border-radius: 2px;
  background: #f2f2f2;
  border: none;
  position: relative;
  line-height: 1;
`;
export const ConfiguredImage = styled.img`
  width: 100%;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
`;
export const Spacer = styled.div`
  ${({ spacer }) => spacer};
`;
export const DeleteHotspot = styled.div`
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

export const HotSpotLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px 4px 12px;
  border-radius: 32px;
  border: 1px solid #c9cccf;
  color: #202223;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;

export const DragableElement = styled.div`
  width: 50px;
  height: 50px;
  border: 1px dashed #008060;
  background: rgba(149, 201, 180, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  color: #202223;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  z-index: 2;
`;

export const DragableActiveContainer = styled.div`
  .moveable-control.moveable-origin {
    border-color: transparent !important;
    background: transparent !important;
  }
  .moveable-line {
    background: none !important;
    border: 1px dashed #008060;
  }
  .moveable-control {
    border: 3px solid #008060 !important;
    background: #008060 !important;
  }
`;
export const DragableDisabledContainer = styled.div`
  .moveable-control.moveable-origin {
    border-color: transparent !important;
    background: transparent !important;
  }
  .moveable-line {
    height: 0 !important;
  }
`;

export const DragableElementDisabled = styled.div`
  z-index: 1;
  border-radius: 6px;
  background: rgba(69, 143, 255, 0.8);
  width: 50px;
  height: 50px;
  ${({ x, y, rotate }) =>
    `transform: translate(${x}px, ${y}px)  ${
      rotate !== 0 ? "rotate(" + rotate + "deg)" : ""
    }`};
  ${({ hidden }) => (hidden ? "display:none;" : "display: flex;")}
  justify-content: center;
  align-items: center;
  cursor: grabbing;
  position: absolute;
  top: 0;
  left: 0;
  color: #202223;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
`;
