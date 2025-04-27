import { v4 as uuidV4 } from "uuid";

const generateGuestCredentials = () => {
  const guid = uuidV4();
  const firstName = `Guest@${guid}`;
  const email = `guest-${guid}example.com`;
  const password = `Guest@${Math.random().toString(36).slice(-8)}`;
  return {
    email,
    password,
    firstName,
    lastName: "User",
  };
};

export { generateGuestCredentials };
