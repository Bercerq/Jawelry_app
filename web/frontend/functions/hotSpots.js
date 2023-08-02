export function getHotspotsFunctions(
  deltaPosition,
  setHotspots,
  setDeltaPosition,
  hotspots
) {
  const addHotspot = () => {
    if (deltaPosition.hidden) {
      let newObj = JSON.parse(JSON.stringify(deltaPosition));
      delete newObj.index;
      delete newObj.hidden;

      setHotspots((prevState) => {
        const updatedHotspots = [...prevState];
        updatedHotspots[deltaPosition.index] = newObj;
        return updatedHotspots;
      });
    } else {
      setHotspots((prevState) => [...prevState, deltaPosition]);
    }
    handleSetPositionByDefault(false);
  };
  const handleChangePosition = (e) => {
    setDeltaPosition((prevState) => ({
      ...prevState,
      ...e,
    }));
  };
  const handleCancel = () => {
    if (deltaPosition.hidden) {
      let editedHotspot = hotspots.find(
        (el, index) => index === deltaPosition.index
      );
      delete editedHotspot.index;
      delete editedHotspot.hidden;

      setHotspots((prevState) => {
        const updatedHotspots = [...prevState];
        updatedHotspots[deltaPosition.index] = editedHotspot;
        return updatedHotspots;
      });
    }

    handleSetPositionByDefault(false);
  };
  const handleSetPositionByDefault = (boolVal) => {
    setDeltaPosition({
      state: boolVal,
      x: 0,
      y: 0,
      rotate: 0
    });
  };
  return {
    handleSetPositionByDefault,
    handleChangePosition,
    handleCancel,
    addHotspot,
  };
}
