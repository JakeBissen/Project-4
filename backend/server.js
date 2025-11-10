

const express = require('express');
const app = express();
const PORT = 2000;
const pool = require('./db');
app.use(express.json());
const cors = required ('cors');
app.use(cors());

async function startServer() {
    try {
        const connection = await poolgetConnection();
        console.log('connected');

    }

    catch(error){
        console.log(error);
    }

    app.listen(PORT, () => {
        console.log(`server started listening on Port: ${PORT}`);
    })
}


startServer();

app.get('/api/users', async (request, response) => {
    try{
        const [users] = await pool.query('select * from users');
        response.json(users);

    }
    catch(error){
        console.log(error);
    }
});

app.post('/api/users', async (request, response) =>{
    console.log(request.body)
    const {Id, username, password_hash, email} = request.body;
    const [users] = await pool.query('select * from users');

       try{
        const sqlQuery = 'insert into users (Id, username, password_hash, email) values(?, ?, ?, ?)'
        const [result] = await pool.query(sqlQuery, [username, password, email]);
        newID = result.insertId,
        response.status(200).json({
            UserID: result.insertId,
            message: 'data inserted'
        })
       }
       catch(error){
        response.status(500).json({error : error})
       }
})

