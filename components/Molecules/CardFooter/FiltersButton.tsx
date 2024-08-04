import { Pressable, Text, View } from "react-native";
import { FiltersModal } from "./FiltersModal";
import { useState } from "react";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { useApp } from "@/providers/AppProvider";
import { dateRangeLabel } from "@/mappers/dateRange";
import { Ionicons } from "@expo/vector-icons";

export const FiltersButton: React.FC = () => {
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const { dateRange, businessFilter, categoryFilter } = useApp();
  const { mainColor } = useTheme();

  const numberBadge = businessFilter.length + categoryFilter.length;

  return (
    <>
      <Pressable
        onPress={() => setOpenFilters(true)}
        style={{
          paddingVertical: 1,
          paddingHorizontal: 10,
          borderRadius: 40,
          position: "relative",
          backgroundColor: `${mainColor}80`,
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          columnGap: 10,
        }}
      >
        {numberBadge > 0 && (
          <View
            style={{
              backgroundColor: Colors.black,
              aspectRatio: 1,
              flexGrow: 1,
              flex: 1,
              zIndex: 10,
              position: "absolute",
              borderRadius: 40,
              right: -2,
              top: -6,
              paddingHorizontal: 4,
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>{numberBadge}</Text>
          </View>
        )}
        <Text
          style={{
            fontSize: 10,
            color: Colors.white,
          }}
        >
          {dateRangeLabel(dateRange)}
        </Text>
        <Ionicons name="filter-circle-outline" size={20} color={Colors.white} />
      </Pressable>
      <FiltersModal openModal={openFilters} setOpenModal={setOpenFilters} />
    </>
  );
};
