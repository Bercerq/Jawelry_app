import { useCallback } from "react";

export function useUploadImage(setConfiguredImage) {
  const handleUploadImage = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => {
      setConfiguredImage(acceptedFiles[0]);
    },
    [setConfiguredImage]
  );

  return handleUploadImage;
}



