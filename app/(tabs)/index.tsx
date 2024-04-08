import MainLayout from "../../layouts/MainLayout";
import BottomCard from "./MainComponents/BottomCard";
import MainCard from "./MainComponents/MainCard";

export default function TabOneScreen() {
  return (
    <MainLayout mainContent={<MainCard />} secondaryContent={<BottomCard />} />
  );
}
