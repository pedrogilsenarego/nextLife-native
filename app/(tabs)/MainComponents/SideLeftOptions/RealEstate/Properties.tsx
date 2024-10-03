import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import { Button } from "../Button";
import { useState } from "react";
import { Card } from "@/components/Atoms/Card";
import { ScrollView, Text, View } from "react-native";
import { Colors } from "@/providers/ThemeContext";
import { useRealEstate } from "@/hooks/realEstate.hooks";
import { PropertyItem } from "./PropertyItem";
import { PropertiesContent } from "./PropertiesContent";

export const Properties = () => {
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  return (
    <>
      <Button onPress={() => setOpenPopup(true)} label="Properties" />
      <BottomPopup
        onClose={() => setOpenPopup(false)}
        title="Properties"
        fullHeight
        bgColor
        openModal={openPopup}
      >
        <BottomPopupContent
          styles={{ paddingHorizontal: 0, paddingVertical: 0 }}
        >
          <PropertiesContent />
        </BottomPopupContent>
      </BottomPopup>
    </>
  );
};
