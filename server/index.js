const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');

require("dotenv/config")

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.json('Opening My Music Player....');
});

const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

// Artist Routes
const artistRoutes = require("./routes/artist");
app.use("/api/artist/", artistRoutes);

// Albums Routes
const albumRoutes = require("./routes/albums");
app.use("/api/albums/", albumRoutes);

// songs Routes
const songsRoutes = require("./routes/songs");
app.use("/api/songs/", songsRoutes);

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection
  .once('open', () => console.log('Connected'))
  .on('error', (error) => {
    console.log(`Error: ${error}`);
  });

app.listen(4500, () => console.log('Listening to port 4500'));
