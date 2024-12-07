import { LoginForm } from "@/features/login";
import { LoginProvider } from "@/features/login/LoginContext";

const Login = () => {
  return (
    <LoginProvider>
      <LoginForm />
    </LoginProvider>
  );
};

export default Login;
