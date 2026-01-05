// src/components/main/MeetingInfoModal.tsx

import KakaoMapIcon from "@/assets/images/icons/common/kakaomap.svg";
import CrownIcon from "@/assets/images/icons/meeting/crown.svg";
import DistanceIcon from "@/assets/images/icons/meeting/distance.svg";
import HeartIconEmpty from "@/assets/images/icons/meeting/heart-empty.svg";
import HeartIconFilled from "@/assets/images/icons/meeting/heart-filled.svg";
import colors from "@/src/constants/colors";
import { Meeting } from "@/src/types/meetingType";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import InfoAndImage from "../common/InfoAndImage";

interface MeetingInfoModalProps {
  meeting: Meeting;
  // TODO : 참여 친구 목록
}

const ICON_SIZE = 14;

const IconTextRow = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <View style={styles.rowContainer}>
      {icon}
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
};

export default function MeetingInfoModal({ meeting }: MeetingInfoModalProps) {
  if (!meeting) return null;

  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [isLiked, setIsLiked] = useState(false);

  const date = new Date(meeting.meetingTime);

  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
  }).format(date);

  const hour = date.getHours();
  const minute = date.getMinutes();
  const formattedTime = minute === 0 ? `${hour}시` : `${hour}시 ${minute}분`;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 32 }]}>
      <Text style={styles.titleText}>{meeting.title}</Text>

      <View style={[styles.rowContainer, { gap: 14 }]}>
        <View>
          <View style={[styles.rowContainer, { gap: 5 }]}>
            <DistanceIcon width={16} height={16} color={colors.main.red} />
            <Text style={styles.distanceText}>2.3km</Text>
          </View>
          <View style={[styles.rowContainer, { gap: 5 }]}>
            <CrownIcon width={16} height={16} color={colors.main.red} />
            <Text
              style={[
                styles.distanceText,
                { fontFamily: "Pretendard-Regular" },
              ]}
            >
              wowowow
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.profileButton} activeOpacity={0.7}>
          <Text style={styles.profileButtonText}>참여자 프로필 보기</Text>
        </TouchableOpacity>
        <View style={{ borderRadius: 14, overflow: "hidden" }}>
          <KakaoMapIcon width={36} height={36} />
        </View>
      </View>

      <InfoAndImage meeting={meeting} color="red" />

      <Text style={styles.friendText}>
        aaa님 외 2명의 친구들이 참여하고 있어요!
      </Text>

      <View style={styles.descContainer}>
        <Text style={styles.descText}>{meeting.description}</Text>
      </View>

      <View style={styles.bottomButtonRow}>
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => setIsLiked(!isLiked)}
          activeOpacity={0.7}
        >
          {isLiked ? (
            <HeartIconFilled width={22} height={22} color={colors.main.red} />
          ) : (
            <HeartIconEmpty width={22} height={22} color="#C5BEBE" />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.joinButton} activeOpacity={0.7}>
          <Text style={styles.joinButtonText}>참여하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 44,
    paddingTop: 32,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  imageContainer: {
    width: 76,
    height: 76,
    borderRadius: 9999,
    borderColor: colors.main.red,
    borderWidth: 1,
    backgroundColor: colors.main.white,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 28,
    fontFamily: "GumiRomance",
    letterSpacing: -1.2,
    color: colors.main.red,
    marginBottom: 8,
  },
  distanceText: {
    fontSize: 18,
    fontFamily: "Pretendard-SemiBold",
    letterSpacing: -0.2,
    color: colors.main.red,
  },
  infoText: {
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.3,
    color: colors.main.red,
  },
  friendText: {
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
    letterSpacing: -0.4,
    color: colors.main.red,
  },
  descContainer: {
    width: "100%",
    padding: 18,
    backgroundColor: "#EFEFEF",
    borderRadius: 16,
  },
  descText: {
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.3,
    color: "#4D4747",
    textAlign: "justify",
  },
  profileButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.main.white,
    borderColor: colors.main.red,
    borderWidth: 1,
    borderRadius: 16,
  },
  profileButtonText: {
    fontSize: 13,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.3,
    color: colors.main.red,
  },
  bottomButtonRow: {
    width: "100%",
    flexDirection: "row",
    height: 44,
    gap: 12,
    alignItems: "center",
  },
  heartButton: {
    backgroundColor: "#EFEFEF",
    width: 44,
    height: "100%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 2,
  },
  joinButton: {
    flex: 1,
    height: "100%",
    backgroundColor: colors.main.red,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  joinButtonText: {
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
    letterSpacing: -0.3,
    color: colors.main.white,
  },
});
