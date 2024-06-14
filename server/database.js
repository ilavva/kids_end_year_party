import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise()

export async function getPartyList() {
    const [rows] = await pool.query("SELECT * FROM party_list WHERE isActive=true")
    return rows;
}

export async function getPartyListFree() {
    const [rows] = await pool.query("SELECT * FROM `party_list` WHERE owner_name is NULL and isActive=true")
    return rows;
}

export async function getPartyListOwnered() {
    const [rows] = await pool.query("SELECT * FROM `party_list` WHERE owner_name is not NULL and isActive=true")
    return rows;
}
export async function addPartyListOwner(id, owner_name) {
    const [result] = await pool.query(`
        UPDATE party_list SET owner_name=?   
        WHERE id=?
           `, [owner_name, id]);
    return getPartyListItem(id);
}
export async function getPartyListItem(id) {

    const [rows] = await pool.query(`
        SELECT * FROM party_list
        WHERE id=?
        `, [id])
    return rows[0];
}

export async function addPartyListItem(item_name, owner_name) {
    const [result] = await pool.query(`
     INSERT INTO party_list (item_name, owner_name)  
     VALUES (?,?)
        `, [item_name, owner_name]);

    const id = result.insertId;

    return getPartyListItem(id);

}

export async function updatePartyListItemOwner(id, owner_name) {
    const [result] = await pool.query(`
     UPDATE  party_list SET  owner_name=?
     WHERE id=?
        `, [owner_name, id]);

    return getPartyListItem(id);
}

export async function updatePartyListItemName(id, item_name) {
    const [result] = await pool.query(`
     UPDATE  party_list SET  item_name = ?
     WHERE id = ?
        `, [item_name, id]);

    return getPartyListItem(id);
}


export async function deletePartyListItem(id) {
    const [result] = await pool.query(`
     UPDATE  party_list SET  isActive = 0
     WHERE id = ?
        `, [id]);

    return getPartyListItem(id);
}

// const partyList = await getPartyList()
// console.log(partyList)

// const partyItem = await getPartyListItem(38)
// console.log(partyItem)

// // const res1 = addPartyListItem("כוסות", "אירנה")
// // console.log(res1)
// const res2 = await updatePartyListItemOwner(38, "רועי")
// console.log(res2)

// const res3 = await deletePartyListItem(38, "רועי")
// console.log(res3)