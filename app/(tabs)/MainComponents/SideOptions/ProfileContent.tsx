import { Container } from "@/components/Atoms/Container";
import { TextContainer } from "@/components/Atoms/TextContainer";
import {
  BottomPopup,
  BottomPopupContent,
  BottomPopupNotification,
} from "@/components/BottomPopup";
import useUser from "@/hooks/useUser";
import { formattedDate } from "@/utils/dateFormat";
import { Text } from "react-native";

type Props = {
  openProfile: boolean;
  setOpenProfile: (openProfile: boolean) => void;
};

export const ProfileContent: React.FC<Props> = (props) => {
  const user = useUser();

  return (
    <BottomPopup
      fullHeight
      openModal={props.openProfile}
      title="Profile"
      onClose={() => props.setOpenProfile(false)}
    >
      <BottomPopupNotification
        label={
          "The user settings are still under devleopment and will be editable in the future"
        }
      />
      <BottomPopupContent>
        <Container
          containerStyles={{
            flexDirection: "column",
            rowGap: 10,
            marginTop: 10,
          }}
        >
          <TextContainer>
            <Text>Name</Text>
            <Text>{user.data?.username}</Text>
          </TextContainer>
          <TextContainer>
            <Text>Email</Text>
            <Text>{user.data?.email}</Text>
          </TextContainer>
          <TextContainer>
            <Text>User since</Text>
            <Text>{formattedDate(user.data?.created_at)}</Text>
          </TextContainer>
        </Container>
      </BottomPopupContent>
    </BottomPopup>
  );
};
