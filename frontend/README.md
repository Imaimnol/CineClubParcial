# CineClub


Aplicación web para buscar películas, consultar sus detalles y gestionar reseñas.


## Tecnologías utilizadas


### Backend


- Node.js
- Express
- Axios
- Morgan
- CORS
- Dotenv
- API de TMDB


### Frontend


- React
- Vite
- JavaScript


## Requisitos


Para ejecutar el proyecto es necesario tener instalado:


- Node.js
- Una API Key de TMDB


## Instalación


### Backend


Desde la carpeta `backend`, instalar las dependencias:


```bash
cd backend
npm install

Crear un archivo .env dentro de la carpeta backend con la siguiente configuración:

TMDB_API_KEY=TU_API_KEY
PORT=3001

Reemplazar TU_API_KEY por una API Key válida de TMDB.

Para iniciar el servidor:

node server.js

El backend estará disponible en:

http://localhost:3001
Frontend

Desde la carpeta frontend, instalar las dependencias:

cd frontend
npm install

Crear un archivo .env dentro de la carpeta frontend con:

VITE_API_URL=http://localhost:3001

Para iniciar el frontend:

npm run dev

La aplicación estará disponible en la dirección indicada por Vite, normalmente:

http://localhost:5173
Funcionalidades
Búsqueda de películas mediante TMDB.
Consulta del detalle de una película.
Manejo de películas no encontradas.
Creación de reseñas.
Validación de reseñas.
Consulta de reseñas asociadas a una película.
Eliminación de reseñas.
Cálculo del promedio de puntuación (avgScore).
Estados de carga durante las búsquedas y consultas de detalles.
Manejo y visualización de errores.
Interfaz desarrollada con React.
Variables de entorno
Backend

El archivo .env del backend debe contener:

TMDB_API_KEY=TU_API_KEY
PORT=3001
Frontend

El archivo .env del frontend debe contener:

VITE_API_URL=http://localhost:3001

Los archivos .env contienen información de configuración y credenciales, por lo que no deben subirse al repositorio.

Ejecución

Para utilizar la aplicación se deben ejecutar el backend y el frontend en terminales separadas.

Backend
cd backend
npm install
node server.js
Frontend

En otra terminal:

cd frontend
npm install
npm run dev

Una vez iniciados ambos servidores, se puede acceder a la aplicación desde la dirección indicada por Vite.

Estructura del proyecto
ClubCine/
├── backend/
│   ├── .env
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── .env
│   ├── package.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── MovieCard.jsx
│   │   │   ├── MovieGrid.jsx
│   │   │   ├── ReviewForm.jsx
│   │   │   ├── ReviewList.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── App.jsx
│   │   └── ...
│   └── ...
│
└── README.md