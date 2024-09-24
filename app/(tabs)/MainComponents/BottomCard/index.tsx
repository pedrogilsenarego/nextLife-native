import useBusinesses from "@/hooks/useBusinesses";
import Form from "./Form";
import { View, Text } from "react-native";
import { useTheme } from "@/providers/ThemeContext";

const BottomCard = () => {
  const business = useBusinesses();
  const { theme, mainColor } = useTheme();
  const listBusiness = business?.data?.map((business) => {
    const list = {
      label: business.businessName,
      value: business.id,
    };
    return list;
  });

  if (business.isError || business.isFetching || !listBusiness) return;

  return (
    <View
      style={{
        alignItems: "center",

        width: "100%",
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginTop: 10,
          color: mainColor,
        }}
      >
        New Entry
      </Text>
      {(business.data?.length || 0) < 1 ? (
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              textAlign: "center",
              color: "gray",
              marginTop: 20,

              paddingTop: 10,
              lineHeight: 20,
            }}
          >
            To start adding entries you need to have at least one{" "}
            <Text style={{ fontWeight: 800 }}>Business</Text>, the entries can
            either be expenses or incomes can be added to only one{" "}
            <Text style={{ fontWeight: 800 }}>Business</Text>.
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "gray",
              paddingTop: 10,
              paddingBottom: 20,

              lineHeight: 20,
            }}
          >
            The entries will have multiple options that can be chosen, also
            beside the <Text style={{ fontWeight: 800 }}>Business</Text>, this
            can be linked to a <Text style={{ fontWeight: 800 }}>Deposit</Text>{" "}
            which allows to keep a better tracking of your finances portfolio.
          </Text>
        </View>
      ) : (
        <Form listBusiness={listBusiness} />
      )}
    </View>
  );
};

export default BottomCard;
