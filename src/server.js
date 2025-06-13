import express from 'express';
// import { randomUUID } from 'node:crypto';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';
import 'dotenv/config';
import { ContactCollection } from './db/models/contacts.js';
import { getAllStudents } from './services/contacts.js';
//
//
//
export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // app.use((req, res, next) => {
  //   req.id = randomUUID();
  //   next();
  // });

  app.get('/', async (req, res, next) => {
    res.json({
      message: 'HomePage',
    });
    // next();
  });

  //
  //
  app.get('/contacts', async (req, res, next) => {
    const data = await getAllStudents();
    // const data = await ContactCollection.find();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',

      data,
    });
  });
  //
  //

  //
  //
  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await ContactCollection.findById(contactId);
    
    if (!contact) {
      return res.status(404).json({
        message: `Contact not found`,
      });
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,

      data: contact,
    });
  });
  //
  //
  //
  //
  app.use((error, req, res, next) => {
    res.status(404).json({
    
      message: 'Contact not found',
    });
    next();
  });

  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  const PORT = getEnvVar(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
