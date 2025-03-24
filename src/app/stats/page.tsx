import { BDorCard } from "@/components/custom/bdor/BDorCard";
import Naion2Table from "@/components/custom/leagues/Nation2Table";
import { NationsCard } from "@/components/custom/nations/NationsCard";
import TableComponent from "@/components/custom/tables/TableComponent";

export default function StatsPage() {
  const url =
    "https://c1ac-142-188-229-219.ngrok-free.app/v1/players/most_ga/topleagues?max_age=23";
  const nation = "Nigeria";
  const nation_url = `https://c1ac-142-188-229-219.ngrok-free.app/v1/leagues/3/nation2?nation=${nation}`;

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 px-8 pt-20 pb-14 font-[family-name:var(--font-geist-sans)]">
      <div className="top-0 flex flex-col items-center space-y-2 py-4">
        <h1 className="text-3xl font-bold">Stats Page</h1>
        <h3 className="text-3xl font-bold">Top U-23 G/A</h3>

        <NationsCard />

        <BDorCard />

        <div className="font-[family-name:var(--font-geist-mono)]">
          <Naion2Table api_url={nation_url} />
          <TableComponent api_url={url} />
        </div>
      </div>
    </div>
  );
}
