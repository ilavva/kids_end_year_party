
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv'
dotenv.config()


const pool = new Pool({
    connectionTimeoutMillis: 5000, // Connection timeout
    idleTimeoutMillis: 10000, // Idle client timeout
    host: process.env.DB_POSTGRE_HOST,
    database: process.env.DB_POSTGRE_DATABASE,
    user: process.env.DB_POSTGRE_USER,
    password: process.env.DB_POSTGRE_PASSWORD,
    port: process.env.DB_POSTGRE_PORT,
    ssl: {
        rejectUnauthorized: false, // If using a self-signed certificate, set this to false
    }
});

export async function queryDatabase(queryText, params) {
    const client = await pool.connect();
    try {
        const result = await client.query(queryText, params);
        //  console.log(result);
        return result.rows;
    } catch (error) {
        console.error('Error executing query', error.stack);
        throw error;
    } finally {
        client.release();
    }
}

export async function getPartyList() {

    const rows = await queryDatabase("SELECT * FROM party_list WHERE isActive=true")
    return rows;
}

export async function getPartyListFree() {
    const rows = await queryDatabase("SELECT * FROM party_list WHERE owner_name is NULL and isActive=true")
    return rows;
}

export async function getPartyListOwnered() {
    const rows = await queryDatabase("SELECT * FROM party_list WHERE owner_name is not NULL and isActive=true")
    return rows;
}
export async function addPartyListOwner(item_id, owner_name) {
    const result = await queryDatabase(`
        UPDATE party_list SET owner_name=?   
        WHERE item_id=?
           `, [owner_name, item_id]);
    return getPartyListItem(item_id);
}
export async function getPartyListItem(item_id) {

    const rows = await queryDatabase(`
        SELECT * FROM party_list
        WHERE item_id=?
        `, [item_id])
    return rows;
}

export async function addPartyListItem(item_name, owner_name) {
    const result = await queryDatabase(`
     INSERT INTO party_list (item_name, owner_name)  
     VALUES (?,?)
        `, [item_name, owner_name]);

    const item_id = result.insertId;

    return getPartyListItem(item_id);

}

export async function updatePartyListItemOwner(item_id, owner_name) {
    const result = await queryDatabase(`
     UPDATE  party_list SET  owner_name=?
     WHERE item_id=?
        `, [owner_name, item_id]);

    return getPartyListItem(item_id);
}

export async function updatePartyListItemName(item_id, item_name) {
    const result = await queryDatabase(`
     UPDATE  party_list SET  item_name = ?
     WHERE item_id = ?
        `, [item_name, item_id]);

    return getPartyListItem(item_id);
}


export async function deletePartyListItem(item_id) {
    const result = await queryDatabase(`
     UPDATE  party_list SET  isActive = 0
     WHERE item_id = ?
        `, [item_id]);

    return getPartyListItem(item_id);
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