// src/screens/misc/SavedMeetingsScreen.tsx

import MeetingCard from "@/src/components/common/MeetingCard";
import MeetingInfoModal from "@/src/components/common/MeetingInfoModal";
import MiscHeader from "@/src/components/common/MiscHeader";
import colors from "@/src/constants/colors";
import { meetingTestData } from "@/src/constants/testData/testData";
import { Meeting } from "@/src/types/meetingType";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function SavedMeetingsScreen() {
  const router = useRouter();

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
          isMyMeeting={false}
          onPress={() => handlePressMeetingCard(meeting)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MiscHeader title="저장한 모임" />

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
              isMyMeeting={false}
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
  listStyle: {
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
});
