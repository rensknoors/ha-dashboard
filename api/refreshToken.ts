import cors from 'cors';
import express from 'express';
import { OAuth2Client, UserRefreshClient } from 'google-auth-library';

const app = express();

app.use(cors());
app.use(express.json());

const oAuth2Client = new OAuth2Client(
  process.env.VITE_CLIENT_ID,
  process.env.VITE_CLIENT_SECRET,
  'postmessage'
);

app.post('/auth/google', async (req, res) => {
  try {
    const { tokens } = await oAuth2Client.getToken(req.body.code);
    console.log(tokens);
    res.json(tokens);
  } catch (error) {
    res.status(500).send('Error retrieving tokens.');
  }
});

app.post('/auth/google/refresh-token', async (req, res) => {
  try {
    const user = new UserRefreshClient(
      process.env.VITE_CLIENT_ID,
      process.env.VITE_CLIENT_SECRET,
      req.body.refreshToken
    );
    const { credentials } = await user.refreshAccessToken();
    res.json(credentials);
  } catch (error) {
    res.status(500).send('Error refreshing token.');
  }
});

app.listen(3001, () => console.log(`Server is running on port 3001`));