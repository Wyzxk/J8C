import { TablaRangos } from "../components/TablaRangos";
import { TablaMiembros } from "../components/TablaMiembros";
import { TablaPelotones } from "../components/TablaPelotones";
import { useEffect, useState } from "react";

function Home() {
  const [tabla, setTabla] = useState("Miembros");

  // Recupera el localstorage para mostrar la página en la que estaba
  useEffect(() => {
    setTabla(localStorage.getItem("page"));
  }, []);
  // Cambia el nombre de la tabla para mostrar la tabla que es por pantalla
  const cambiarTabla = (nTabla) => {
    localStorage.setItem("page", nTabla);
    setTabla(nTabla);
    console.log(tabla);
  };
  return (
    <>
      <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
        <div id="24h" className="pb-4">
          <h1 className="font-bold py-4 uppercase text-green-600">
            Estadísticas
          </h1>
          <div
            id="stats"
            className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div
              className="bg-black/60 to-white/5 p-6 rounded-lg cursor-pointer hover:bg-gray-800"
              onClick={() => cambiarTabla("Miembros")}
            >
              <div className="flex flex-row space-x-4 items-center">
                <div id="stats-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-10 h-10 text-green-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-green-500 text-sm font-medium uppercase leading-4">
                    Miembros
                  </p>
                  <p className="text-green-700 font-bold text-2xl inline-flex items-center space-x-2">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                        />
                      </svg>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div
              className="bg-black/60 p-6 rounded-lg cursor-pointer hover:bg-gray-800"
              onClick={() => cambiarTabla("Pelotones")}
            >
              <div className="flex flex-row space-x-4 items-center">
                <div id="stats-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 18"
                    strokeWidth="1"
                    stroke="currentColor"
                    className="w-12 h-12 text-green-700"
                  >
                    <path d="M5.793 1a1 1 0 0 1 1.414 0l.647.646a.5.5 0 1 1-.708.708L6.5 1.707 2 6.207V12.5a.5.5 0 0 0 .5.5.5.5 0 0 1 0 1A1.5 1.5 0 0 1 1 12.5V7.207l-.146.147a.5.5 0 0 1-.708-.708zm3 1a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708zm.707.707L5 7.207V13.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V7.207z" />
                  </svg>
                </div>
                <div>
                  <p className="text-green-500 text-sm font-medium uppercase leading-4">
                    Pelotones
                  </p>
                  <p className="text-green-700 font-bold text-2xl inline-flex items-center space-x-2">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-green-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                        />
                      </svg>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div
              className="bg-black/60 p-6 rounded-lg cursor-pointer hover:bg-gray-800"
              onClick={() => cambiarTabla("Rangos")}
            >
              <div className="flex flex-row space-x-4 items-center">
                <div id="stats-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 18"
                    strokeWidth="1"
                    stroke="currentColor"
                    className="w-10 h-10 text-green-700"
                  >
                    <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                    <path d="M1 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h.5a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h.5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H6.707L6 1.293A1 1 0 0 0 5.293 1zm0 1h4.293L6 2.707A1 1 0 0 0 6.707 3H15v10h-.085a1.5 1.5 0 0 0-2.4-.63C11.885 11.223 10.554 10 8 10c-2.555 0-3.886 1.224-4.514 2.37a1.5 1.5 0 0 0-2.4.63H1z" />
                  </svg>
                </div>
                <div>
                  <p className="text-green-500 text-sm font-medium uppercase leading-4">
                    Rangos
                  </p>
                  <p className="text-green-700 font-bold text-2xl inline-flex items-center space-x-2">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-green-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                        />
                      </svg>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* hola */}

        <div className="overflow-x-scroll">
          {tabla === "Miembros" ? (
            <TablaMiembros />
          ) : tabla === "Pelotones" ? (
            <TablaPelotones />
          ) : tabla === "Rangos" ? (
            <TablaRangos />
          ) : (
            <>
              <h1>No se ha escogido una tabla</h1>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Home;
