export function editHotspot(
  deltaPosition,
  ind,
  hotspots,
  spotsParams,
  setDeltaPosition,
  setHotspots
) {
  if (!deltaPosition.state) {
    setDeltaPosition(spotsParams);
    deleteHotSpot(hotspots, setHotspots, ind);
  }
}

export function deleteHotSpot(hotspots, setHotspots, ind) {
  let newArrHotspots = hotspots.filter((el, index) => index !== ind);
  setHotspots(newArrHotspots);
}
