import Button from "@/components/button/ButtonComponent";

import { BottomPopup, BottomPopupContent } from "@/components/BottomPopup";
import { useState } from "react";
import { DeleteBusiness } from "./DeleteBusiness";
import React from "react";
import { Text, View } from "react-native";
import { Container } from "@/components/Atoms/Container";
import useBusinessesInvestmentParcels from "@/hooks/useBusinessesInvestmentParcels";

type Props = {
  businessId: string;
  businessName: string;
  businessType: number;
};

export const Settings: React.FC<Props> = ({
  businessId,
  businessName,
  businessType,
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const isQueryEnabled = businessType === 2;
  const businessInvestmentParcels = useBusinessesInvestmentParcels({
    businessId,
    enabled: isQueryEnabled,
  });
  const total = businessInvestmentParcels.data?.reduce(
    (acc, value) => acc + value.amount,
    0
  );

  return (
    <>
      {isQueryEnabled && (
        <Container containerStyles={{ flexDirection: "column" }}>
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
                <Text>{investment.description}</Text>
                <Text>{investment.amount}</Text>
              </View>
            );
          })}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text>Total</Text>
            <Text>{total}</Text>
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
