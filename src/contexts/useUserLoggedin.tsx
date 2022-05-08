import { useState } from "react";

export default function useUserLoggedin() {
  const [user, setUser] = useState<string>("r");

  return {user, setUser};
}
