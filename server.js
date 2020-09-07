const express = require('express');
const path = require('path');

const app = express();

let folder_name = 'public'; //folder that holds static resources to be served

app.use(express.static(path.join(__dirname, folder_name)));

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));