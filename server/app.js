import express from 'express'
import { getPartyList, getPartyListItem, addPartyListItem } from './database.js'
const app = express()
app.use(express.json())

app.get("/list", async (req, res) => {
    const list = await getPartyList()
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

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})