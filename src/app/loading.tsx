import Container from "@/components/ui/Container";
import Spinner from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <Container className="py-24 flex justify-center">
      <Spinner className="h-10 w-10" />
    </Container>
  );
}
