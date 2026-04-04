"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-4xl font-bold text-destructive mb-4">Ein Fehler ist aufgetreten</h1>
      <p className="text-muted mb-8 max-w-md mx-auto">
        Es tut uns leid, etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.
      </p>
      <Button onClick={reset}>Erneut versuchen</Button>
    </Container>
  );
}
