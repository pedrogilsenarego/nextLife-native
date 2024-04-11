import { View } from "react-native";

const BarChart = () => {
  const data = [
    { name: "teste", percentage: 50 },
    { name: "teste", percentage: 12 },
    { name: "teste", percentage: 32 },
    { name: "teste", percentage: 78 },
    { name: "teste", percentage: 50 },
    { name: "teste", percentage: 90 },
    { name: "teste", percentage: 45 },
    { name: "teste", percentage: 90 },
    { name: "teste", percentage: 45 },
  ];

  return (
    <View
      style={{
        borderWidth: 2,

        height: 200,
        width: "100%",
        flexDirection: "row",

        justifyContent: "space-around",
      }}
    >
      {data.map((item, index) => {
        return (
          <View
            style={{
              height: "100%",
              position: "relative",
              backgroundColor: "#ffffff66",
              borderRadius: 20,
              overflow: "hidden",
              width: 20,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                height: `${item.percentage}%`,
                borderRadius: 20,
                bottom: 0,
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

export default BarChart;
