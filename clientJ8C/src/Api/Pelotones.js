import axios from "axios";

// Creación de una instancia de axios con una base URL específica para la API de pelotones
const PelotonesApi = axios.create({
  baseURL: "http://127.0.0.1:8000/pelotones/",
});

// Función para obtener todos los pelotones
export const getPelotones = () => {
  return PelotonesApi.get("/");
};

// Función para obtener un pelotón específico por su ID
export const idgetPelotones = (id) => {
  return PelotonesApi.get("/", {
    params: {
      idPeloton: id,
    },
  });
};

// Función para crear un nuevo pelotón
export const postPelotones = (data) => {
  return PelotonesApi.post("/", data);
};

// Función para actualizar un pelotón existente
export const putPelotones = (data) => {
  return PelotonesApi.put("/", data);
};
