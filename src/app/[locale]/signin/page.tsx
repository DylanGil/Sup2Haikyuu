import Image from "next/image";
import LoginForm from "../components/login-form";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between px-3 py-24 sm:p-24">
      <p>THERE IS NO INTEREST TO SIGN IN</p>
      <LoginForm />
    </main>
  );
}
