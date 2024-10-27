import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import logger from '@/config/error/logger';
import { Movie } from '@/backend/modules/movies/entities/movie';

// Define the structure of the database
type Data = {
  movies: Movie[];
};

// Set the path for the JSON file
const filePath = path.join(process.cwd(), 'src/db/movies.json');
const adapter = new JSONFile<Data>(filePath); // Use JSONFile for asynchronous setup
const db = new Low<Data>(adapter, { movies: [] }); // Provide default data here

// Initialize the database with default values if empty
async function initializeDb() {
  try {
    await db.read();
    db.data ||= { movies: [] }; // Set default if file is empty
    await db.write();
    logger.info('Database initialized successfully');
  } catch (error) {
    logger.error('Error initializing the database', { error });
  }
}

// Ensure the database is initialized
initializeDb();

export default db;
