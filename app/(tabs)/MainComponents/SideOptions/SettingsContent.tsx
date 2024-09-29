import ColorPicker from "@/app/login/MainCard/ColorPicker";
import { Container } from "@/components/Atoms/Container";
import { TextContainer } from "@/components/Atoms/TextContainer";
import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import { ArrayButtons } from "@/components/Molecules/ArrayButtons";
import IconTheme from "@/components/Molecules/IconTheme";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { View, Text } from "react-native";

type Props = {
  openSettings: boolean;
  setOpenSettings: (openProfile: boolean) => void;
};

export const SettingsContent: React.FC<Props> = (props) => {
  const { theme, changeTheme } = useTheme();
  return (
    <BottomPopup
      fullHeight
      openModal={props.openSettings}
      title="Settings"
      onClose={() => props.setOpenSettings(false)}
    >
      <BottomPopupContent>
        <Container
          containerStyles={{
            flexDirection: "column",
            rowGap: 10,
            marginTop: 10,
          }}
        >
          <TextContainer>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ArrayButtons
                defaultValue={theme}
                buttons={["light", "dark"]}
                onSelected={(selected) => changeTheme(selected)}
              />
            </View>
            <IconTheme />
          </TextContainer>

          <TextContainer>
            <Text
              style={{
                fontWeight: 600,
                color: theme === "light" ? Colors.black : "white",
              }}
            >
              Choose Main Color
            </Text>
            <ColorPicker />
          </TextContainer>
        </Container>
      </BottomPopupContent>
    </BottomPopup>
  );
};
