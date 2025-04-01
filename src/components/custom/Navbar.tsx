import Link from "next/link"; // Import the Link component
import GlobeSVG from "../../../public/icons/GlobeSVG";
import HomeSVG from "../../../public/icons/HomeSVG";
import ChartSVG from "../../../public/icons/ChartSVG";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <div className="shadow-md bg-background z-50 fixed top-0 w-full flex items-center justify-between pb-2 pt-2 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-6 flex-wrap px-4">
        {" "}
        {/* Removed justify-start as it is default */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:underline hover:underline-offset-2"
        >
          <HomeSVG />
          Home
        </Link>
        <Link
          href="/stats"
          className="flex items-center gap-2 hover:underline hover:underline-offset-2"
        >
          <ChartSVG />
          Stats
        </Link>
        <Link
          href="/comps"
          className="flex items-center gap-2 hover:underline hover:underline-offset-2"
        >
          <GlobeSVG />
          Comps
        </Link>
      </div>
      <div className="flex items-center px-4">
        {" "}
        {/* Changed items-end to items-center to vertically align with links */}
        <ModeToggle />
      </div>
    </div>
  );
}
