//import { TableComponent } from "@/components/custom/tables/TableComponent";
import TableComponent from "@/components/custom/tables/TableComponent";

export default function Home() {
  const url =
    "https://a0d1-142-188-229-219.ngrok-free.app/v1/players/most_ga/topleagues";

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 px-8 pt-20 pb-14 font-[family-name:var(--font-geist-sans)]">
      <main className="top-0 flex flex-col items-center space-y-2 py-4">
        <h1 className="text-3xl font-bold">Goal Archive</h1>
        <div className="font-[family-name:var(--font-geist-mono)]">
          <TableComponent api_url={url} />
        </div>
      </main>
    </div>
  );
}
