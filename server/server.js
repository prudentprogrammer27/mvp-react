import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const { PORT, DATABASE_URL } = process.env;

const client = new pg.Client({
  connectionString: DATABASE_URL,
});

await client.connect();

const app = express();

app.use(express.json());

app.get("/api/tasks", (req, res) => {
  client.query("SELECT * FROM tasks")
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred: " + error);
    });
});


app.post("/api/tasks", (req, res) => {
  const { description } = req.body;
  client.query("INSERT INTO tasks (description) VALUES ($1) RETURNING *",
    [description])
    .then((result) => {
      const newTask = result.rows[0];
      res.json(newTask);
    })
    .catch((error) => {
      console.error('Error inserting task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});


