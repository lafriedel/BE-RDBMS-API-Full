const express = require("express");
const helmet = require("helmet");
const cohortsRouter = require('./routes/cohortsRouter');
const studentsRouter = require('./routes/studentsRouter');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/cohorts', cohortsRouter);
server.use('/api/students', studentsRouter);

server.get('/', (req,res) => {
    res.status(200).send("Welcome to the Lambda School API.");
})

const port = 5000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});