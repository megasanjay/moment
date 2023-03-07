/* eslint-disable no-console */
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import findConfig from 'find-config';
import { MongoClient } from 'mongodb';

dotenv.config({ path: findConfig('.env.local') });

const setup = async () => {
  let client;

  try {
    console.log('Setting up database...');
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    const hasData = await client
      .db(process.env.MONGODB_DB)
      .collection('users')
      .countDocuments();

    if (hasData) {
      console.log('Database already exists with data');
      client.close();
      return;
    }

    const records = [...Array(10)].map(() => {
      const [fName, lName] = faker.name.fullName().split(' ');
      const username = faker.internet.userName(fName, lName);
      const email = faker.internet.email(fName, lName);
      const image = faker.image.people(640, 480, true);

      return {
        name: `${fName} ${lName}`,
        username,
        email,
        image,
        followers: 0,
        emailVerified: null,
      };
    });

    const insert = await client
      .db(process.env.MONGODB_DB)
      .collection('users')
      .insertMany(records);

    if (insert.acknowledged) {
      console.log('Successfully inserted records');
    }
  } catch (error) {
    return 'Database is not ready yet';
  } finally {
    if (client) {
      await client.close();
    }
  }
};

try {
  setup();
} catch {
  console.warn('Database is not ready yet. Skipping seeding...');
}

export { setup };
