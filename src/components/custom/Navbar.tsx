import Link from "next/link"; // Import the Link component
import GlobeSVG from "../../../public/icons/GlobeSVG";
import HomeSVG from "../../../public/icons/HomeSVG";
import ChartSVG from "../../../public/icons/ChartSVG";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <div className="shadow-md bg-background z-50 fixed top-0 w-full flex gap-6 flex-wrap items-center justify-center pb-5 pt-3 shadow-md">
      <Link
        href="/"
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      >
        <HomeSVG />
        Home
      </Link>
      <Link
        href="/stats"
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      >
        <ChartSVG />
        Stats
      </Link>
      <Link
        href="/teams"
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      >
        <GlobeSVG />
        Teams
      </Link>
      <ModeToggle />
    </div>
  );
}
