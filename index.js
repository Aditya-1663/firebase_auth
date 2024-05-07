
const express = require('express');
const admin = require('firebase-admin');
const { OAuth2Client } = require('google-auth-library');
const path = require('path');
const { YOUR_GOOGLE_CLIENT_ID } = require('./env')
const app = express();
const PORT = process.env.PORT || 3000;

const serviceAccount = require('./serviceAccountKey.json'); 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const client = new OAuth2Client(YOUR_GOOGLE_CLIENT_ID);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/login.html'));
});

app.get('/login', (req, res) => {
  const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${client.options.clientId}&redirect_uri=http://localhost:${PORT}/callback&scope=email%20profile`;
  res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
  try {
    const code = req.query.code;
    const { tokens } = await client.getToken({ code });
    const { id_token } = tokens;
    const decodedToken = await admin.auth().verifyIdToken(id_token);
    console.log(decodedToken);
    res.json({ message: 'Google Authentication successful', user: decodedToken });
  } catch (error) {
    console.error('Error authenticating with Google:', error);
    res.status(500).json({ error: 'Failed to authenticate with Google' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
