const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const db = require("./queries");
const cors = require("cors");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get("/", (request, response) => {
  response.json({ info: "Nodejs, Express and Postgres API" });
});

app.get("/products", db.getProducts);
app.get("/products/:id", db.getProductById);
app.post("/products", db.createProduct);
app.put("/products/:id", db.updateProduct);
app.delete("/products/:id", db.deleteProduct);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
