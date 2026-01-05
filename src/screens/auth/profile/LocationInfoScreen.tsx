// src/screens/auth/profile/LocationInfoScreen.tsx

import RedButton from "@/src/components/auth/RedButton";
import { KakaoMapView } from "@/src/components/location/KakaoMapView";
import colors from "@/src/constants/colors";
import { useLocationSetup } from "@/src/hooks/useLocationSetup";
import { useAuthStore } from "@/src/stores/authStore";
import { Location } from "@/src/types/commonType";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Postcode from "react-native-daum-postcode";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LocationInfoScreen() {
  const router = useRouter();
  const updateUser = useAuthStore((state) => state.updateUser);

  const {
    fullAddress,
    regionName,
    setRegionName,
    coords,
    setCoords,
    isModalVisible,
    setModalVisible,
    handleAddressSelect,
  } = useLocationSetup();

  const [isComplete, setIsComplete] = useState(false);

  const handleLocationChange = (data: any) => {
    setRegionName(data.regionName);
    setCoords({ lat: data.lat, lng: data.lng });
    setIsComplete(true);
  };

  const handleNext = () => {
    if (!regionName || !coords || !isComplete) return;

    const locationData: Location = {
      type: "Point" as const,
      coordinates: [Number(coords.lng), Number(coords.lat)],
    };
    updateUser({ location: locationData, regionName: regionName });

    router.push("/(auth)/profile/image");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>거주하는 위치를 알려주세요</Text>

      <TouchableOpacity
        style={styles.addressInput}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={[styles.addressLabel, !fullAddress && styles.placeholder]}>
          {fullAddress || "지번, 도로명 주소로 검색하기"}
        </Text>
      </TouchableOpacity>

      <View
        style={[
          styles.mapWrapper,
          {
            borderColor: fullAddress ? colors.main.maroon : colors.utils.grey,
          },
        ]}
      >
        <KakaoMapView
          address={fullAddress}
          onLocationDetected={handleLocationChange}
        />
      </View>

      <Text style={styles.dragHintText}>
        {isComplete ? "지도를 드래그해 정확한 위치를 선택하세요!" : ""}
      </Text>

      <View style={styles.bottomButtonsContainer}>
        <RedButton
          containerStyles={{
            paddingHorizontal: 20,
            height: 48,
            backgroundColor: colors.utils.disabled_grey,
          }}
          title="이전으로"
          onPress={() => router.back()}
        />
        <RedButton
          containerStyles={{ paddingHorizontal: 20, height: 48 }}
          title="다음으로"
          onPress={handleNext}
          disabled={!coords}
        />
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        swipeDirection="down"
        onSwipeComplete={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Postcode
            style={{ flex: 1 }}
            onSelected={(data) => {
              handleAddressSelect(data);
              setIsComplete(true);
            }}
            onError={(error) => {
              console.log("Location search error:", error);
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.main.white,
    paddingHorizontal: 48,
    gap: 24,
  },
  titleText: {
    fontSize: 18,
    fontFamily: "Pretendard-SemiBold",
    letterSpacing: -0.3,
    color: colors.main.maroon,
  },
  addressInput: {
    height: 48,
    backgroundColor: colors.utils.white,
    borderWidth: 1,
    borderColor: colors.main.maroon,
    borderRadius: 16,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  addressLabel: {
    fontSize: 16,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.1,
    color: colors.main.maroon,
  },
  placeholder: {
    color: colors.utils.grey,
  },
  mapWrapper: {
    width: "100%",
    height: 300,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
  },
  dragHintText: {
    fontSize: 12,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.3,
    color: colors.utils.grey,
    marginTop: -12,
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    marginTop: 16,
    gap: 12,
  },
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  modalContent: {
    width: "100%",
    height: "70%",
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
    paddingTop: 48,
  },
  closeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "flex-end",
  },
});
