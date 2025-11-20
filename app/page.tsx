"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/chat");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-4xl mb-4">💼</div>
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          Bea's Resume Chatbot
        </h1>
        <p className="text-gray-600">Redirecting to chat...</p>
      </div>
    </div>
  );
}
