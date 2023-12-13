import server from "./src/server.js";

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

import Express from "express";

const app = express();
app.set("port", 4000);
app.listen(app.get(port));

console.log(`servidor corriendo en el puerto ${app}`)
