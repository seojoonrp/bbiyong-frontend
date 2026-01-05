// src/screens/main/SearchMeetingsScreen.tsx

import MainIcon from "@/assets/images/icons/main/search/main.svg";
import PlusIcon from "@/assets/images/icons/main/search/plus.svg";
import SearchBar from "@/src/components/common/SearchBar";
import colors from "@/src/constants/colors";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import MeetingCard from "@/src/components/common/MeetingCard";
import { meetingTestData } from "@/src/constants/testData/testData";
import { Meeting } from "@/src/types/meetingType";
import { FlatList } from "react-native-gesture-handler";

import MeetingInfoModal from "@/src/components/main/MeetingInfoModal";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

export default function SearchMeetingsScreen() {
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
          onPress={() => handlePressMeetingCard(meeting)}
        />
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <MainIcon width={36} height={36} />
            <Text style={styles.titleText}>동네 모임 찾기</Text>
          </View>
          <View style={styles.headerButtonRow}>
            <SearchBar
              placeholder="검색어를 입력하세요..."
              value={searchText}
              onChangeText={setSearchText}
              containerStyles={{ height: "100%", flexGrow: 1 }}
            />
            <TouchableOpacity
              style={styles.newMeetingButton}
              onPress={() => router.push("/(misc)/create-meeting")}
              activeOpacity={0.5}
            >
              <PlusIcon width={18} height={18} />
              <Text style={styles.newMeetingButtonText}>새 모임 만들기</Text>
            </TouchableOpacity>
          </View>
          {/* TODO : 드랍다운 */}
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
                onParticipantPress={handleParticipantPress}
              />
            ) : null}
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </TouchableWithoutFeedback>
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
    gap: 5,
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
  newMeetingButton: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: colors.main.red,
    borderRadius: 16,
  },
  newMeetingButtonText: {
    marginLeft: 4,
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
