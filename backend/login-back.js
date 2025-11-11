

Router.post('/login', async (req,res) => {
    const {username, password} = req.body;

    try {
        const [rows] = await pool.query('select * from users where username = ?', [username]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const user = rows[0];
        const isValid = await bcrypt.compare(password, user.password_hash);

        if (!isValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        res.json({ message: 'Login Successful', username: user.username });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
    
});