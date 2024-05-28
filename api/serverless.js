import { createServer } from "http";
import { parse } from "url";
import app from "./index.js";
import { VercelRequest, VercelResponse } from '@vercel/node';

// Create a server with the Express app
const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  app(req, res);
});

export default (req: VercelRequest, res: VercelResponse) => {
  server.emit('request', req, res);
};