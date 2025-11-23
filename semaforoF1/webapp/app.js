const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_NAME || "semaforo",
  port: process.env.DB_PORT || 5432,
});

// Crear tabla si no existe
async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS resultados (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      tiempo_ms INTEGER NOT NULL,
      creado_en TIMESTAMP DEFAULT NOW()
    );
  `);
}

app.use(express.json());
app.use(express.static("web"));

// API para guardar un resultado
app.post("/api/resultados", async (req, res) => {
  try {
    const { nombre, tiempoMs } = req.body;
    if (!nombre || !tiempoMs) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    await pool.query(
      "INSERT INTO resultados (nombre, tiempo_ms) VALUES ($1, $2)",
      [nombre, tiempoMs]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al guardar el resultado" });
  }
});

// API para obtener los resultados (por ejemplo los 20 mejores)
app.get("/api/resultados", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT nombre, tiempo_ms, creado_en FROM resultados ORDER BY tiempo_ms ASC LIMIT 20"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener los resultados" });
  }
});

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error inicializando la base de datos:", err);
    process.exit(1);
  });
