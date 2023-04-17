import { useAuthCtx } from "state/auth/auth.state";

const SignUpPage = () => {
  const authState = useAuthCtx();
  return <div>Sign Up</div>;
};
export default SignUpPage;
