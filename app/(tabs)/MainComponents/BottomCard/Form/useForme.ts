import { useState } from "react";

export const useForme = () => {
  const [openNoteModal, setOpenNoteModal] = useState<boolean>(false);
  return { openNoteModal, setOpenNoteModal };
};
