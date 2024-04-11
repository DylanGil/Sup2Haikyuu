import Image from "next/image";
import SignUpForm from "../components/signup-form";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between px-3 py-24 sm:p-24">
      <SignUpForm />
    </main>
  );
}
