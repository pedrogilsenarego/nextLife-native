import { useState } from "react";

export const useForme = () => {
  const [openNoteModal, setOpenNoteModal] = useState<boolean>(false);
  const [openDateModal, setOpenDateModal] = useState<boolean>(false);
  return { openNoteModal, setOpenNoteModal, openDateModal, setOpenDateModal };
};
