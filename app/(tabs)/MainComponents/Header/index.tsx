import useMetrics from "@/hooks/useMetrics";
import useUser from "@/hooks/useUser";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { View, Text, Dimensions, Pressable } from "react-native";
import { StateSelecter } from "./StateSelecter";
import { SharedValue } from "react-native-reanimated";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import { dateRangeLabel } from "@/mappers/dateRange";
import { useApp } from "@/providers/AppProvider";

type Props = {
  setSideMenu: (sideMenu: boolean) => void;
  setSideLeftMenu: (sideMenu: boolean) => void;
};

export const Header = ({ setSideMenu, setSideLeftMenu }: Props) => {
  const { theme } = useTheme();
  const userQuery = useUser();
  const expenses = useExpenses();
  const incomes = useIncomes();
  const { dateRange } = useApp();
  const currentDate = new Date();
  const monthInLetters = currentDate.toLocaleString("default", {
    month: "long",
  });
  const { totalExpenses, totalIncomes } = useMetrics();
  const formattedDate = `${currentDate.getDate()}, ${monthInLetters} ${currentDate.getFullYear()}`;
  const width = Dimensions.get("screen").width;
  const loading = expenses.isLoading || incomes.isLoading;
  const balance = (totalIncomes() - totalExpenses()).toFixed(1);

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
          Your {dateRangeLabel(dateRange)} balance
        </Text>
        {!loading && (
          <Text
            style={{
              color: theme === "light" ? Colors.black : "white",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {balance} Є
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
          <Pressable
            style={{
              padding: 10,
              backgroundColor: "transparent",
              borderRadius: 30,
            }}
            onPress={() => setSideLeftMenu(true)}
          >
            <Entypo
              size={22}
              name="add-to-list"
              color={theme === "light" ? Colors.black : Colors.lightGray}
            />
          </Pressable>
          <Pressable
            style={{
              padding: 10,
              backgroundColor: "transparent",
              borderRadius: 30,
            }}
            onPress={() => setSideMenu(true)}
          >
            <AntDesign
              size={20}
              name="menu-fold"
              color={theme === "light" ? Colors.black : Colors.lightGray}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
