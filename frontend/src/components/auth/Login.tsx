import { useSession, signIn, signOut } from "next-auth/react";
import Button from "../common/Button";
const Login = () => {
  const { data: session } = useSession();

  return (
    <>
      {!session ? (
        <Button onClick={() => signIn("google")}>Sign in with Google</Button>
      ) : (
        <div>
          <p>Welcome, {session?.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
    </>
  );
};

export default Login;
