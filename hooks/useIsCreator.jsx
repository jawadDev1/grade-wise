import { useSession } from "next-auth/react";
import React from "react";

const useIsCreator = (id) => {
  const { data } = useSession();

  return data?.user.id == id;
};

export default useIsCreator;
