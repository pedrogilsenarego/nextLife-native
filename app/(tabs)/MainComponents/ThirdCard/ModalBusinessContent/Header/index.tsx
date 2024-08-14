import { Business } from "@/types/businessTypes";
import { View, Text, Pressable } from "react-native";
import { IconSelector } from "./IconSelector";

type Props = {
  business: Business;
};

export const Header: React.FC<Props> = ({ business }) => {
  return (
    <>
      <View
        style={{
          marginTop: 40,

          alignItems: "center",
          width: "100%",
          flexDirection: "row",
          paddingBottom: 10,
          columnGap: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            columnGap: 10,
          }}
        >
          <IconSelector business={business} />
        </View>
      </View>
    </>
  );
};
