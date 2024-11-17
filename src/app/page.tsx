"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Container from "./chat/[id]/page";

export default function Home() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  useEffect(() => {
    // Redirect to a new chat if no valid ID is present
    if (!id) {
      const newId = uuidv4();
      router.replace(`/chat/${newId}`);
    }
  }, [id, router]);

  if (!id) return null;

  return <Container params={params} />;
}
