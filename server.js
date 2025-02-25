const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3100;
const LASTFM_API_KEY = process.env.LASTFM_API_KEY;

// Endpoint to get a specific user's recent scrobbles
app.get('/api/scrobbles/:username', async (req, res) => {
    const { username } = req.params;
    const limit = req.query.limit || 10; // Default to 10 scrobbles

    try {
        const response = await axios.get('https://ws.audioscrobbler.com/2.0/', {
            params: {
                method: 'user.getrecenttracks',
                user: username,
                api_key: LASTFM_API_KEY,
                format: 'json',
                limit
            }
        });

        const recentTracks = response.data.recenttracks.track;
        res.json(recentTracks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch recent scrobbles' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
