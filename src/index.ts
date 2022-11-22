import dotenv from 'dotenv';
import express from 'express';

import { initSetup } from './setup';
import { initRoutes } from './routes';
import { connectDatabase, closeDatabase } from './database';

import { getEnv } from './utils';

dotenv.config();

const app = express();

/**
 * Initialise app setups
 */
initSetup(app);

/**
 * Initialise app routes
 */
initRoutes(app);

/**
 * Connect mongoose database
 */
connectDatabase();

/**
 * Start Express server.
 */
const PORT = getEnv({ name: 'PORT' });

export const server = app.listen(PORT, () => {
    console.log(
      `[arctis-api] App is running at http://localhost:${PORT} in %s mode`,
      app.get('env')
    );
});

process.stdin.resume();

const closeServer = async () => {
  try {
    await new Promise<void>((resolve, reject) =>  {
      // Stops the server from accepting new connections and finishes existing connections
      server.close((error: Error | undefined) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  } catch (e) {
    console.error(e);
  }
}

(['SIGINT', 'SIGTERM'] as NodeJS.Signals[]).forEach(sig => {
  process.on(sig, async() => {
    await closeServer();
    await closeDatabase();
    process.exit(0);
  });
});