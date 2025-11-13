
const routes = require('./Routes');
const express = require('express');
const app = express();
const PORT = 2000;
const pool = require('./db');
app.use(express.json());
const cors = require ('cors');
app.use(cors());
app.use('/api', routes);


async function startServer() {
    try {
        const connection = await pool.getConnection();
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

// app.post('/api/users', async (request, response) => {
//   const { username, password_hash, email } = request.body;

//   try {
//     const sqlQuery = 'INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)';
//     const [result] = await pool.query(sqlQuery, [username, password_hash, email]);

//     response.status(200).json({
//       userId: result.insertId,
//       message: 'User registered successfully',
//     });
//   } catch (error) {
//     console.error('Registration error:', error);
//     response.status(500).json({ error: 'Internal server error' });
//   }
// });




