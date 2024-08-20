import Button from "@/components/button/ButtonComponent";

import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import { useState } from "react";
import { DeleteBusiness } from "./DeleteBusiness";

type Props = {
  businessId: string;
  businessName: string;
};

export const Settings: React.FC<Props> = ({ businessId, businessName }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  return (
    <>
      <Button
        variant="danger"
        label="Delete business"
        onPress={() => setOpenDeleteModal(true)}
      />
      <BottomPopup
        openModal={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      >
        <BottomPopupContent>
          <DeleteBusiness businessId={businessId} businessName={businessName} />
        </BottomPopupContent>
      </BottomPopup>
    </>
  );
};
