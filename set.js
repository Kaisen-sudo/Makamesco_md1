const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'MAKAMESCO-MD<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQURLVjk0bG54ZHlvUERWWmQwdlpNNGh5ZkV4WDZMT0pEZzFaTnJJT0EyQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUE5Sk1vODJHd293bDFPNmJCVHdkR0ZNQ3ZDTFZGZVQxT0ZMTmVlaUlSST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0RksrMEVHdnlnWE9CdTVzL29kQlRUZ09TWndaTDBqa09JR1M4UVE4bEVjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIUThaNzkxd1pQN0o2c1FYd3B6N2RoQ0ZWdUxpSzZqQmtMZkMwbDFDb2s4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndMa3J0YlpWZWhRRU54TXhFNzNiVnE2aHd2eVh4QVNydkNvdlNsNndjRlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1uYVMwQjRjQk0zbTFzbHlLbVZhT0xCdUk5Z1hZZTI2MGxSSC9BdzIvVDQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieU04Sm5uQ0ZBdW50NnhyR1JOVis2dzA4UTY4eHVSeEJFRDF6dVZBS2pXOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaDNCbDUvNXBnVzBGU1FxN3B5cG9ybHg1N0l6aXZUcmNEQ00rcDdCSTMzbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZMNVZqb2FQcTllZE8wSVA2NzNUTVVXeERiREs0KzdVK2s0Y3BtVG56TU1OZUY5U0ZrYkdHbmRPb0EvdHc0dGFmNG0yUEVxQnFyN0ZySC9SYTQ3bGdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYxLCJhZHZTZWNyZXRLZXkiOiJvVVd5SjNmYW9Ha2drbThZWlBpL3NUZU1udWU1TGtFSGEvbEZvdDBZdUZZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQxMDkxMzk3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkE1MDVGMkM5QjVENkI4NTE3RUI0RTJGNjI3MzQxMTlFIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ4NTA2NTR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQxMDkxMzk3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkI4RUUxMzQ5OEU5RTJBNUZCQzJBNzVFRUMzODBCM0YwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ4NTA2NTV9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQxMDkxMzk3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjczOTlGNThBOUZDRTM1RDYwMjI2ODUyMjZFRUMxQTFCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ4NTA2NjV9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQxMDkxMzk3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkYwMzY1RDYxMDQ0MTRDRTQwQTk4NDdGQ0QxMzdDMUMxIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ4NTA2Nzl9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjNZTkFGTUVDIiwibWUiOnsiaWQiOiI1MDk0MTA5MTM5Nzo0MUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJLYWlzZW4iLCJsaWQiOiIxODg2MjY1NzUwMzY0MjI6NDFAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKcWJ0NlFERU16SzQ4UUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ6Z2tINnpHMXo1djhvOUxuMjVqeHI3UmU1U2h6NzNlaU1vaDVUWFNxVFUwPSIsImFjY291bnRTaWduYXR1cmUiOiJFdU5qbTBQTkpZdWIzOVNZRXRBY2JDbElScWNyRGV2ZjF6QjgvTjgzS002ZjdIaVdZbUd6TzBYVWJxUFpQeU1xQVE5dzVWTDlvV3U4SGlVNEFONG1CQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiM1l6UkFPdWErajI0czF3ZzYxdDZBNjkrVndNYmNOdFhQN1lDYlRvOEljem5TWnBkZWNPejVXYUxhd2VVaTc4RTExSlA2RDdZaVg0YzI5UVB6N1hKamc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI1MDk0MTA5MTM5Nzo0MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjNEpCK3N4dGMrYi9LUFM1OXVZOGErMFh1VW9jKzkzb2pLSWVVMTBxazFOIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTQ4NTA2NTAsImxhc3RQcm9wSGFzaCI6Im5tM0JiIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFNWGIifQ==',
    PREFIXE: process.env.PREFIX || "+",
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
