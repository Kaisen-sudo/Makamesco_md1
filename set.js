const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'MAKAMESCO-MD<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0pSN01xVHhRNTNpZTNWVUhCZEJhS2piMitaaXE4SDhpVEw0YTVtQkprbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZDhGYldGZThmVFlQUGtFbmVQOENJdEhibFJpeElvWlJvOUNXRjZxTnR5cz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvT2V6ZTJmYjdTa29UMGtaRmI0YzU0bm55aEVjTkdBVWtXa2NQYjZPaWxNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoNEVqZHJYUzU3elgzaFJzLzhzUTBsL2RubmhEbGlOZFFjQWNKT295YVEwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9NaGFqM29MWjE2VFBCc3RrTkRyYVFlYXMvQkFjMUl6WENid3NVaitna0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhvTzA4NzAzaXdCblk2NG9RUFd1dlBocXVHOWJ4MnpveVJzTGx2MDhpZ0k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0E0Y3BoRVZDOVZscWFjN1hma3hiTVU5ZDF1RFlVeEQ1Z3BvN21pYlJHST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia21UYUFpYlJ3bDdWTXp2c1JtZE1BaVVUYzlQRTRZRU1JUGRodjM5U0pFdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNtL0YyVmFhU3ZSNmVyNmNaTEZ4VFpibStnZy9meENtWHN6c3VXUTRFelRoaXdqSWxMdHNmRlJFZmRxVG02TUxSZmJncFY3eCtuRXlaMzVMaFh0OUFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM0LCJhZHZTZWNyZXRLZXkiOiJDeFprNW4yRTVnb3pHeVVrR3AwR0E0TmV6S01WM1VObmkvbUFDNXBVdXo4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQyODIzNjUwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjhGOTVCNjRGMzI3RkE2QkFCNkM0NkYxN0Y0MTgwRTNDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ4NTg3NzR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQyODIzNjUwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjY1ODI1NEQ3M0ZCQkQwOTU0QTQzQTAxN0NEQjQwRkVDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ4NTg3NzR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQyODIzNjUwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNGNTgwMDY0QkI0MTAzMTA3NTFFMUIzREVCOTI3MUFEIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ4NTg3ODJ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQyODIzNjUwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijg1NTc4MjE3RTEyREE0RkY3RkI3M0JGMzg5MzE1RkM4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ4NTg3ODl9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQyODIzNjUwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkE4NEQ2MEQxRUM0QjY4ODMyODRGRUE2MjEwQUM0REIyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ4NTg4MDR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQyODIzNjUwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjA3OUFGNTRFREI4MEI5N0Y5QTQ4Q0EwREU0M0M5QTRBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ4NTg4MTh9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6dHJ1ZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiWUMzTDkyNk0iLCJtZSI6eyJpZCI6IjUwOTQyODIzNjUwOjJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTWVjIiwibGlkIjoiMTYzMjQzNjg3NDE5OTY5OjJAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJU0F1THdDRUlXSzVNUUdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJoRXVqcTlVWFdiZlR1MVdILzJnTUxGdVRBSTB5MUNoVE9ZZ0RNZDIxSDBzPSIsImFjY291bnRTaWduYXR1cmUiOiJHbm85djNmRU9ndk9PQWRGbnVjUmZsZkNWaVlHSjJVb0pyT0RFTGtMNXNHTnVsSm1MN2NXdHlTaTdZM0NPY1B3OTVJNFlkdmdGdVZITTl2K0p3czVBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoidzZrUkNOR3VEMGwwZ0tzZUVwd1puRGFqUE9BTGFUdE1USSttOENmSnRQMFNjKzhOWU13YmJXNnlHYWxuOTBVaUk2YUtpU2V0d2ZTZXNHZGhXeTV5Q3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI1MDk0MjgyMzY1MDoyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQllSTG82dlZGMW0zMDd0VmgvOW9EQ3hia3dDTk10UW9Vem1JQXpIZHRSOUwifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1NDg1ODc3MiwibGFzdFByb3BIYXNoIjoiMkc0QW11IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFQSUUifQ==',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/mesh-matheka/Makamesco_md',
    OWNER_NAME : process.env.OWNER_NAME || "Makamesco",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254769995625",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/39n0nf.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'your status have been viewed by Makamesco MD',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VbAEL9r5vKA7RCdnYG0S",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VbAEL9r5vKA7RCdnYG0S",
    CHANNEL :process.env.CHANNEL || "https://whatsapp.com/channel/0029VbAEL9r5vKA7RCdnYG0S",
    CAPTION : process.env.CAPTION || "✧MAKAMESCO MD✧",
    BOT : process.env.BOT_NAME || '✧MAKAMAKAMESCO MD✧⁠',
    MODE: process.env.PUBLIC_MODE || "yes",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'no', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
