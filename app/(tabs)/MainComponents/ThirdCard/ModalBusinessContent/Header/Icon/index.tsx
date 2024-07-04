import { updateBusinessIconType } from "@/actions/businessActions";
import { IconCard } from "@/components/Atoms/IconCard";
import BottomPopup from "@/components/BottomPopup";
import { useBusinessIcons } from "@/constants/useBusinessIcons";
import useBusinesses from "@/hooks/useBusinesses";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { Business } from "@/types/businessTypes";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, Pressable } from "react-native";

type Props = {
  business: Business;
};

export const Icon: React.FC<Props> = ({ business }) => {
  const businesses = useBusinesses();
  const { mainColor } = useTheme();
  const [openModalIcons, setOpenModalIcons] = useState(false);
  const businessIcons = useBusinessIcons({ size: 40 });

  const businessIcon = business?.iconType || 0;

  const { mutate: updateIconMutation, isPending } = useMutation({
    mutationFn: updateBusinessIconType,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      businesses.refetch();
      setOpenModalIcons(false);
    },
  });

  const handleSelectIcon = (value: number) => {
    updateIconMutation({ businessId: business.id, iconType: value });
  };
  return (
    <>
      <Pressable onPress={() => setOpenModalIcons(true)}>
        <IconCard iconId={businessIcon} size={40} />
      </Pressable>
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
            <Pressable onPress={() => handleSelectIcon(item.value)}>
              <IconCard
                iconId={item.value}
                size={45}
                containerStyles={{
                  borderWidth: item.value === businessIcon ? 3 : 1,
                  borderColor:
                    item.value === businessIcon ? mainColor : Colors.lightGray,
                  margin: 5, // Adjust as needed for spacing
                }}
              />
            </Pressable>
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
