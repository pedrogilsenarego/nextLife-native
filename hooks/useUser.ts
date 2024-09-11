import { getUserData } from "@/actions/userActions";
import { queryKeys } from "@/constants/queryKeys";
import { UserQuery } from "@/types/userTypes";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const userQuery = useQuery<UserQuery, Error>({
    queryKey: [queryKeys.user],
    queryFn: getUserData,
  });

  return userQuery;
};

export default useUser;
