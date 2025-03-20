import Welcome from "@/components/Welcome";
import utils from "@/styles/Utils.module.css"

export default async function Page() {
  return (
    <main className={utils.main}>
      <Welcome/>
    </main>
  );
}
