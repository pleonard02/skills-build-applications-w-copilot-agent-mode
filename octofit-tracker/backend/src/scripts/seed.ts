import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Maya Chen', email: 'maya.chen@mergington.edu', grade: '10', points: 245 },
      { name: 'Jordan Rivera', email: 'jordan.rivera@mergington.edu', grade: '11', points: 210 },
      { name: 'Sam Okafor', email: 'sam.okafor@mergington.edu', grade: '9', points: 180 },
    ]);
    const teams = await Team.create([
      { name: 'Comet Crew', coach: 'Paul Octo', members: [users[0]._id, users[1]._id] },
      { name: 'Summit Squad', coach: 'Paul Octo', members: [users[2]._id] },
    ]);
    await Activity.create([
      { user: users[0]._id, type: 'Running', durationMinutes: 30, points: 75, completedAt: new Date('2026-08-28') },
      { user: users[1]._id, type: 'Strength training', durationMinutes: 25, points: 60, completedAt: new Date('2026-08-29') },
      { user: users[2]._id, type: 'Walking', durationMinutes: 45, points: 45, completedAt: new Date('2026-08-30') },
    ]);
    await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 245, rank: 1 },
      { user: users[1]._id, team: teams[0]._id, points: 210, rank: 2 },
      { user: users[2]._id, team: teams[1]._id, points: 180, rank: 3 },
    ]);
    await Workout.create([
      { title: 'After-school cardio', category: 'Cardio', difficulty: 'Beginner', durationMinutes: 20, description: 'A brisk interval session for building endurance.' },
      { title: 'Core and balance', category: 'Strength', difficulty: 'Intermediate', durationMinutes: 25, description: 'A bodyweight routine focused on stability and control.' },
      { title: 'Weekend mobility', category: 'Mobility', difficulty: 'Beginner', durationMinutes: 15, description: 'A gentle sequence for recovery and flexibility.' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
