import express from 'express'
import {
    getPartyList,
    getPartyListItem,
    addPartyListItem,
    getPartyListFree,
    getPartyListOwnered,
    addPartyListOwner
} from './data/database_pg.js'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get("/list", async (req, res) => {
    const list = await getPartyList()
    res.send(list)
})

app.get("/listfree", async (req, res) => {
    const list = await getPartyListFree()
    res.send(list)
})

app.get("/listtaken", async (req, res) => {
    const list = await getPartyListOwnered()
    res.send(list)
})

app.get("/list/:id", async (req, res) => {
    const id = req.params.id;
    const item = await getPartyListItem(id)
    res.send(item)
})

app.post("/list", async (req, res) => {
    const { item_name, owner_name } = req.body;
    const item = await addPartyListItem(item_name, owner_name)
    res.status(201).send(item)
})

app.put("/list/:id", async (req, res) => {
    const id = req.params.id;
    const { owner_name } = req.body;
    const item = await addPartyListOwner(id, owner_name);
    res.status(201).send(item)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
const port = process.env.SERVER_PORT || 3000;
app.listen(port, process.env.HOST, () => {
    console.log(`Server running at http://${process.env.HOST}:${process.env.SERVER_PORT}/`);
})