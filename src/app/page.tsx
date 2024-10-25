import { rate } from "@/lib/discounted-free-cash-flow";

export default async function HomePage() {
  const a = await rate()
  return (
    <div>
      en Page
    </div>
  );
}
