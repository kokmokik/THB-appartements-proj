import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Seite nicht gefunden</h2>
      <p className="text-muted mb-8 max-w-md mx-auto">
        Die von Ihnen gesuchte Seite existiert leider nicht. Vielleicht finden Sie auf unserer Startseite, was Sie suchen.
      </p>
      <Link href="/">
        <Button>Zur Startseite</Button>
      </Link>
    </Container>
  );
}
