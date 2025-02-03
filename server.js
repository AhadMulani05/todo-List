import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

// Serve static files from the current directory
app.use(express.static(path.resolve()));

app.get("/", (req, res) => res.sendFile(path.resolve("index.html")));

app.get("/help", (req, res) => res.send("Help me, please"));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));