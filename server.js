const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(`mongodb+srv://vishal6897:${process.env.MONGODB_PASSWORD}@cluster0.znhkdrv.mongodb.net/easynotedb?retryWrites=true&w=majority
`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const noteSchema = mongoose.Schema({
  title: String,
  content: String
});

const Note = mongoose.model('Note', noteSchema);


// API endpoint for fetching data
app.get("/api/notes", async (req, res) => {
    try {
        const note = await Note.find();
        res.json(note);
    } catch (error) {
        console.error('Error getting notes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint for creating new data
app.post("/api/notes", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newnote = new Note({ title, content });

    const savednote = await newnote.save();
    res.json(savednote);
  } catch (error) {
    console.error('Error saving note:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint for deleting data

app.delete("/api/notes/:id", (req, res) => {
    let  id  = req.params.id;
    console.log(id);
    Note.findByIdAndDelete(id)
      .exec()
      .then(() => {
        res.json({ message: 'note deleted successfully' });
      })
      .catch((err) => {
        console.error('Error deleting note:', err);
        res.status(500).json({ error: 'Internal server error' });
      });
  });
  


// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
