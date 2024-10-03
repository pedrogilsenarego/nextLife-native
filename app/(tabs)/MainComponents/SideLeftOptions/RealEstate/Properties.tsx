import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import { Button } from "../Button";
import { useState } from "react";
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
