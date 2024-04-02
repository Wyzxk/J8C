import { useEffect, useState } from "react";
import { getPelotones } from "../Api/Pelotones";
import { getMiembros, putMiembros } from "../Api/Miembros";
import { Link, useNavigate } from "react-router-dom";
import { getRangos } from "../Api/Rangos";

export function TablaMiembros() {
  const [miembrosTabla, setMiembrosTabla] = useState([]);
  const [rangos, setRangos] = useState([]);
  const [pelotones, setPelotones] = useState([]);
  const [buscador, setBuscador] = useState("");
  const [mark, setMark] = useState("True");
  const navigate = useNavigate();

  // Obtiene los datos de la tabla Miembros,Rangos, Pelotones y los guarda en el estado de ->
  // miembrosTabla, rangos, pelotones
  useEffect(() => {
    async function gettingMiembros() {
      const response = await getMiembros();
      setMiembrosTabla(response.data);
    }
    async function gettingRangos() {
      const responseRangos = await getRangos();
      setRangos(responseRangos.data);
    }
    gettingPelotones();
    async function gettingPelotones() {
      const responsePelotones = await getPelotones();
      setPelotones(responsePelotones.data);
    }
    gettingRangos();
    gettingPelotones();
    gettingMiembros();
  }, [mark]);

  // Función para cambiar el estado 'mark' entre "True" y "False"
  const ver = () => {
    mark === "True" ? setMark("False") : setMark("True");
  };

  // Función para filtrar y mostrar solo los miembros activos
  const activos = () => {
    getMiembros().then((response) => {
      const data = response.data;
      setMiembrosTabla(data.filter((miembros) => miembros.activo === "True"));
    });
  };

  // Función para filtrar y mostrar solo los miembros inactivos
  const inactivos = () => {
    getMiembros().then((response) => {
      const data = response.data;
      setMiembrosTabla(data.filter((miembros) => miembros.activo === "False"));
    });
  };

  // Función para manejar el cambio en el término de búsqueda
  const buscadorInp = (e) => {
    setBuscador(e.target.value);
  };

  // Muestra los datos por busqueda del nombre (miembros)
  const results = !buscador
    ? miembrosTabla
    : miembrosTabla.filter((miembros) =>
        miembros.nombreM.toLowerCase().includes(buscador.toLowerCase())
      );

  return (
    <>
      <div className="container mx-auto lg:max-w-4xl flex justify-end">
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-end w-full lg:w-auto mb-2 lg:mb-0 ">
            {" "}
            <button onClick={ver} className="p-2 mb-2 lg:mb-0 lg:mr-2">
              Todo
            </button>
            <button onClick={activos} className="p-2 mb-2 lg:mb-0 lg:mr-2">
              Activos
            </button>
            <button onClick={inactivos} className="p-2 lg:mb-0">
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
          <th class="text-left py-3 px-2 rounded-l-lg text-green-700">
            Nombre del miembro
          </th>
          <th class="text-left py-3 px-2 text-green-700">Apellido</th>
          <th class="text-left py-3 px-2 text-green-700">Edad</th>
          <th class="text-left py-3 px-2 text-green-700">Dirección</th>
          <th class="text-left py-3 px-2 text-green-700">Teléfono</th>
          <th class="text-left py-3 px-2 text-green-700">Correo</th>

          <th class="text-left py-3 px-2 text-green-700">Rango</th>
          <th class="text-left py-3 px-2 text-green-700">Peloton</th>

          <th class="text-left py-3 px-2 text-green-700">Estado</th>
          <th class="text-left py-3 px-2 rounded-r-lg text-green-700">
            Acciones
          </th>
        </thead>
        {miembrosTabla[0] ? (
          <>
            {results.map((miembrosTabla) => (
              <tr class="{index !== rangoTabla.length - 1 ? 'border-b border-black' : ''}">
                <td class="py-3 px-2 border border-black">
                  <div class="inline-flex space-x-3 items-center">
                    <span>
                      <img
                        class="rounded-full w-8 h-8"
                        src={miembrosTabla.fotoM}
                        alt=""
                      />
                    </span>
                    <span>{miembrosTabla.nombreM}</span>
                  </div>
                </td>
                <td class="py-3 px-2 border border-black">
                  {miembrosTabla.apellidosM}
                </td>
                <td class="py-3 px-2 border border-black">
                  {miembrosTabla.edadM}
                </td>
                <td class="py-3 px-2 border border-black">
                  {miembrosTabla.direcciónM}
                </td>{" "}
                <td class="py-3 px-2 border border-black">
                  {miembrosTabla.telefonoM}
                </td>{" "}
                <td class="py-3 px-2 border border-black">
                  {miembrosTabla.correoM}
                </td>{" "}
                <td class="py-3 px-2 border border-black">
                  {(miembrosTabla.rango &&
                    rangos.find(
                      (rango) =>
                        parseInt(rango.idRango) ===
                        parseInt(miembrosTabla.rango)
                    )?.nombreRango) ||
                    "Rango no encontrado"}
                </td>
                <td class="py-3 px-2 border border-black">
                  {(miembrosTabla.peloton &&
                    pelotones.find(
                      (peloton) =>
                        parseInt(peloton.idPeloton) ===
                        parseInt(miembrosTabla.peloton)
                    )?.nombreP) ||
                    "Rango no encontrado"}
                </td>
                <td class="py-3 px-2 border border-black">
                  {miembrosTabla.activo === "True" ? (
                    <>Activo</>
                  ) : (
                    <>Inactivo</>
                  )}
                </td>
                <td class="py-3 px-2 border border-black">
                  <div class="inline-flex items-center space-x-3">
                    <Link
                      className="hover:text-white"
                      to={`/miembros/${miembrosTabla.idMiembro}`}
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
                      value={miembrosTabla.idMiembro}
                      onClick={(e) => {
                        const data = {
                          idMiembro: e.currentTarget.value,
                          activo: "True",
                        };
                        putMiembros(data);
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
                      value={miembrosTabla.idMiembro}
                      onClick={(e) => {
                        const data = {
                          idMiembro: e.currentTarget.value,
                          activo: "False",
                        };
                        putMiembros(data);
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
