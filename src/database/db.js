const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./src/database/database.db")


module.exports = db

db.serialize(() => {
//Criar o banco de dados

    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         cep TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)

//Inserir dados na tabela       
    // const querry = `
    //     INSERT INTO places (
    //         image,
    //         name,
    //         cep,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES(?, ?, ?, ?, ?, ?, ?, ?);
    //     `
        
    // const values = [
    //     "https://redes.moderna.com.br/wp-content/uploads/2019/05/Design-sem-nome2.png",
    //     "Papersider",
    //     "2222222",
    //     "Guilherme Gemballa, Jardim América",
    //     "nº 260",
    //     "Santa Caratina",
    //     "Rio do Sul",
    //     "Papéis e Papelão"
    //     ]

    // function afterInsertData(err){ //err  == erro
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log("Cadastrado com sucesso")
    //     console.log(this)
    // }
    // db.run(querry, values, afterInsertData)

//Consultar os dados da tabela
    // db.all(`SELECT * FROM places`, function(err, rows){
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log("Aqui estão seus registros:")
    //     console.log(rows)
    // })

// Deletar dados da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [20], function(err, rows){
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log(rows)
    // })


})