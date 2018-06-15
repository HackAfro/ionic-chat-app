require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const Sentiment = require('sentiment');

const app = express();
const port = process.env.PORT || 4000;
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'eu',
  encrypted: true,
});

const sentiment = new Sentiment();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.post('/messages', (req, res) => {
  const { body } = req;
  console.log(body);
  const { text, id } = body;
  const result = sentiment.analyze(text);
  const comparative = result.comparative;
  const tone =
    comparative >= 0 ? (comparative >= 1 ? 'positive' : 'neutral') : 'negative';

  const data = {
    text,
    id,
    timeStamp: new Date(),
    sentiment: {
      tone,
      score: result.score,
    },
  };

  pusher.trigger('chat', 'message', data);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
