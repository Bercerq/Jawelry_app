import axios from "axios";

export function editHotspot(
  deltaPosition,
  ind,
  hotspots,
  spotsParams,
  setDeltaPosition,
  setHotspots
) {
  if (!deltaPosition.state) {
    handleEdithotSpot(hotspots, setHotspots, ind);
    setDeltaPosition(spotsParams);
  }
}

function handleEdithotSpot(hotspots, setHotspots, ind) {
  let editedHotspot = hotspots.find((el, index) => index === ind);
  editedHotspot.index = ind;
  editedHotspot.hidden = true;
  setHotspots((prevState) => {
    const updatedHotspots = [...prevState];
    updatedHotspots[ind] = editedHotspot;
    return updatedHotspots;
  });
}

export function handleDeleteHotSpot(hotspots, setHotspots, ind) {
  let newArrHotspots = hotspots.filter((el, index) => index !== ind);
  setHotspots(newArrHotspots);
}

export function configureActions(
  selectedProduct,
  selectedVariant,
  configuredImage,
  fetch,
  hotspots,
  charmLocation,
  showActiveToast,
  setHotspots,
  setCharmLocation,
  navigate,
  setReqLoading,
  setToastMessage
) {
  const saveChanges = async () => {
    setReqLoading(true);
    const formData = new FormData();
    formData.append("file", configuredImage);
    formData.append("upload_preset", charmLocation.value);
    axios
      .post("https://api.cloudinary.com/v1_1/dzi76opdu/image/upload", formData)
      .then((response) => {
        makeSaveMetafieldsRequest(response.data.secure_url);
      })
      .catch((error) => {
        setToastMessage(error.toJSON().message);
        showActiveToast();
        setReqLoading(false);
      });
  };
  const makeSaveMetafieldsRequest = async (originalImage) => {
    let ownerId = selectedProduct.variants.nodes.find(({ title }) => {
      return title === selectedVariant;
    }).id;

    let response = await fetch(`/api/metafields/set`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        {
          key: "visualiser",
          namespace: "personalisation",
          ownerId,
          type: "json",
          value: JSON.stringify({
            hotspots,
            charmLocation: charmLocation.value,
            configuredImage: originalImage,
          }),
        },
      ]),
    });

    await fetch(`/api/product/tag/set`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selectedProduct.id,
      }),
    });

    let res = await response.json();

    if (res.status === 200) {
      setToastMessage("Configuration successfully saved !");
      showActiveToast();
      setReqLoading(false);
    } else {
      setToastMessage(
        "The configuration has not been saved! Something went wrong"
      );
      showActiveToast();
      setReqLoading(false);
    }
  };
  const coppyConfigure = () => {
    let configureObj = {
      hotspots,
      charmLocation,
    };
    showActiveToast();
    setToastMessage("Config successfully copied and saved !");
    localStorage.setItem("jawelry_config", JSON.stringify(configureObj));
  };
  const applyConfigure = () => {
    let lsConfigure = JSON.parse(localStorage.getItem("jawelry_config"));
    showActiveToast();
    setToastMessage("The configuration has been successfully applied !");

    if (lsConfigure?.hotspots) {
      setHotspots(lsConfigure.hotspots);
    }
    if (lsConfigure?.charmLocation) {
      setCharmLocation(lsConfigure.charmLocation);
    }
  };
  const goBackClick = () => {
    navigate(`/`, { replace: true, reloadDocument: true });
  };
  return { goBackClick, saveChanges, applyConfigure, coppyConfigure };
}
