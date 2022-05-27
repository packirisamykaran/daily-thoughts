import { useState } from "react";

export default function useUserLoggedin() {
  const [user, setUser] = useState<string>("");

  return {user, setUser};
}
