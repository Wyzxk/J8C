import { useEffect, useState } from "react";
import { postRangos } from "../Api/Rangos";
import { useNavigate, useParams } from "react-router-dom";
import { idgetRangos, putRangos } from "../Api/Rangos";

function PagRangos() {
  // Estado para almacenar los datos del formulario
  const [dataForm, setDataForm] = useState({});
  const [act, setAct] = useState("True");
  const params = useParams();
  const navigate = useNavigate();
  // Recupera los datos si existe un id en la url
  useEffect(() => {
    if (params.id) {
      idgetRangos(params.id)
        .then((response) => {
          console.log(response.data);
          setDataForm(response.data);
          setAct(response.data[4]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // Función para manejar el cambio en los campos del formulario
  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.checked);
    setDataForm({
      ...dataForm,
      [name]: value,
      idRango: params.id && params.id,
      activo: e.target.checked,
    });
  };

  // Función para manejar el envío del formulario
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(dataForm);
    if (params.id) {
      console.log(dataForm);
      putRangos(dataForm)
        .then((response) => {
          console.log(dataForm);
          console.log(response);
        })
        .catch((error) => {
          console.log(dataForm);
          console.log(error);
        });
    } else {
      // Enviar los datos del formulario al servidor
      postRangos(dataForm)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <div id="content" class="bg-white/10 col-span-9 rounded-lg p-6">
        <div id="24h">
          <>
            <form className="p-4 md:p-5 lg:p-6" onSubmit={onSubmit}>
              <div className="my-3 flex items-center px-3">
                <hr className="w-full border-green-700" />
                <span className="mx-3 text-green-700">Rangos</span>
                <hr className="w-full border-green-700" />
              </div>

              <div className="grid gap-y-3">
                <input
                  defaultValue={dataForm[1]}
                  onChange={onChange}
                  name="nombreRango"
                  className="focus:border-green-400 rounded-md border border-green-700 bg-transparent py-3 px-4 text-green-200 outline-none transition placeholder-text-green-400"
                  placeholder="Nombre del rango"
                />
                <input
                  defaultValue={dataForm[2]}
                  onChange={onChange}
                  name="descripcionRango"
                  className="focus:border-green-400 rounded-md border border-green-700 bg-transparent py-3 px-4 text-green-200 outline-none transition placeholder-text-green-400"
                  placeholder="Experiencia del rango"
                />
                <input
                  defaultValue={dataForm[3]}
                  onChange={onChange}
                  name="desExpRango"
                  className="focus:border-green-400 rounded-md border border-green-700 bg-transparent py-3 px-4 text-green-200 outline-none transition placeholder-text-green-400"
                  placeholder="Experiencia del rango"
                />
                <input
                  type="checkbox"
                  id="choose-me"
                  class="peer hidden"
                  checked={act === "True"}
                  onClick={() => {
                    act === "True" ? (
                      setAct("False")
                    ) : act === "False" ? (
                      setAct("True")
                    ) : (
                      <></>
                    );
                  }}
                  onChange={onChange}
                />
                <label
                  for="choose-me"
                  class={`select-none cursor-pointer rounded-lg border-2 border-green-700
    py-3 px-6 font-bold text-gray-200 transition-colors duration-200 ease-in-out ${
      act === "True"
        ? "bg-green-900 text-gray-900 border-green-900"
        : "select-none cursor-pointer rounded-lg border-2 border-green-700 py-3 px-6 font-bold text-gray-200  transition-colors duration-200 ease-in-out" // Cambiar el estilo según el estado 'activo'
    }`}
                >
                  {act === "True" ? <>Desactivar</> : <>Activar</>}
                </label>
                <button className="flex items-center justify-center gap-x-2 rounded-md border border-green-700 hover:border-green-500 bg-transparent py-3 px-4 text-green-300 transition hover:text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-envelope"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                    <path d="M1 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h.5a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h.5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H6.707L6 1.293A1 1 0 0 0 5.293 1zm0 1h4.293L6 2.707A1 1 0 0 0 6.707 3H15v10h-.085a1.5 1.5 0 0 0-2.4-.63C11.885 11.223 10.554 10 8 10c-2.555 0-3.886 1.224-4.514 2.37a1.5 1.5 0 0 0-2.4.63H1z" />
                  </svg>
                  Agregar rango
                </button>
              </div>
            </form>
          </>
        </div>
      </div>
    </>
  );
}
export default PagRangos;
