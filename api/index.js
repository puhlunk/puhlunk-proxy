require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['https://puhlunk.com', 'http://localhost:5500'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy restriction'), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());

app.all('/api/printify', async (req, res) => {
  try {
    const endpoint = req.query.endpoint;
    
    if (!endpoint) {
      return res.status(400).json({ error: 'Missing endpoint parameter' });
    }
    
    const url = `https://api.printify.com/v1/${endpoint}`;
    
    const config = {
      method: req.method,
      url: url,
      headers: {
        'Authorization': `Bearer ${process.env.PRINTIFY_API_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'PUHLUNK-Store'
      }
    };
    
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      config.data = req.body;
    }
    
    const response = await axios(config);
    res.status(response.status).json(response.data);
    
  } catch (error) {
    console.error('Proxy error:', error.message);
    
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Proxy server error', message: error.message });
    }
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'PUHLUNK Printify Proxy Server' });
});

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;