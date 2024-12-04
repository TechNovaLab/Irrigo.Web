import { fetchClient } from "@/utils";

type request = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

const BASE_URL = "https://localhost:5001/api/users";
const registerUser = async (payload: request) => {
  return fetchClient(`${BASE_URL}/register`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export { registerUser };
