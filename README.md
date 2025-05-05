# PUHLUNK Printify Proxy

A secure proxy server for communicating with Printify API from the PUHLUNK store.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your Printify API key and allowed origins
4. Run locally: `npm run dev`

## Deployment

This proxy is designed to be deployed on Vercel.

## API Usage

Send requests to `/api/printify?endpoint=YOUR_ENDPOINT_HERE` where `YOUR_ENDPOINT_HERE` is the Printify API endpoint without the base URL.

Example:
/api/printify?endpoint=shops.json

## Security

- Your API key is stored in environment variables, not in code
- CORS is configured to only allow requests from specified origins
- All traffic is passed through HTTPS