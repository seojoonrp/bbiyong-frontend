import NoIcon from "@/assets/images/icons/auth/consent-no.svg";
import YesIcon from "@/assets/images/icons/auth/consent-yes.svg";
import colors from "@/src/constants/colors";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RedButton from "../common/RedButton";

interface ConsentModalProps {
  onAgree: () => void;
}

interface AgreementItem {
  id: number;
  text: string;
  isAgreed: boolean;
}

const CheckBoxRow = ({
  text,
  isAgreed,
  onPress,
}: {
  text: string;
  isAgreed: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
    {isAgreed ? <YesIcon /> : <NoIcon />}
    <Text style={styles.rowText}>{text}</Text>
  </TouchableOpacity>
);

export default function ConsentModal({ onAgree }: ConsentModalProps) {
  const [agreements, setAgreements] = useState<AgreementItem[]>([
    { id: 1, text: "서비스 이용약관 동의 (필수)", isAgreed: false },
    { id: 2, text: "개인정보 처리방침 동의 (필수)", isAgreed: false },
    { id: 3, text: "위치 정보 제공 동의 (필수)", isAgreed: false },
  ]);

  const isAllAgreed = useMemo(
    () => agreements.every((item) => item.isAgreed),
    [agreements]
  );

  const handleToggle = (id: number) => {
    setAgreements((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isAgreed: !item.isAgreed } : item
      )
    );
  };

  const handleToggleAll = () => {
    const newValue = !isAllAgreed;
    setAgreements((prev) =>
      prev.map((item) => ({ ...item, isAgreed: newValue }))
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>서비스 이용에 필요한 약관에 동의해주세요</Text>

      <View style={styles.listContainer}>
        <CheckBoxRow
          text="전체 동의"
          isAgreed={isAllAgreed}
          onPress={handleToggleAll}
        />
        {agreements.map((item) => (
          <CheckBoxRow
            key={item.id}
            text={item.text}
            isAgreed={item.isAgreed}
            onPress={() => handleToggle(item.id)}
          />
        ))}
      </View>

      <RedButton
        containerStyles={{ width: "100%", height: 48 }}
        title="회원가입 완료"
        disabled={!isAllAgreed}
        onPress={onAgree}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  title: {
    color: colors.main.red,
    fontSize: 18,
    fontFamily: "Pretendard-SemiBold",
    letterSpacing: -0.3,
    marginBottom: 24,
  },
  listContainer: {
    width: "100%",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
  },
  rowText: {
    color: colors.main.maroon,
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    letterSpacing: -0.3,
  },
});
