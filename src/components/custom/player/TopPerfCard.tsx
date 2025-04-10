export default function TopPerfCard() {
  return (
    <div className="grid grid-cols-1 gap-1">
      {/* First row */}
      <div className="border flex lg:w-150 md:w-120">
        <div className="grid grid-cols-1">
          <p>FA Cup - 04/01/2025</p>

          <div className="grid grid-cols-2 gap-1">
            <div className="col-span-1">
              <div className="grid grid-cols-1">
                <p>Mancity - logo</p>
                <p>Bournemouth - logo</p>
              </div>
            </div>

            <div className="col-span-1">
              <div className="grid grid-cols-1">
                <p>Nico OReilly</p>
                <p>2G 12A</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second row */}

      <div className="grid sm:grid-cols-2 md:grid-cols-4 border">
        <div>
          <p className="">xG/xA</p>
          <p>Shots%</p>

          <p>Duels%</p>

          <p>Crosses%</p>
          <p>Fouls</p>

          <p className="hidden lg:block">L.Balls%</p>
        </div>

        <div>
          <p className="mx-2">1.56/2.22</p>
          <p>Shots%</p>

          <p>Duels%</p>

          <p>Crosses%</p>
          <p>Fouls</p>

          <p className="hidden lg:block">L.Balls%</p>
        </div>

        <div>
          <p className="">xG/xA</p>
          <p>Shots%</p>

          <p>Duels%</p>

          <p>Crosses%</p>
          <p>Fouls</p>

          <p className="hidden lg:block">L.Balls%</p>
        </div>

        <div>
          <p className="">xG/xA</p>
          <p>Shots%</p>

          <p>Duels%</p>

          <p>Crosses%</p>
          <p>Fouls</p>

          <p className="hidden lg:block">L.Balls%</p>
        </div>
      </div>
    </div>
  );
}
