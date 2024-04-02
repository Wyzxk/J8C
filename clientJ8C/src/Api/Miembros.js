import axios from "axios";

// Creación de una instancia de axios con una base URL específica para la API de miembros
const MiembrosApi = axios.create({
  baseURL: "http://127.0.0.1:8000/miembros/",
});

// Función para obtener todos los miembros
export const getMiembros = () => {
  return MiembrosApi.get("/");
};

// Función para obtener un miembro específico por su ID
export const idgetMiembros = (id) => {
  return MiembrosApi.get("/", {
    params: {
      idMiembro: id,
    },
  });
};

// Función para crear un nuevo miembro
export const postMiembros = (data) => {
  return MiembrosApi.post("/", data);
};

// Función para actualizar un miembro existente
export const putMiembros = (data) => {
  return MiembrosApi.put("/", data);
};
