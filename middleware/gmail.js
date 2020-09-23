const googleAuth = require('googleapis').google.auth;
const googleGmail = require('googleapis').google.gmail;

function getAuth(){
  const client_id = process.env.GMAIL_CLIENT_ID;
  const client_secret = process.env.GMAIL_CLIENT_SECRET;
  const redirect_uri = process.env.GMAIL_REDIRECT_URI;
  const access_token = process.env.GMAIL_ACCESS_TOKEN;
  const refresh_token = process.env.GMAIL_REFRESH_TOKEN;
  const expiry_date = Number( process.env.GMAIL_EXPIRY_DATE );
  const token_type = process.env.GMAIL_TOKEN_TYPE;
  const auth = new googleAuth.OAuth2( client_id, client_secret, redirect_uri );
  auth.setCredentials({
    access_token,
    refresh_token,
    expiry_date,
    token_type,
  });
  return auth
}

function gmail(req, res, next){
  const auth = getAuth();
  req.gmail = googleGmail({ version: "v1", auth });
  return next();
}

export default gmail;
