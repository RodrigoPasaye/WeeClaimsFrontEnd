# WeeClaimsWeb

## DEV

```sh
npm install
```

Cambiar en el archivo .env.development la variable de entorno VITE_MAIN_SERVICE que hace referencia a la API

Ejemplo de URL completa

```
  http://localhost:5179/api/v1/Customer
```

Solamente colocar en la variable de entorno lo siguiente

```
  http://localhost:5179/api/v1
```

la URL se termina de construir en el clientAPI.js

### Ejecutar en DEV

```sh
npm run dev
```

### PROD

```sh
npm run build
```
