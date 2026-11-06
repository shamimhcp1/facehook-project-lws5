import { Header } from "../components/Header";
import { useAuth } from "../hooks/useAuth";

export const HomePage = () => {
  const { auth } = useAuth();
  console.log("home page", auth);
  return (
    <>
      <p>Home Page</p>
    </>
  );
};
