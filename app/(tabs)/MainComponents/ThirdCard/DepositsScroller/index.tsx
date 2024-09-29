import useDeposits from "@/hooks/useDeposits";
import { Colors, useTheme } from "@/providers/ThemeContext";
import { Deposit } from "@/types/depositTypes";
import { View, Text, ScrollView, Pressable, Dimensions } from "react-native";
import { AddDeposit } from "../AddDeposit";
import { BlurView } from "expo-blur";
import { useSelectedDeposit } from "../DepositsContext";
import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import DepositContent from "../DepositContent";
import { defaultDeposits } from "@/constants/defaultDeposits";
import Skeleton from "@/components/Atoms/Skeleton";

export const DepositsScroller: React.FC = () => {
  const { selectedDeposit, setSelectedDeposit } = useSelectedDeposit();
  const deposits = useDeposits();
  const { mainColor } = useTheme();
  const firstDeposit =
    !!((deposits?.data?.length || 0) < 1) && !deposits.isLoading;

  const DepositItem = ({
    deposit,
    loading,
  }: {
    deposit?: Deposit;
    loading?: boolean;
  }) => {
    return (
      <BlurView
        intensity={5}
        style={{
          height: 100,
          width: 200,
        }}
      >
        <Pressable
          style={{
            shadowOpacity: 0.1,
            shadowOffset: { width: 1, height: 1 },
            shadowRadius: 1,
            elevation: 1,
          }}
          onPress={deposit ? () => setSelectedDeposit(deposit.id) : null}
        >
          <View
            style={{
              height: "100%",
              display: "flex",
              backgroundColor: `${mainColor}0D`,
              justifyContent: "space-between",
              alignItems: "flex-start",
              borderRadius: 8,
              padding: 15,
            }}
          >
            {loading ? (
              <Skeleton style={{ marginTop: 1.5 }} height={15 * 1.1} />
            ) : (
              <Text
                style={{
                  textAlign: "left",
                  color: Colors.black,
                  fontSize: 15,
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {deposit?.depositName}
              </Text>
            )}

            <View>
              {loading ? (
                <Skeleton style={{ marginTop: 1.8 }} height={18 * 1.1} />
              ) : (
                <Text
                  style={{
                    color: mainColor,
                    fontSize: 18,
                    fontWeight: "700",
                  }}
                >
                  {deposit?.amount.toFixed(0)}
                  <Text style={{ fontSize: 14 }}>€</Text>
                </Text>
              )}
              {loading ? (
                <Skeleton style={{ marginTop: 2.6 }} height={13} width={70} />
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    color: "gray",
                    marginTop: -3,
                    fontSize: 13,
                  }}
                >
                  {
                    defaultDeposits.find(
                      (depositI) => depositI.value === deposit?.depositType
                    )?.label
                  }
                </Text>
              )}
            </View>
          </View>
        </Pressable>
      </BlurView>
    );
  };

  if (!deposits.data) return null;

  return (
    <>
      <View
        style={{
          paddingVertical: 4,
        }}
      >
        {firstDeposit ? (
          <View
            style={{
              justifyContent: "center",
              borderWidth: 1,
              borderRadius: 6,
              overflow: "visible",
              borderColor: Colors.lightGray,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "gray",
                paddingTop: 10,
                paddingHorizontal: 6,

                lineHeight: 20,
              }}
            >
              This are typicaly used for{" "}
              <Text style={{ fontWeight: 800 }}>Bank</Text> or{" "}
              <Text style={{ fontWeight: 800 }}>Cash</Text>, and can be related
              to the <Text style={{ fontWeight: 800 }}>Businesses</Text>,{" "}
              <Text style={{ fontWeight: 800 }}>Expenses</Text> or{" "}
              <Text style={{ fontWeight: 800 }}>Incomes</Text>.
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "gray",
                paddingTop: 10,
                paddingHorizontal: 6,
                paddingBottom: 20,

                lineHeight: 20,
              }}
            >
              They help track the money available.
            </Text>
            <AddDeposit />
          </View>
        ) : (
          <ScrollView
            horizontal
            contentContainerStyle={{
              flexDirection: "row",
              columnGap: 10,
            }}
            scrollEnabled
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
          >
            {deposits.isLoading ? (
              <>
                <DepositItem loading />
                <DepositItem loading />
              </>
            ) : (
              <>
                {deposits?.data.map((deposit, index) => {
                  return <DepositItem deposit={deposit} key={deposit.id} />;
                })}
              </>
            )}
            {!deposits?.isLoading && <AddDeposit />}
          </ScrollView>
        )}
      </View>
      <BottomPopup
        openModal={!!selectedDeposit}
        onClose={() => setSelectedDeposit(null)}
      >
        <BottomPopupContent>
          <DepositContent />
        </BottomPopupContent>
      </BottomPopup>
    </>
  );
};
