import useMetrics from "@/hooks/useMetrics";
import useUser from "@/hooks/useUser";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { View, Text, Dimensions, Pressable } from "react-native";
import { StateSelecter } from "./StateSelecter";
import { SharedValue } from "react-native-reanimated";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";

type Props = {
  handleMoveCarousel: (index: number) => void;
  index: SharedValue<number>;
  setSideMenu: (sideMenu: boolean) => void;
};

export const Header = ({ handleMoveCarousel, index, setSideMenu }: Props) => {
  const { theme } = useTheme();
  const userQuery = useUser();
  const expenses = useExpenses();
  const incomes = useIncomes();
  const currentDate = new Date();
  const monthInLetters = currentDate.toLocaleString("default", {
    month: "long",
  });
  const { totalExpenses, totalIncomes } = useMetrics();
  const formattedDate = `${currentDate.getDate()}, ${monthInLetters} ${currentDate.getFullYear()}`;
  const width = Dimensions.get("screen").width;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 18,

        width,
      }}
    >
      <View style={{ rowGap: 2 }}>
        <Text
          style={{
            color: theme === "light" ? Colors.black : "white",
            fontSize: 20,
          }}
        >
          Hello,{" "}
          <Text
            style={{
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {userQuery?.data?.username}
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: theme === "light" ? "gray" : "whitesmoke",
          }}
        >
          Your monthly balance
        </Text>
        {!expenses.isLoading && !incomes.isLoading && (
          <Text
            style={{
              color: theme === "light" ? Colors.black : "white",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {(totalIncomes() - totalExpenses()).toFixed(1)} Є
          </Text>
        )}
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: 2,
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            marginTop: 6,
            color: theme === "light" ? Colors.black : "whitesmoke",
          }}
        >
          {formattedDate}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: 5,
            marginTop: 6,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <StateSelecter
              handleMoveCarousel={handleMoveCarousel}
              index={index}
            />
          </View>
          <Pressable
            style={{
              padding: 10,
              backgroundColor: "transparent",
              borderRadius: 30,
            }}
            onPress={() => setSideMenu(true)}
          >
            <AntDesign size={20} name="menu-fold" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
