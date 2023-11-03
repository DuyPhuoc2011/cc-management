const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use('/login', (req, res) => {
    res.json("testToken");
});

app.listen(8080, () => console.log('Server is running'))