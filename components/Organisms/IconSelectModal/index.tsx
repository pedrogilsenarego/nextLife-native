import { IconCard } from "@/components/Atoms/IconCard";
import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import { useBusinessIcons } from "@/constants/useBusinessIcons";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { FlatList, Pressable } from "react-native";

type Props = {
  iconId: number;
  setOpenModalIcons: (openModalIcons: boolean) => void;
  openModalIcons: boolean;
  handleSelectIcon: (icon: number) => void;
};

export const IconSelectModal: React.FC<Props> = ({
  setOpenModalIcons,
  iconId,
  openModalIcons,
  handleSelectIcon,
}) => {
  const businessIcons = useBusinessIcons({ size: 40 });
  const { mainColor } = useTheme();
  return (
    <>
      <Pressable onPress={() => setOpenModalIcons(true)}>
        <IconCard iconId={iconId} size={40} />
      </Pressable>
      <BottomPopup
        fullHeight
        openModal={openModalIcons}
        onClose={() => setOpenModalIcons(false)}
      >
        <BottomPopupContent>
          <FlatList
            data={businessIcons}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleSelectIcon(item.value)}>
                <IconCard
                  iconId={item.value}
                  size={45}
                  containerStyles={{
                    borderWidth: item.value === iconId ? 3 : 1,
                    borderColor:
                      item.value === iconId ? mainColor : Colors.lightGray,
                    margin: 5,
                  }}
                />
              </Pressable>
            )}
            numColumns={4}
            contentContainerStyle={{
              flex: 1,

              alignItems: "center",
              justifyContent: "center",
            }}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
          />
        </BottomPopupContent>
      </BottomPopup>
    </>
  );
};
