import { useEffect, useState } from "react";
import { postPelotones } from "../Api/Pelotones";
import { useNavigate, useParams } from "react-router-dom";
import { idgetMiembros, putMiembros, postMiembros } from "../Api/Miembros";
import { getPelotones } from "../Api/Pelotones";
import { getRangos } from "../Api/Rangos";

function PagMiembros() {
  const [rangos, setRangos] = useState({});
  const [imageFile, setImageFile] = useState(null); // Estado para almacenar el archivo de imagen
  const [isUploaded, setIsUploaded] = useState(false);
  const [pelotones, setPelotones] = useState({});
  // Estado para almacenar los datos del formulario
  const [dataForm, setDataForm] = useState({});
  const [act, setAct] = useState("True");
  const params = useParams();
  const navigate = useNavigate();

  // Recupera los datos si existe un id en la url
  useEffect(() => {
    if (params.id) {
      idgetMiembros(params.id)
        .then((response) => {
          console.log(response.data);
          setDataForm(response.data);
          setAct(response.data.activo);
        })
        .catch((error) => {
          console.log(error);
        });
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
  }, []);

  // Función para manejar el cambio en los campos del formulario
  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.checked);
    setDataForm({
      ...dataForm,
      [name]: value,
      activo:
        e.target.checked.toString().charAt(0).toUpperCase() +
        e.target.checked.toString().slice(1),
    });
  };
  const onChangeSelect = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario
  const onSubmit = (e) => {
    e.preventDefault();

    // Crear un nuevo objeto FormData
    const formData = new FormData();

    // Agregar los datos del formulario al formData
    Object.entries(dataForm).forEach(([key, value]) => {
      if (key !== "fotoM") {
        // Excluir el campo de imagen
        formData.append(key, value);
      }
    });

    // Agregar el archivo de imagen al formData, solo si hay un archivo seleccionado
    if (imageFile) {
      formData.append("fotoM", imageFile, imageFile.name);
    }

    if (params.id) {
      putMiembros(formData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      postMiembros(formData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Obtener el primer archivo seleccionado
    if (file) {
      // Guardar el archivo en el estado
      setImageFile(file);

      // Crear un objeto URL para mostrar la vista previa de la imagen (opcional)
      const imageUrl = URL.createObjectURL(file);
      setDataForm({
        ...dataForm,
        // Agregar el archivo de imagen al objeto dataForm
        fotoM: imageUrl,
      });

      // Mostrar el mensaje de carga exitosa
      setIsUploaded(true);
    }
  };
  return (
    <>
      <div id="content" class="bg-white/10 col-span-9 rounded-lg p-6">
        <div id="24h">
          <>
            <form
              className="p-4 md:p-5 lg:p-6"
              onSubmit={onSubmit}
              enctype="multipart/form-data"
            >
              <div className="my-3 flex items-center px-3">
                <hr className="w-full border-green-700" />
                <span className="mx-3 text-green-700">Miembros</span>
                <hr className="w-full border-green-700" />
              </div>

              <div className="grid gap-y-3">
                <input
                  defaultValue={dataForm.nombreM}
                  onChange={onChange}
                  name="nombreM"
                  maxLength={50}
                  className="focus:border-green-400 rounded-md border border-green-700 bg-transparent py-3 px-4 text-green-200 outline-none transition placeholder-text-green-400"
                  placeholder="Nombre del miembro"
                />
                <input
                  defaultValue={dataForm.apellidosM}
                  onChange={onChange}
                  name="apellidosM"
                  maxLength={50}
                  className="focus:border-green-400 rounded-md border border-green-700 bg-transparent py-3 px-4 text-green-200 outline-none transition placeholder-text-green-400"
                  placeholder="Apellidos del miembro"
                />
                <input
                  defaultValue={dataForm.edadM}
                  onChange={onChange}
                  name="edadM"
                  maxLength={3}
                  className="focus:border-green-400 rounded-md border border-green-700 bg-transparent py-3 px-4 text-green-200 outline-none transition placeholder-text-green-400"
                  placeholder="Edad del miembro"
                />
                <input
                  defaultValue={dataForm.direcciónM}
                  onChange={onChange}
                  name="direcciónM"
                  maxLength={50}
                  className="focus:border-green-400 rounded-md border border-green-700 bg-transparent py-3 px-4 text-green-200 outline-none transition placeholder-text-green-400"
                  placeholder="Dirección del miembro"
                />{" "}
                <input
                  defaultValue={dataForm.telefonoM}
                  onChange={onChange}
                  name="telefonoM"
                  maxLength={15}
                  className="focus:border-green-400 rounded-md border border-green-700 bg-transparent py-3 px-4 text-green-200 outline-none transition placeholder-text-green-400"
                  placeholder="Teléfono del miembro"
                />{" "}
                <input
                  defaultValue={dataForm.correoM}
                  type="email"
                  onChange={onChange}
                  name="correoM"
                  className="focus:border-green-400 rounded-md border border-green-700 bg-transparent py-3 px-4 text-green-200 outline-none transition placeholder-text-green-400"
                  placeholder="Correo Electrónico del miembro"
                />{" "}
                <select
                  value={dataForm.peloton}
                  onChange={onChangeSelect}
                  name="peloton"
                  className="focus:border-green-400 rounded-md border border-green-700 bg-transparent py-3 px-4 text-green-200 outline-none transition placeholder-text-green-400 open:bg-white/10"
                >
                  <option value="" disabled={params.id ? true : false} hidden>
                    Peloton del miembro
                  </option>
                  {Object.keys(pelotones).map((key) => {
                    if (pelotones[key].activo === "True") {
                      return (
                        <option
                          key={pelotones[key].idPeloton}
                          value={pelotones[key].idPeloton}
                          className="bg-black border-black"
                        >
                          {pelotones[key].nombreP}
                        </option>
                      );
                    } else if (pelotones[key].activo === "False") {
                      return (
                        <option
                          key={pelotones[key].idPeloton}
                          value={pelotones[key].idPeloton}
                          className="bg-black border-black"
                        >
                          {pelotones[key].nombreP} (Inactivo)
                        </option>
                      );
                    }
                    return null; // Asegurarse de devolver algo en todos los casos
                  })}
                </select>
                <select
                  value={dataForm.rango}
                  onChange={onChangeSelect}
                  name="rango"
                  className="focus:border-green-400 rounded-md border border-green-700 bg-transparent py-3 px-4 text-green-200 outline-none transition placeholder-text-green-400 open:bg-white/10"
                >
                  <option value="" disabled={params.id ? true : false} hidden>
                    Selecciona un rango
                  </option>
                  {Object.keys(rangos).map((key) => {
                    if (rangos[key].activo === "True") {
                      return (
                        <option
                          key={rangos[key].idRango}
                          value={rangos[key].idRango}
                          className="bg-black border-black"
                        >
                          {rangos[key].nombreRango}
                        </option>
                      );
                    } else if (rangos[key].activo === "False") {
                      return (
                        <option
                          key={rangos[key].idRango}
                          value={rangos[key].idRango}
                          className="bg-black border-black"
                        >
                          {rangos[key].nombreRango} (Inactivo)
                        </option>
                      );
                    }
                    return null; // Asegurarse de devolver algo en todos los casos
                  })}
                </select>
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
                <div className="border border-dashed border-gray-500 relative">
                  <input
                    type="file"
                    multiple
                    className="cursor-pointer relative block opacity-0 w-full h-full p-12 z-50"
                    onChange={handleFileUpload}
                  />
                  {isUploaded ? (
                    <div className="text-center p-10 absolute top-0 right-0 left-0 m-auto">
                      <h4>Se ha subido correctamente la imagen</h4>
                    </div>
                  ) : (
                    <div className="text-center p-10 absolute top-0 right-0 left-0 m-auto">
                      <h4>Subir imagen del miembro</h4>

                      {dataForm.fotoM && (
                        <>
                          <img
                            src={dataForm.fotoM}
                            alt="img"
                            className="w-10 mx-auto"
                          />
                        </>
                      )}
                    </div>
                  )}
                </div>
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
                  Agregar miembro
                </button>
              </div>
            </form>
          </>
        </div>
      </div>
    </>
  );
}
export default PagMiembros;
