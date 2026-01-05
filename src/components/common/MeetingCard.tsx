import { Meeting } from "@/src/types/meetingType";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ChatIcon from "@/assets/images/icons/main/my-meeting/chat.svg";
import DistanceIcon from "@/assets/images/icons/meeting/distance.svg";
import HeartIconFilled from "@/assets/images/icons/meeting/heart-filled.svg";
import WhenIconEmpty from "@/assets/images/icons/meeting/when-empty.svg";
import colors from "@/src/constants/colors";
import InfoAndImage from "./InfoAndImage";

interface MeetingCardProps {
  meeting: Meeting;
  showTimeLeft?: boolean;
  isMyMeeting?: boolean;
  unseenMessageCount?: number;
  onPress?: () => void;
  // TODO : 참여 친구 목록
}

export default function MeetingCard({
  meeting,
  showTimeLeft,
  isMyMeeting,
  unseenMessageCount,
  onPress,
}: MeetingCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {showTimeLeft && (
        <View style={[styles.rowContainer]}>
          <WhenIconEmpty width={18} height={18} color={colors.main.white} />
          <Text style={styles.timeLeftText}>5시간 남음</Text>
        </View>
      )}

      <View style={[styles.rowContainer, { justifyContent: "space-between" }]}>
        <Text style={styles.titleText}>{meeting.title}</Text>
        <View style={styles.rowContainer}>
          <DistanceIcon width={20} height={20} color={colors.main.white} />
          <Text style={styles.distanceText}>1.2km</Text>
        </View>
      </View>

      <InfoAndImage meeting={meeting} />

      <View>
        <View
          style={[styles.rowContainer, { justifyContent: "space-between" }]}
        >
          <Text style={styles.friendText}>
            aaa님 외 2명의 친구들이 참여하고 있어요!
          </Text>

          <View style={[styles.rowContainer, { gap: 2 }]}>
            <HeartIconFilled width={14} height={14} color={colors.main.white} />
            <Text style={styles.friendText}> {meeting.saveCount}</Text>
          </View>
        </View>
      </View>

      {isMyMeeting && (
        <TouchableOpacity style={styles.chatContainer} activeOpacity={0.9}>
          <ChatIcon width={20} height={20} color={colors.main.red} />
          <Text style={styles.chatRoomText}>채팅방</Text>
          {unseenMessageCount && unseenMessageCount > 0 && (
            <View style={styles.unseenMessageContainer}>
              <Text style={styles.unseenMessageText}>{unseenMessageCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: colors.main.red,
    borderRadius: 20,
    gap: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  titleText: {
    fontSize: 25,
    fontFamily: "Pretendard-SemiBold",
    letterSpacing: -0.3,
    color: colors.main.white,
  },
  timeLeftText: {
    fontSize: 16,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.4,
    color: colors.main.white,
  },
  distanceText: {
    fontSize: 20,
    fontFamily: "Pretendard-SemiBold",
    letterSpacing: -0.2,
    color: colors.main.white,
  },
  friendText: {
    fontSize: 16,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.3,
    color: colors.main.white,
  },
  chatContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.main.white,
    paddingVertical: 12,
    paddingRight: 2,
    borderRadius: 16,
    marginTop: 6,
    gap: 3,
  },
  chatRoomText: {
    fontSize: 19,
    fontFamily: "Pretendard-SemiBold",
    letterSpacing: -0.6,
    color: colors.main.red,
  },
  unseenMessageContainer: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.main.red,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    marginLeft: 5,
  },
  unseenMessageText: {
    fontSize: 12,
    fontFamily: "Pretendard-SemiBold",
    color: colors.main.white,
  },
});
