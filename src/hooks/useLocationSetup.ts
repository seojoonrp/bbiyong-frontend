// src/hooks/useLocationSetup.ts

import { useState } from "react";

export const useLocationSetup = () => {
  const [fullAddress, setFullAddress] = useState("");
  const [regionName, setRegionName] = useState("");
  const [coords, setCoords] = useState<{ lat: string; lng: string } | null>(
    null
  );
  const [isModalVisible, setModalVisible] = useState(false);

  const handleAddressSelect = (data: any) => {
    setFullAddress(data.address);
    setRegionName(data.bname || data.bname1 || "");
    setModalVisible(false);
  };

  return {
    fullAddress,
    regionName,
    setRegionName,
    coords,
    setCoords,
    isModalVisible,
    setModalVisible,
    handleAddressSelect,
  };
};
