const fs = require('fs/promises');
const googleAuth = require('googleapis').google.auth;
const googleGmail = require('googleapis').google.gmail;

const TOKEN_PATH = 'gmail_token.json';

async function getAuth(credentials){
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const auth = new googleAuth.OAuth2( client_id, client_secret, redirect_uris[0] );
  await fs.readFile(TOKEN_PATH)
    .then(token => {
      auth.setCredentials(JSON.parse(token));
    })
    .catch(err => {
      console.error('Token does not exist:', err);
    });
  return auth
}

async function gmail(req, res, next){
  const credentials = await fs.readFile('gmail_credentials.json').then(JSON.parse);
  const auth = await getAuth(credentials);
  req.gmail = googleGmail({ version: "v1", auth });
  return next();
}

export default gmail;
