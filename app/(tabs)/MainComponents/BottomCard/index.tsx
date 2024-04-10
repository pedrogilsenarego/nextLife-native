import useBusinesses from "@/hooks/useBusinesses";
import Form from "./Form";

const BottomCard = () => {
  const business = useBusinesses();
  const listBusiness = business?.data?.map((business) => {
    const list = {
      label: business.businessName,
      value: business.id,
    };
    return list;
  });

  return business.isError || business.isFetching || !listBusiness ? (
    <></>
  ) : (
    <Form listBusiness={listBusiness} />
  );
};

export default BottomCard;
