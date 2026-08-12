import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('✓ Connected to octofit_db');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    console.log('✓ Cleared existing data');

    // Create teams
    const teams = await Team.insertMany([
      {
        name: 'Fitness Warriors',
        description: 'A team dedicated to fitness excellence',
        members: []
      },
      {
        name: 'Cardio Champions',
        description: 'Focus on cardio and endurance training',
        members: []
      },
      {
        name: 'Strength Squad',
        description: 'Building strength and muscle',
        members: []
      }
    ]);

    console.log('✓ Created 3 teams');

    // Create users
    const users = await User.insertMany([
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'hashed_password_1',
        age: 28,
        teamId: teams[0]._id,
        joinedAt: new Date('2024-01-15')
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        password: 'hashed_password_2',
        age: 35,
        teamId: teams[0]._id,
        joinedAt: new Date('2024-02-20')
      },
      {
        name: 'Carol Davis',
        email: 'carol@example.com',
        password: 'hashed_password_3',
        age: 26,
        teamId: teams[1]._id,
        joinedAt: new Date('2024-03-10')
      },
      {
        name: 'David Martinez',
        email: 'david@example.com',
        password: 'hashed_password_4',
        age: 32,
        teamId: teams[1]._id,
        joinedAt: new Date('2024-01-05')
      },
      {
        name: 'Emma Wilson',
        email: 'emma@example.com',
        password: 'hashed_password_5',
        age: 29,
        teamId: teams[2]._id,
        joinedAt: new Date('2024-02-01')
      },
      {
        name: 'Frank Brown',
        email: 'frank@example.com',
        password: 'hashed_password_6',
        age: 31,
        teamId: teams[2]._id,
        joinedAt: new Date('2024-03-15')
      }
    ]);

    console.log('✓ Created 6 users');

    // Update teams with members
    await Team.updateOne({ _id: teams[0]._id }, { members: [users[0]._id, users[1]._id] });
    await Team.updateOne({ _id: teams[1]._id }, { members: [users[2]._id, users[3]._id] });
    await Team.updateOne({ _id: teams[2]._id }, { members: [users[4]._id, users[5]._id] });

    console.log('✓ Updated teams with members');

    // Create activities
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Running',
        duration: 45,
        calories: 450,
        date: new Date('2024-08-10')
      },
      {
        userId: users[0]._id,
        type: 'Cycling',
        duration: 60,
        calories: 550,
        date: new Date('2024-08-11')
      },
      {
        userId: users[1]._id,
        type: 'Swimming',
        duration: 50,
        calories: 400,
        date: new Date('2024-08-10')
      },
      {
        userId: users[2]._id,
        type: 'Running',
        duration: 30,
        calories: 320,
        date: new Date('2024-08-11')
      },
      {
        userId: users[3]._id,
        type: 'Gym',
        duration: 75,
        calories: 650,
        date: new Date('2024-08-10')
      },
      {
        userId: users[4]._id,
        type: 'Yoga',
        duration: 60,
        calories: 250,
        date: new Date('2024-08-11')
      },
      {
        userId: users[5]._id,
        type: 'Weightlifting',
        duration: 90,
        calories: 700,
        date: new Date('2024-08-10')
      }
    ]);

    console.log('✓ Created 7 activities');

    // Create leaderboard entries
    const leaderboardEntries = await Leaderboard.insertMany([
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        totalCalories: 1000,
        totalActivities: 2,
        rank: 1
      },
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        totalCalories: 400,
        totalActivities: 1,
        rank: 2
      },
      {
        userId: users[3]._id,
        teamId: teams[1]._id,
        totalCalories: 650,
        totalActivities: 1,
        rank: 1
      },
      {
        userId: users[2]._id,
        teamId: teams[1]._id,
        totalCalories: 320,
        totalActivities: 1,
        rank: 2
      },
      {
        userId: users[5]._id,
        teamId: teams[2]._id,
        totalCalories: 700,
        totalActivities: 1,
        rank: 1
      },
      {
        userId: users[4]._id,
        teamId: teams[2]._id,
        totalCalories: 250,
        totalActivities: 1,
        rank: 2
      }
    ]);

    console.log('✓ Created 6 leaderboard entries');

    // Create workout suggestions
    const workouts = await Workout.insertMany([
      {
        userId: users[0]._id,
        name: 'Morning Run',
        difficulty: 'Medium',
        duration: 45,
        description: 'A steady-paced 45-minute run to build endurance'
      },
      {
        userId: users[0]._id,
        name: 'HIIT Training',
        difficulty: 'Hard',
        duration: 30,
        description: 'High-intensity interval training for maximum calorie burn'
      },
      {
        userId: users[1]._id,
        name: 'Swimming Basics',
        difficulty: 'Easy',
        duration: 50,
        description: 'A beginner-friendly swimming session'
      },
      {
        userId: users[2]._id,
        name: 'Evening Jog',
        difficulty: 'Easy',
        duration: 30,
        description: 'A light evening jog for recovery'
      },
      {
        userId: users[3]._id,
        name: 'Strength Builder',
        difficulty: 'Hard',
        duration: 75,
        description: 'Comprehensive strength training session'
      },
      {
        userId: users[4]._id,
        name: 'Yoga Flow',
        difficulty: 'Medium',
        duration: 60,
        description: 'Relaxing yoga flow for flexibility and mindfulness'
      },
      {
        userId: users[5]._id,
        name: 'Power Lifting',
        difficulty: 'Hard',
        duration: 90,
        description: 'Advanced weightlifting program'
      }
    ]);

    console.log('✓ Created 7 workout suggestions');

    console.log('\n✓ Database seeding complete');
    console.log(`✓ Created ${teams.length} teams, ${users.length} users, ${activities.length} activities, ${leaderboardEntries.length} leaderboard entries, and ${workouts.length} workouts\n`);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('✗ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
