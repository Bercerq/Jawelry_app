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
    handleDeleteHotSpot(hotspots, setHotspots, ind);
  }
}

export function handleDeleteHotSpot(hotspots, setHotspots, ind) {
  let newArrHotspots = hotspots.filter((el, index) => index !== ind);
  setHotspots(newArrHotspots);
}
