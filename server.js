require("dotenv").config();
const app = require('./index')

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("Servidor escuchando en el puerto", PORT);
});