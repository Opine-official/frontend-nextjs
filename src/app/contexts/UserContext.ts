import { Dispatch, SetStateAction, createContext } from "react";

type UserContext = {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  refetch: () => void;
  isLoading: boolean;
};

const UserContext = createContext<UserContext>({} as UserContext);

export default UserContext;
