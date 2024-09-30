import { IconCard } from "@/components/Atoms/IconCard";
import { SelectorButton } from "@/components/Atoms/SelectorButton";
import { BottomPopup } from "@/components/BottomPopup";
import useBusinesses from "@/hooks/useBusinesses";
import { useApp } from "@/providers/AppProvider";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Pressable, View, Text } from "react-native";

export const BusinessFilter = () => {
  const businesses = useBusinesses();
  const { mainColor } = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const { updateBusinessFilter, businessFilter } = useApp();
  if (!businesses.data) return;
  const listOfIcons = () => {
    return businesses?.data?.map((business) => {
      const businessIcon = business?.iconType || 0;

      return (
        <IconCard
          containerStyles={{
            padding: 2,
          }}
          iconId={businessIcon}
          size={18}
        />
      );
    });
  };

  return (
    <>
      <View>
        <SelectorButton
          label={"Businesses"}
          onPress={() => {
            setOpen(true);
          }}
          value={listOfIcons()}
        />

        <BottomPopup
          title="Businesses"
          openModal={open}
          onClose={() => setOpen(false)}
          fullHeight
        >
          <FlatList
            data={businesses?.data}
            renderItem={(business) => (
              <Pressable
                key={business.index}
                onPress={() => updateBusinessFilter(business.item.id)}
                style={{
                  paddingVertical: 14,
                  paddingHorizontal: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.lightGray,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  columnGap: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 8,
                  }}
                >
                  <IconCard
                    containerStyles={{
                      padding: 2,
                      borderWidth: 2,
                      borderColor: !businessFilter?.includes(business.item.id)
                        ? mainColor
                        : "transparent",
                    }}
                    iconId={business.item.iconType}
                    size={18}
                  />

                  <Text
                    style={{
                      fontSize: 18,
                      color: Colors.gray,
                      fontWeight: !businessFilter?.includes(business.item.id)
                        ? 600
                        : 400,
                    }}
                  >
                    {business.item.businessName}
                  </Text>
                </View>
                {!businessFilter?.includes(business.item.id) && (
                  <AntDesign name="check" size={24} color={mainColor} />
                )}
              </Pressable>
            )}
          />
        </BottomPopup>
      </View>
    </>
  );
};
