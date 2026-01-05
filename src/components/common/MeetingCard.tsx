import { Meeting } from "@/src/types/meetingType";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AgeRangeIcon from "@/assets/images/icons/meeting/age-range.svg";
import CalenderIcon from "@/assets/images/icons/meeting/calendar.svg";
import ClockIcon from "@/assets/images/icons/meeting/clock.svg";
import DistanceIcon from "@/assets/images/icons/meeting/distance.svg";
import HeartIconFilled from "@/assets/images/icons/meeting/heart-filled.svg";
import LocationIcon from "@/assets/images/icons/meeting/location.svg";
import PeopleIcon from "@/assets/images/icons/meeting/people.svg";
import colors from "@/src/constants/colors";

interface MeetingCardProps {
  meeting: Meeting;
  showTimeLeft?: boolean;
  onPress?: () => void;
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

export default function MeetingCard({ meeting, onPress }: MeetingCardProps) {
  const date = new Date(meeting.meetingTime);

  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
  }).format(date);

  const hour = date.getHours();
  const minute = date.getMinutes();
  const formattedTime = minute === 0 ? `${hour}시` : `${hour}시 ${minute}분`;

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
      <View style={[styles.rowContainer, { justifyContent: "space-between" }]}>
        <View style={{ gap: 5 }}>
          <IconTextRow
            icon={
              <PeopleIcon
                width={ICON_SIZE}
                height={ICON_SIZE}
                color={colors.main.white}
              />
            }
            text={`${meeting.participantIDs.length}/${meeting.maxParticipants}명`}
          />
          <IconTextRow
            icon={
              <LocationIcon
                width={ICON_SIZE}
                height={ICON_SIZE}
                color={colors.main.white}
              />
            }
            text={meeting.placeName}
          />
          <IconTextRow
            icon={
              <AgeRangeIcon
                width={ICON_SIZE}
                height={ICON_SIZE}
                color={colors.main.white}
              />
            }
            text={`${meeting.ageRange[0]}~${meeting.ageRange[1]}세`}
          />
          <View style={[styles.rowContainer, { gap: 16 }]}>
            <IconTextRow
              icon={
                <CalenderIcon
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  color={colors.main.white}
                />
              }
              text={formattedDate}
            />
            <IconTextRow
              icon={
                <ClockIcon
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  color={colors.main.white}
                />
              }
              text={formattedTime}
            />
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Text>이미지</Text>
        </View>
      </View>
      <View>
        <View
          style={[styles.rowContainer, { justifyContent: "space-between" }]}
        >
          <Text style={styles.friendText}>
            aaa님 외 2명의 친구들이 참여하고 있어요!
          </Text>
          <IconTextRow
            icon={
              <HeartIconFilled
                width={ICON_SIZE}
                height={ICON_SIZE}
                color={colors.main.white}
              />
            }
            text={meeting.saveCount.toString()}
          />
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
  imageContainer: {
    width: 76,
    height: 76,
    borderRadius: 9999,
    backgroundColor: colors.main.white,
    justifyContent: "center",
    alignItems: "center",
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
  infoText: {
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.3,
    color: colors.main.white,
  },
  friendText: {
    fontSize: 16,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.3,
    color: colors.main.white,
  },
});
