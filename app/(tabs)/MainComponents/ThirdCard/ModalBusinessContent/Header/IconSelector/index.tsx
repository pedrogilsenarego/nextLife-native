import { updateBusinessIconType } from "@/actions/businessActions";
import { IconSelectModal } from "@/components/Organisms/IconSelectModal";
import useBusinesses from "@/hooks/useBusinesses";
import { Business } from "@/types/businessTypes";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
  business: Business;
};

export const IconSelector: React.FC<Props> = ({ business }) => {
  const businesses = useBusinesses();
  const [openModalIcons, setOpenModalIcons] = useState(false);
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
    <IconSelectModal
      iconId={businessIcon}
      setOpenModalIcons={setOpenModalIcons}
      openModalIcons={openModalIcons}
      handleSelectIcon={handleSelectIcon}
    />
  );
};
