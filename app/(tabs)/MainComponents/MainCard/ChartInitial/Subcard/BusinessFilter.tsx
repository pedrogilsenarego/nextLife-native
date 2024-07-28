import { IconCard } from "@/components/Atoms/IconCard";
import useBusinesses from "@/hooks/useBusinesses";
import { useApp } from "@/providers/AppProvider";
import { useTheme } from "@/providers/ThemeContext";
import { Pressable, View } from "react-native";

export const BusinessFilter = () => {
  const businesses = useBusinesses();
  const { mainColor } = useTheme();
  const { updateBusinessFilter, businessFilter } = useApp();
  if (!businesses.data) return;

  return (
    <View style={{ flexDirection: "row", columnGap: 2 }}>
      {businesses.data.map((business) => {
        const businessIcon = business?.iconType || 0;
        return (
          <Pressable onPress={() => updateBusinessFilter(business.id)}>
            <IconCard
              containerStyles={{
                padding: 2,
                borderWidth: 2,
                borderColor: businessFilter?.includes(business.id)
                  ? mainColor
                  : "transparent",
              }}
              iconId={businessIcon}
              size={18}
            />
          </Pressable>
        );
      })}
    </View>
  );
};
