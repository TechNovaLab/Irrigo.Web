import SignupForm from "@/features/signup/SignupForm";
import { SignupProvider } from "@/features/signup/SignupContext";

const Signup = () => {
  return (
    <SignupProvider>
      <SignupForm />
    </SignupProvider>
  );
};

export default Signup;
