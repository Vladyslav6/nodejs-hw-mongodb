// import express from 'express';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
await initMongoConnection();
setupServer();
