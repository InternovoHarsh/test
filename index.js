const express = require('express');
const inshorts = require('inshorts-news-api');
const cors = require('cors');

const app = express();
const port = 3000;

// Use CORS middleware to allow all origins
app.use(cors());

let cachedNewsData = null;

async function fetchNewsData() {
  try {
    const options = {
      language: 'en',
      category: 'business'
    };

    const newsData = await inshorts.getNews(options);
    cachedNewsData = newsData;
    console.log('News data refreshed successfully');
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

// Fetch news data initially when the server starts
fetchNewsData();

// Set up a periodic refresh every 1 hour (adjust as needed)
setInterval(fetchNewsData, 60 * 60 * 1000);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.get('/api/getNewsInvApi', (req, res) => {
  try {
    if (cachedNewsData) {
      res.json(cachedNewsData);
    } else {
      res.status(500).json({ error: 'News data not available' });
    }
  } catch (error) {
    console.error('Error sending news data:', error);
    res.status(500).json({ error: 'Error sending news data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
