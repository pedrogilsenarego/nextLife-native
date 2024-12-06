import useMetrics from "@/hooks/useMetrics";
import useUser from "@/hooks/useUser";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Dimensions, Pressable } from "react-native";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import { dateRangeLabel } from "@/mappers/dateRange";
import { useApp } from "@/providers/AppProvider";
import { useMemo } from "react";
import Skeleton from "@/components/Atoms/Skeleton";
import DateCalendar from "./DateCalendar/DateCalendar";

type Props = {
  setSideMenu: (sideMenu: boolean) => void;
  setSideLeftMenu: (sideMenu: boolean) => void;
};

const Header = ({ setSideMenu, setSideLeftMenu }: Props) => {
  const { mainColor } = useTheme();
  const userQuery = useUser();
  const expenses = useExpenses();
  const incomes = useIncomes();
  const { dateRange } = useApp();
  const { totalExpenses, totalIncomes } = useMetrics();

  const width = Dimensions.get("screen").width;
  const loading = expenses.isLoading || incomes.isLoading;
  const balance = useMemo(() => {
    return (totalIncomes() - totalExpenses()).toFixed(0);
  }, [totalIncomes, totalExpenses]);

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        paddingHorizontal: 4,
        paddingVertical: 4,
        marginHorizontal: 10,

        backgroundColor: mainColor,
        borderRadius: 7,
        width: width - 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },

        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          columnGap: 6,
          justifyContent: "space-between",
        }}
      >
        <Pressable
          onPress={() => setSideLeftMenu(true)}
          style={{
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            justifyContent: "center",

            zIndex: 10,
            backgroundColor: mainColor,
          }}
        >
          <Ionicons size={25} name="chevron-back" color={Colors.pearlWhite} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <View style={{ rowGap: 2 }}>
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
            </View>
            <DateCalendar />
          </View>
          {!loading ? (
            <View>
              <Text
                style={{
                  fontSize: 12,
                  color: "whitesmoke",
                }}
              >
                Your {dateRangeLabel(dateRange)} balance
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {balance}
                <Text style={{ fontSize: 14 }}>Є</Text>
              </Text>
            </View>
          ) : (
            <Skeleton
              height={39}
              style={{
                marginTop: 2,
                backgroundColor: `${Colors.pearlWhite}66`,
              }}
              width={90}
            />
          )}
        </View>
        <Pressable
          onPress={() => setSideMenu(true)}
          style={{
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
            justifyContent: "center",

            zIndex: 10,
            backgroundColor: mainColor,
          }}
        >
          <Ionicons
            size={25}
            name="chevron-forward"
            color={Colors.pearlWhite}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
