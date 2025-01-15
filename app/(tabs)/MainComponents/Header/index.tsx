import useMetrics from "@/hooks/useMetrics";
import useUser from "@/hooks/useUser";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Dimensions, Pressable } from "react-native";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import { useMemo } from "react";
import Skeleton from "@/components/Atoms/Skeleton";
import DateCalendar from "./DateCalendar/DateCalendar";
import { formatAmount } from "@/utils/money";
import { BlurView } from "expo-blur";

type Props = {
  setSideMenu: (sideMenu: boolean) => void;
  setSideLeftMenu: (sideMenu: boolean) => void;
};

const Header = ({ setSideMenu, setSideLeftMenu }: Props) => {
  const userQuery = useUser();
  const expenses = useExpenses();
  const incomes = useIncomes();
  const { totalExpenses, totalIncomes } = useMetrics();

  const width = Dimensions.get("screen").width;
  const loading = expenses.isLoading || incomes.isLoading;
  const balance = useMemo(() => {
    return (totalIncomes() - totalExpenses()).toFixed(0);
  }, [totalIncomes, totalExpenses]);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 8,

        marginHorizontal: 0,

        width,
      }}
    >
      <View
        style={{
          flexDirection: "column",
        }}
      >
        {!loading ? (
          <Text
            style={{
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {userQuery?.data?.username}
            {" - "}
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              {formatAmount(balance)}
              <Text style={{ fontSize: 12 }}>Є</Text>
            </Text>
          </Text>
        ) : (
          <Skeleton
            height={18}
            style={{
              marginTop: 3.8,
              backgroundColor: `${Colors.pearlWhite}66`,
            }}
            width={130}
          />
        )}

        <DateCalendar />
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",

          columnGap: 4,
        }}
      >
        <Pressable onPress={() => setSideLeftMenu(true)}>
          <BlurView
            intensity={50}
            style={{ padding: 8, overflow: "hidden", borderRadius: 6 }}
          >
            <Ionicons size={20} name="menu" color={Colors.white} />
          </BlurView>
        </Pressable>
        <Pressable onPress={() => setSideMenu(true)}>
          <BlurView
            intensity={50}
            style={{ padding: 8, overflow: "hidden", borderRadius: 6 }}
          >
            <Ionicons size={20} name="settings" color={Colors.white} />
          </BlurView>
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
