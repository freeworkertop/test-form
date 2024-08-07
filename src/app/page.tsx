import Image from "next/image";
import { TestFormDemo } from "./_components/formComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-deep-blue p-24">
      <TestFormDemo title="Pledge Your Salawat" />
    </main>
  );
}
