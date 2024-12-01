import { fetchClient } from "@/utils";

const BASE_URL = "https://localhost:5001/api/users";
const registerUser = async (payload: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}) => {
  return fetchClient(`${BASE_URL}/register`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export { registerUser };
