// src/screens/main/MyMeetingsScreen.tsx

import MainIcon from "@/assets/images/icons/main/my-meeting/main.svg";
import HeartIcon from "@/assets/images/icons/meeting/heart-filled.svg";
import colors from "@/src/constants/colors";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import MeetingCard from "@/src/components/common/MeetingCard";
import { meetingTestData } from "@/src/constants/testData/testData";
import { Meeting } from "@/src/types/meetingType";
import { FlatList } from "react-native-gesture-handler";

import MeetingInfoModal from "@/src/components/common/MeetingInfoModal";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

export default function MyMeetingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [searchText, setSearchText] = useState<string>("");
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const animationConfigs = useMemo(
    () => ({
      damping: 40,
      stiffness: 150,
      mass: 0.5,
    }),
    []
  );

  const isNavigatingRef = useRef(false);
  useFocusEffect(
    useCallback(() => {
      if (selectedMeeting) {
        setTimeout(() => {
          bottomSheetModalRef.current?.present();
        }, 50);
      }

      isNavigatingRef.current = false;
    }, [selectedMeeting])
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
        pressBehavior="close"
      />
    ),
    []
  );

  const handleParticipantPress = () => {
    isNavigatingRef.current = true;
    bottomSheetModalRef.current?.dismiss();
    router.push("/(misc)/participant-profile");
  };

  const handlePressMeetingCard = useCallback((meeting: Meeting) => {
    if (!meeting) return;

    setSelectedMeeting(meeting);
    bottomSheetModalRef.current?.present();
  }, []);

  const [meetingData, setMeetingData] = useState<Meeting[]>(meetingTestData);
  // Test data
  useEffect(() => {
    setMeetingData(meetingTestData);
  }, []);

  const renderMeetingItem = (meeting: Meeting) => {
    return (
      <View style={{ marginBottom: 12 }}>
        <MeetingCard
          meeting={meeting}
          showTimeLeft={true}
          isMyMeeting={true}
          unseenMessageCount={12}
          onPress={() => handlePressMeetingCard(meeting)}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <MainIcon width={36} height={36} />
          <Text style={styles.titleText}>내 모임</Text>
        </View>
        <View style={styles.headerButtonRow}>
          <View style={styles.greyContainer}>
            <Text style={styles.greyText}>
              {meetingData.length}개의 예정된 모임
            </Text>
          </View>
          <TouchableOpacity
            style={styles.savedMeetingsButton}
            onPress={() => router.push("/(misc)/saved-meetings")}
            activeOpacity={0.5}
          >
            <HeartIcon width={14} height={14} color={colors.main.white} />
            <Text style={styles.savedMeetingsButtonText}>저장한 모임</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        style={styles.listStyle}
        data={meetingData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderMeetingItem(item)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
      />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        backdropComponent={renderBackdrop}
        onDismiss={() => {
          if (!isNavigatingRef.current) {
            setSelectedMeeting(null);
          }
        }}
        animationConfigs={animationConfigs}
        backgroundStyle={{
          borderRadius: 32,
          backgroundColor: colors.main.white,
        }}
      >
        <BottomSheetView style={styles.contentContainer}>
          {selectedMeeting ? (
            <MeetingInfoModal
              meeting={selectedMeeting}
              isMyMeeting={true}
              unseenMessageCount={12}
              onParticipantPress={handleParticipantPress}
            />
          ) : null}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: colors.main.white,
  },
  header: {
    width: "100%",
    paddingBottom: 8,
    backgroundColor: colors.main.white,
    gap: 12,
    zIndex: 9999,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginLeft: 2,
  },
  titleText: {
    fontSize: 32,
    fontFamily: "GumiRomance",
    letterSpacing: -1.2,
    color: colors.main.red,
  },
  headerButtonRow: {
    width: "100%",
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  greyContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D6D6D6",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  greyText: {
    fontSize: 16,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.3,
    color: colors.main.white,
  },
  savedMeetingsButton: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 12,
    paddingLeft: 14,
    backgroundColor: colors.main.red,
    borderRadius: 16,
  },
  savedMeetingsButtonText: {
    marginLeft: 6,
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
    letterSpacing: -0.3,
    color: colors.main.white,
  },
  listStyle: {
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  errorMessage: {
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.3,
    color: colors.main.maroon,
    marginTop: 24,
  },
});
