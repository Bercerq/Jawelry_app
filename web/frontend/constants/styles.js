import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
`;

export const ConfiguredContainer = styled.div`
  display: flex;
  gap: 20px;
`;
export const ConfiguredElement = styled.div`
  width: ${({ width }) => width};
  cursor: pointer;
`;
export const ConfiguredNoImage = styled.div`
  border-radius: 2px;
  background: #f2f2f2;
  height: 630px;
  width: 100%;
  border: none;
  cursor: pointer;
`;

export const ConfiguredImageContainer = styled.div`
  border-radius: 2px;
  background: #f2f2f2;
  border: none;
  position: relative;
`;
export const ConfiguredImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
`;
export const Spacer = styled.div`
  ${({ spacer }) => spacer};
`;
export const DragableElement = styled.div`
  border: 1px dashed #008060;
  background: rgba(149, 201, 180, 0.6);
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  color:#202223;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
`;
export const DragableElementDisabled = styled.div`
  border-radius: 6px;
  background: rgba(69, 143, 255, 0.80);
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grabbing;
  position: absolute;
  color:#202223;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
`;