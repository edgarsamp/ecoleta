const express = require("express");
const server = express();

const db = require("./database/db.js");

// configura a pasta public
server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));

// utiliza template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});


server.get("/", (req, res) => {
  res.render("index.html"); // dps que configurar o nunjucks só isso basta
});

server.get("/create-point", (req, res) => {
  res.render("create-point.html", { saved: false });
});

server.post("/savepoint", (req, res) => {
  const querry = `
    INSERT INTO places (
        name,
        image,
        cep,
        address,
        address2,
        state,
        city,
        items
    ) VALUES(?, ?, ?, ?, ?, ?, ?, ?);
    `;

  const values = [
    req.body.name,
    req.body.image,
    req.body.cep,
    req.body.address,
    req.body.address2,
    req.body.uf,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      return res.send("Erro no cadastro");
    }
    return res.render("create-point.html", { saved: true });
  }
  db.run(querry, values, afterInsertData);

});

server.get("/search-results", (req, res) => {
  const search = req.query.search;

  if (search == "") {
    return res.render("search-results.html", { total: 0 });
  }

  // algorismo que consulta dados
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (
    err,
    rows
  ) {
    // LIKE '%  %' faz com que a busca seja mais generica
    if (err) {
      return console.log(err);
    }
    const total = rows.length;
    return res.render("search-results.html", { places: rows, total }); 
  });
});

server.listen(3000);

