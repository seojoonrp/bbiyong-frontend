import { Meeting } from "@/src/types/meetingType";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import DistanceIcon from "@/assets/images/icons/meeting/distance.svg";
import HeartIconFilled from "@/assets/images/icons/meeting/heart-filled.svg";
import colors from "@/src/constants/colors";
import InfoAndImage from "./InfoAndImage";

interface MeetingCardProps {
  meeting: Meeting;
  showTimeLeft?: boolean;
  onPress?: () => void;
  // TODO : 참여 친구 목록
}

export default function MeetingCard({ meeting, onPress }: MeetingCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
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
});
