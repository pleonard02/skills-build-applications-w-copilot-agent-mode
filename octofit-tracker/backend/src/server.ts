import express from 'express';
import { connectDatabase } from './config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users/', async (_request, response) => response.json(await User.find().lean()));
app.get('/api/teams/', async (_request, response) => response.json(await Team.find().lean()));
app.get('/api/activities/', async (_request, response) => response.json(await Activity.find().lean()));
app.get('/api/leaderboard/', async (_request, response) => response.json(await Leaderboard.find().sort({ rank: 1 }).lean()));
app.get('/api/workouts/', async (_request, response) => response.json(await Workout.find().lean()));

connectDatabase()
  .then(() => app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
  }))
  .catch((error) => {
    console.error('Error connecting to octofit_db:', error);
    process.exit(1);
  });
