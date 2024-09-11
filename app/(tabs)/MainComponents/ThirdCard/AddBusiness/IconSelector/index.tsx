import { IconSelectModal } from "@/components/Organisms/IconSelectModal";
import { useState } from "react";
import { useController } from "react-hook-form";

type Props = {};

export const IconSelector: React.FC<Props> = () => {
  const [openModalIcons, setOpenModalIcons] = useState(false);
  const {
    field: { value: iconId, onChange },
  } = useController({
    name: "iconType",
  });
  return (
    <IconSelectModal
      iconId={iconId}
      setOpenModalIcons={setOpenModalIcons}
      openModalIcons={openModalIcons}
      handleSelectIcon={(icon) => {
        onChange(icon);
        setOpenModalIcons(false);
      }}
    />
  );
};
