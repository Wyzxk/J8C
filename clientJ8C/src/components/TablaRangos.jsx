import { useEffect, useState } from "react";
import { getRangos } from "../Api/Rangos";
import { Link, useNavigate } from "react-router-dom";
import { putRangos } from "../Api/Rangos";
export function TablaRangos() {
  const [rangoTabla, setRangoTabla] = useState([]);
  const [buscador, setBuscador] = useState("");
  const [mark, setMark] = useState("True");
  const navigate = useNavigate();

  // Obtiene los datos de la tabla Rango y los guarda en el estado de rangoTabla
  useEffect(() => {
    async function gettingRangos() {
      const response = await getRangos();
      setRangoTabla(response.data);
    }
    gettingRangos();
  }, [mark]);

  // Función para cambiar el estado 'mark' entre "True" y "False"
  const ver = () => {
    mark === "True" ? setMark("False") : setMark("True");
  };

  // Función para filtrar y mostrar solo los rangos activos
  const activos = () => {
    getRangos().then((response) => {
      const data = response.data;
      setRangoTabla(data.filter((rango) => rango.activo === "True"));
    });
  };

  // Función para filtrar y mostrar solo los rangos inactivos
  const inactivos = () => {
    getRangos().then((response) => {
      const data = response.data;
      setRangoTabla(data.filter((rango) => rango.activo === "False"));
    });
  };

  // Función para manejar el cambio en el término de búsqueda
  const buscadorInp = (e) => {
    setBuscador(e.target.value);
  };

  // Muestra los datos por busqueda del nombre (rango)
  const results = !buscador
    ? rangoTabla
    : rangoTabla.filter((rango) =>
        rango.nombreRango.toLowerCase().includes(buscador.toLowerCase())
      );

  return (
    <>
      <div className="container mx-auto lg:max-w-4xl flex justify-end pb-2">
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-end w-full lg:w-auto mb-2 lg:mb-0 ">
            {" "}
            <button onClick={ver} className="p-2 mb-2 lg:mb-0 lg:mr-2">
              {" "}
              Todo
            </button>
            <button onClick={activos} className="p-2 mb-2 lg:mb-0 lg:mr-2">
              {" "}
              Activos
            </button>
            <button onClick={inactivos} className="p-2 lg:mb-0">
              {" "}
              Inactivos
            </button>
          </div>
          <input
            onChange={buscadorInp}
            name="nombreRango"
            className="focus:border-green-400 rounded-md border border-green-700 bg-transparent py-3 px-4 text-green-200 outline-none transition placeholder-text-green-400"
            placeholder="Nombre del rango"
          />
        </div>
      </div>

      <table class="w-full whitespace-nowrap">
        <thead class="bg-black/60">
          <th class="text-left py-3 px-2 rounded-l-lg border border-black rounded-tl-lg text-green-700">
            Rango
          </th>
          <th class="text-left py-3 px-2 border border-black text-green-700">
            Descripción
          </th>
          <th class="text-left py-3 px-2 border border-black text-green-700">
            Experiencia
          </th>
          <th class="text-left py-3 px-2 border border-black text-green-700">
            Estado
          </th>
          <th class="text-left py-3 px-2 rounded-r-lg border border-black rounded-tr-lg text-green-700">
            Acciones
          </th>
        </thead>
        {rangoTabla[0] ? (
          <>
            {results.map((rangoTabla) => (
              <tr class="{index !== rangoTabla.length - 1 ? 'border-b border-black' : ''}">
                <td class="py-3 px-2 border border-black">
                  <div class="inline-flex space-x-3 items-center">
                    <span>{rangoTabla.nombreRango}</span>
                  </div>
                </td>
                <td class="py-3 px-2 border border-black">
                  {rangoTabla.descripcionRango}
                </td>

                <td class="py-3 px-2 border border-black">
                  {rangoTabla.desExpRango}
                </td>
                <td class="py-3 px-2 border border-black">
                  {rangoTabla.activo === "True" ? <>Activo</> : <>Inactivo</>}
                </td>
                <td class="py-3 px-2 border border-black">
                  <div class="inline-flex items-center space-x-3">
                    <Link
                      className="hover:text-white"
                      to={`/rangos/${rangoTabla.idRango}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </Link>
                    <button
                      className="hover:text-white"
                      value={rangoTabla.idRango}
                      onClick={(e) => {
                        const data = {
                          idRango: e.currentTarget.value,
                          activo: "True",
                        };
                        putRangos(data);
                        window.location.reload();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        class="bi bi-check-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                      </svg>
                    </button>
                    <button
                      className="hover:text-white"
                      value={rangoTabla.idRango}
                      onClick={(e) => {
                        const data = {
                          idRango: e.currentTarget.value,
                          activo: "False",
                        };
                        putRangos(data);
                        window.location.reload();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </>
        ) : (
          <>
            <h1>Aún no hay creadas</h1>
          </>
        )}
      </table>
    </>
  );
}
