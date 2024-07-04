import { useTheme } from "@/providers/ThemeContext";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  size?: number;
};

export const useBusinessIcons = ({ size }: Props) => {
  const { mainColor } = useTheme();

  const color = mainColor;
  return [
    {
      value: 0,
      icon: <AntDesign size={size} name="gitlab" color={color} />,
    },
    {
      value: 1,
      icon: <AntDesign size={size} name="home" color={color} />,
    },
    {
      value: 2,
      icon: <AntDesign size={size} name="team" color={color} />,
    },
    {
      value: 3,
      icon: <AntDesign size={size} name="user" color={color} />,
    },
    {
      value: 4,
      icon: <AntDesign size={size} name="CodeSandbox" color={color} />,
    },
    {
      value: 5,
      icon: <AntDesign size={size} name="dribbble" color={color} />,
    },
    {
      value: 6,
      icon: <AntDesign size={size} name="warning" color={color} />,
    },
    {
      value: 7,
      icon: <AntDesign size={size} name="wallet" color={color} />,
    },
    {
      value: 8,
      icon: <AntDesign size={size} name="rest" color={color} />,
    },
    {
      value: 9,
      icon: <AntDesign size={size} name="medicinebox" color={color} />,
    },
    {
      value: 10,
      icon: <AntDesign size={size} name="tool" color={color} />,
    },
    {
      value: 11,
      icon: <AntDesign size={size} name="iconfontdesktop" color={color} />,
    },
  ];
};
