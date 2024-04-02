import axios from "axios";

// Creación de una instancia de axios con una base URL específica para la API de rangos
const RangosApi = axios.create({
  baseURL: "http://127.0.0.1:8000/rangos/",
});

// Función para obtener todos los rangos
export const getRangos = () => {
  return RangosApi.get("/");
};

// Función para obtener un rango específico por su ID
export const idgetRangos = (id) => {
  return RangosApi.get("/", {
    params: {
      idRango: id,
    },
  });
};

// Función para crear un nuevo rango
export const postRangos = (data) => {
  return RangosApi.post("/", data);
};

// Función para actualizar un rango existente
export const putRangos = (data) => {
  return RangosApi.put("/", data);
};
