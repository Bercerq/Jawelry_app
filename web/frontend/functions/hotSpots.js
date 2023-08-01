export function getHotspotsFunctions(
    deltaPosition,
    setHotspots,
    setDeltaPosition,
    hotspots
  ) {
    const addHotspot = () => {
      if (deltaPosition.index) {
        let newObj = JSON.parse(JSON.stringify(deltaPosition));
        delete newObj.index;
        setHotspots((prevState) => {
          const updatedHotspots = [...prevState];
          updatedHotspots[deltaPosition.index] = newObj;
          return updatedHotspots;
        });
      } else {
        setHotspots((prevState) => [...prevState, deltaPosition]);
      }
      handleSetPositionByDefault();
    };
    const handleChangePosition = (e) => {
        console.log(e);
      setDeltaPosition((prevState) => ({
        ...prevState,
        ...e,
      }));
    };
    const handleCancel = () => {
      let editedHotspot = hotspots.find(
        (el, index) => index === deltaPosition.index
      );
      delete editedHotspot.index;
      setHotspots((prevState) => {
        const updatedHotspots = [...prevState];
        updatedHotspots[deltaPosition.index] = editedHotspot;
        return updatedHotspots;
      });
      handleSetPositionByDefault();
    };
    const handleSetPositionByDefault = () => {
      setDeltaPosition({
        state: false,
        x: 0,
        y: 0,
        rotate: 0,
        matrix: "1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 200, -400, 0, 1",
      });
    };
    return {
      handleSetPositionByDefault,
      handleChangePosition,
      handleCancel,
      addHotspot,
    };
  }