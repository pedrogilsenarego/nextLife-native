import { Container } from "@/components/Atoms/Container";
import { IconCard } from "@/components/Atoms/IconCard";
import BottomPopup from "@/components/BottomPopup";
import { defaultBusiness } from "@/constants/defaultBusinesses";
import { useBusinessIcons } from "@/constants/useBusinessIcons";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { Business } from "@/types/businessTypes";
import { useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";

type Props = {
  business: Business;
};

export const Header: React.FC<Props> = ({ business }) => {
  const { theme, mainColor } = useTheme();
  const [openModalIcons, setOpenModalIcons] = useState(false);
  const businessIcons = useBusinessIcons({ size: 40 });
  const businessLabel = defaultBusiness.find(
    (item) => item.value === business.type
  )?.label;
  const businessIcon = business.settings.icon || 0;
  return (
    <>
      <View
        style={{
          marginTop: 55,
          alignItems: "center",
          width: "100%",
          flexDirection: "row",
          paddingBottom: 10,
          columnGap: 10,
        }}
      >
        <Pressable onPress={() => setOpenModalIcons(true)}>
          <IconCard icon={businessIcons[businessIcon].icon} size={40} />
        </Pressable>
        <View>
          <Text
            style={{
              color: theme === "light" ? "black" : "white",
              textTransform: "capitalize",
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            {business.businessName}
          </Text>
          <Text
            style={{
              color: "gray",
              textTransform: "capitalize",
              fontSize: 12,
              fontWeight: "600",
            }}
          >
            {businessLabel}
          </Text>
        </View>
      </View>
      <BottomPopup
        fullHeight
        closeIcon
        openModal={openModalIcons}
        onClose={() => setOpenModalIcons(false)}
      >
        <FlatList
          data={businessIcons}
          keyExtractor={(item) => item.value.toString()}
          renderItem={({ item }) => (
            <IconCard
              icon={item.icon}
              size={45}
              containerStyles={{
                borderWidth: item.value === businessIcon ? 3 : 1,
                borderColor:
                  item.value === businessIcon ? mainColor : Colors.lightGray,
                margin: 5, // Adjust as needed for spacing
              }}
            />
          )}
          numColumns={4} // Adjust this number based on how many columns you want
          contentContainerStyle={{
            flex: 1,

            alignItems: "center",
            justifyContent: "center",
          }}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
        />
      </BottomPopup>
    </>
  );
};
