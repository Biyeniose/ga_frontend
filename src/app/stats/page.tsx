import TableComponent from "@/components/custom/tables/TableComponent";

export default function StatsPage() {
  const url =
    "https://c1ac-142-188-229-219.ngrok-free.app/v1/players/most_ga/topleagues?max_age=23";

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 px-8 pt-20 pb-14 font-[family-name:var(--font-geist-sans)]">
      <div className="top-0 flex flex-col items-center space-y-2 py-4">
        <h1 className="text-3xl font-bold">Stats Page</h1>
        <h3 className="text-3xl font-bold">Top U-23 G/A</h3>

        <div className="font-[family-name:var(--font-geist-mono)]">
          <TableComponent api_url={url} />
        </div>
      </div>
    </div>
  );
}
