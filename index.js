const express = require('express');
const inshorts = require('inshorts-news-api');
const cors = require('cors');

const app = express();
const port = 3000;

// Use CORS middleware to allow all origins
app.use(cors());

app.get("/",(req,res)=>{
    res.json({message:"API is running"})
})


app.get('/api/getNewsInvApi', async (req, res) => {
  try {
    // Specify language and category of news you want
    const options = {
      language: 'en',
      category: 'business'
    };

    // Use getNews for the first time; it will return the first 10 posts and a unique id
    const newsData = await inshorts.getNews(options);

    // Sending the news data as a JSON response
    res.json(newsData);
  } catch (error) {
    console.error('Error fetching news:', error);
    // Sending an error response if something goes wrong
    res.status(500).json({ error: 'Error fetching news' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
