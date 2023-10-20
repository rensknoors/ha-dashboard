module.exports = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  console.log('refreshToken', refreshToken);

  // Use the refresh token to obtain a new access token from Google Identity Service
  res.json({ accessToken: 'new_access_token_here' });
};
