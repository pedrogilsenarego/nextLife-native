import Button from "@/components/button/ButtonComponent";

import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import { useState } from "react";
import { DeleteBusiness } from "./DeleteBusiness";
import React from "react";
import { Text, View } from "react-native";
import { Container } from "@/components/Atoms/Container";
import useBusinessesInvestmentParcels from "@/hooks/useBusinessesInvestmentParcels";
import { listPerDay } from "@/utils/dateFormat";
import { useApp } from "@/providers/AppProvider";
import useMetrics from "@/hooks/useMetrics";
import { formatAmount } from "@/utils/money";
import { Divider } from "@/components/Atoms/Divider";

type Props = {
  businessId: string;
  businessName: string;
  businessType: number;
  selectedBusiness: string;
};

export const Settings: React.FC<Props> = ({
  businessId,
  businessName,
  businessType,
  selectedBusiness,
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const {
    expensesTotalPerDay,
    expensesTotalPerMonth,
    incomesTotalPerMonth,
    incomesTotalPerDay,
  } = useMetrics({ businessSelected: selectedBusiness });

  const { dateRange } = useApp();

  const isQueryEnabled = businessType === 2;
  const businessInvestmentParcels = useBusinessesInvestmentParcels({
    businessId,
    enabled: isQueryEnabled,
  });
  const total = businessInvestmentParcels.data?.reduce(
    (acc, value) => acc + value.amount,
    0
  );

  const expensesPerDay = listPerDay.includes(dateRange)
    ? expensesTotalPerDay()
    : expensesTotalPerMonth();
  const incomesPerDay = listPerDay.includes(dateRange)
    ? incomesTotalPerDay()
    : incomesTotalPerMonth();

  const totalExpenses = expensesPerDay
    .reduce((acc, value) => acc + value.value, 0)
    .toFixed(0);

  const totalIncomes = incomesPerDay
    .reduce((acc, value) => acc + value.value, 0)
    .toFixed(0);

  const totalDifference = parseInt(totalIncomes) - parseInt(totalExpenses);

  return (
    <>
      {isQueryEnabled && (
        <Container containerStyles={{ flexDirection: "column" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              borderWidth: 1,
              borderColor: "transparent",
            }}
          >
            <Text style={{ fontWeight: 600 }}>Yield Evaluation</Text>
          </View>
          <Divider style={{ marginTop: 10, marginBottom: 5 }} />
          {businessInvestmentParcels.data?.map((investment, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text style={{ textTransform: "capitalize" }}>
                  {investment.description}
                </Text>
                <Text>{investment.amount}</Text>
              </View>
            );
          })}
          <Divider style={{ marginTop: 5, marginBottom: 5 }} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text>Total Investment</Text>
            <Text>{total}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginTop: 22,
            }}
          >
            <Text style={{ fontWeight: 600 }}>Yield</Text>
            <Text style={{ fontWeight: 600 }}>
              {formatAmount(
                (
                  (((totalDifference / expensesPerDay.length) * 12) / total) *
                  100
                ).toString()
              )}{" "}
              %
            </Text>
          </View>
        </Container>
      )}
      <Button
        variant="danger"
        label="Delete business"
        onPress={() => setOpenDeleteModal(true)}
      />
      <BottomPopup
        openModal={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      >
        <BottomPopupContent>
          <DeleteBusiness businessId={businessId} businessName={businessName} />
        </BottomPopupContent>
      </BottomPopup>
    </>
  );
};
