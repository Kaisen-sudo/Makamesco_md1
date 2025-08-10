const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'MAKAMESCO-MD<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0NVMGlaRFBTdUpFWU1UajFTTjJXTlpja3N2MDFFa0dibU9XaGRBSSszQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWVFaeVp3M3VqV2VZTi9qY0FpNFZPWUI2UXA4K2VxaGVvNXNTQ1g3ZmRXYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlTGYxR05NcTNGM2dJVmF3cU9uZThiQ2VqR0xMS1JmRHNSQURucWpad25ZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6WDE5eDFKQ0ZHYUNIdDVzWTQwQ1FRRFZhVHEvVlFGRkFPSGVaVEMyZGlvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVGaEdQR1lUcDNxYzFvQ3ZQdjBJeHp2Mm9kSytWVzFBeVlGcWlqSmZ1azg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii8wS29Kb0RBSkVwY0t2bFlCOFMwcVE2OExHaTV5aFNSdVBrQ3Z2VTVsQ1U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0pDcFlianZXZVZzOTEyVFU5alc5Y1NtUzAxK1V5NzhPVU4zb09DWGFsND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSFh1TFpwdHcxZkp4VTFsK2ljYmw5bHUwWVF0UTZZNzh1ODdtY3RpWUZDST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBGOHJPQWdtMjlKV01BVnpXTE1PNzd0MTVZb1c4UVhEVG44WFRwK0g1M3I2ZWJmbW16NGlSdWNpbUtza0hEZENqMUR1V2ZUVklkbGhOMTlJekJGdEFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM1LCJhZHZTZWNyZXRLZXkiOiJRWmFFckF3MzFRZVQ5QmdIUHhBaGIyN2djckxlZXdscm84enpVeHRRU2lBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQyODIzNjUwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjJBNjlCQ0FGMzkxNkQ4QzEwRThERUFFNzNGNTM2OEJBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ4NTc3OTh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQyODIzNjUwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjY2QjU2OTU1MkJCNjA5QzA3OUQ2ODIyODlGQjMzRjJEIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ4NTc3OTh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQyODIzNjUwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkRCM0YzQkM3QkJCNTEyNURENzFEQTRDMDc4QThENTQzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ4NTc4MDh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQyODIzNjUwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkNDNEM3REExNDM0M0Q3NDRERjEyNzk1RDBBNDc2RTcxIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ4NTc4MTZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQyODIzNjUwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjA3RDVBMTExRTFGNzMxQUM4MDZDOTNFQjg5ODI0OTEwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ4NTc4MjN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQyODIzNjUwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkUzRTY2RDkxMzYwNUQxNDY1QjIwMkRBQ0Q5QjJDQjJDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ4NTc4MzV9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQyODIzNjUwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijg5RTZGRDVGMTI3N0U1QkEwNTJCRTNFNDhCNjVEMzJGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ4NTc4Mzh9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IlJHVks1NE1NIiwibWUiOnsiaWQiOiI1MDk0MjgyMzY1MDoxQHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ik1lYyIsImxpZCI6IjE2MzI0MzY4NzQxOTk2OToxQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSVNBdUx3Q0VMT0M1TVFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiaEV1anE5VVhXYmZUdTFXSC8yZ01MRnVUQUkweTFDaFRPWWdETWQyMUgwcz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZTlXT0sxaGQ0UDQ2ekUxMDZKZ3ZlcDRpaGdkRVZPTjFFblRqL2FCRFVMeWZhYXVKV0p6dGtJOEdoLzdaOGFGdXRXTnE4YVR3T0E4b1V4ai9SWFRCQkE9PSIsImRldmljZVNpZ25hdHVyZSI6InBZOWtOTks2Y2JlWGxRTHVwY1lHT09kaHNhM3JoeUU1N0dJQTl5UEN1R1FpRTh1a2E3WlJDVHRPNXFRei93NkRMVUtwNWVydStjVE1nRlJlS0RNckRBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNTA5NDI4MjM2NTA6MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZUkxvNnZWRjFtMzA3dFZoLzlvREN4Ymt3Q05NdFFvVXptSUF6SGR0UjlMIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJQ0E9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTQ4NTc3OTUsImxhc3RQcm9wSGFzaCI6IjJHNEFtdSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUElFIn0=',
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
