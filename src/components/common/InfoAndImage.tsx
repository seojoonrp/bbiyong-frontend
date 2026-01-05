// src/components/common/InfoAndImage.tsx

import AgeRangeIcon from "@/assets/images/icons/meeting/age-range.svg";
import CalenderIcon from "@/assets/images/icons/meeting/calendar.svg";
import ClockIcon from "@/assets/images/icons/meeting/clock.svg";
import LocationIcon from "@/assets/images/icons/meeting/location.svg";
import PeopleIcon from "@/assets/images/icons/meeting/people.svg";
import colors from "@/src/constants/colors";
import { Meeting } from "@/src/types/meetingType";
import { StyleSheet, Text, View } from "react-native";

interface InfoAndImageProps {
  meeting: Meeting;
  color?: string;
}

const ICON_SIZE = 14;

const IconTextRow = ({
  icon,
  text,
  colorToUse,
}: {
  icon: React.ReactNode;
  text: string;
  colorToUse: string;
}) => {
  return (
    <View style={styles.rowContainer}>
      {icon}
      <Text style={[styles.infoText, { color: colorToUse }]}>{text}</Text>
    </View>
  );
};

export default function InfoAndImage({ meeting, color }: InfoAndImageProps) {
  const colorToUse = color === "red" ? colors.main.red : colors.main.white;

  const date = new Date(meeting.meetingTime);

  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
  }).format(date);

  const hour = date.getHours();
  const minute = date.getMinutes();
  const formattedTime = minute === 0 ? `${hour}시` : `${hour}시 ${minute}분`;

  return (
    <View
      style={[
        styles.rowContainer,
        { width: "100%", justifyContent: "space-between" },
      ]}
    >
      <View style={{ gap: 5 }}>
        <IconTextRow
          icon={
            <PeopleIcon
              width={ICON_SIZE}
              height={ICON_SIZE}
              color={colorToUse}
            />
          }
          text={`${meeting.participantIDs.length}/${meeting.maxParticipants}명`}
          colorToUse={colorToUse}
        />
        <IconTextRow
          icon={
            <LocationIcon
              width={ICON_SIZE}
              height={ICON_SIZE}
              color={colorToUse}
            />
          }
          text={meeting.placeName}
          colorToUse={colorToUse}
        />
        <IconTextRow
          icon={
            <AgeRangeIcon
              width={ICON_SIZE}
              height={ICON_SIZE}
              color={colorToUse}
            />
          }
          text={`${meeting.ageRange[0]}~${meeting.ageRange[1]}세`}
          colorToUse={colorToUse}
        />
        <View style={[styles.rowContainer, { gap: 16 }]}>
          <IconTextRow
            icon={
              <CalenderIcon
                width={ICON_SIZE}
                height={ICON_SIZE}
                color={colorToUse}
              />
            }
            text={formattedDate}
            colorToUse={colorToUse}
          />
          <IconTextRow
            icon={
              <ClockIcon
                width={ICON_SIZE}
                height={ICON_SIZE}
                color={colorToUse}
              />
            }
            text={formattedTime}
            colorToUse={colorToUse}
          />
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Text>이미지</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.3,
    color: colors.main.white,
  },
  imageContainer: {
    width: 76,
    height: 76,
    borderRadius: 9999,
    backgroundColor: colors.main.white,
    borderColor: colors.main.red,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
