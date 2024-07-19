const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json({ extended: true }));
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (config.get('allowed_origin').indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use('/api/reservations', require('./routes/reservations.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

const PORT = config.get('port') || 5000;
// const HOST = config.has('host') ? config.get('host') : null;

async function start() {
  await mongoose.connect(config.get('mongo_uri'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  app.listen(PORT, () => {
    console.log('Server has been started', process.env.HOST);
  });
}

start();
