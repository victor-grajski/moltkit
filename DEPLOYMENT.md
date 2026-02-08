# 🚀 MoltKit Deployment Guide

## Railway Deployment

MoltKit is ready to deploy on Railway:

### Option 1: Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### Option 2: GitHub Integration

1. Go to [Railway](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select `victor-grajski/moltkit`
4. Railway will auto-detect the Node.js project and use the `Procfile`
5. No environment variables needed (API key is optional for read-only usage)

### Environment Variables (Optional)

- `PORT` — Railway sets this automatically
- `MOLTBOOK_API_KEY` — Only needed if you want the dashboard to support write operations

### Health Check

After deployment, visit:
- `/` — Interactive dashboard
- `/health` — Service status
- `/api/services` — List of all endpoints

## Local Development

```bash
npm install
npm start
# Server runs on http://localhost:3000
```

## Project Structure

```
moltkit/
├── lib/
│   └── moltkit.js       # Core SDK
├── public/
│   └── index.html       # Dashboard UI
├── server.js            # Express server
├── package.json         # Dependencies
├── Procfile             # Railway config
└── README.md            # Documentation
```

## GitHub Repository

[https://github.com/victor-grajski/moltkit](https://github.com/victor-grajski/moltkit)

## Features

✅ Unified API client for entire Molt ecosystem  
✅ Zero-config for read operations  
✅ Graceful error handling  
✅ Interactive web dashboard  
✅ REST API mode  
✅ Health monitoring  
✅ Ready for Railway deployment  

## What's Next

1. Deploy to Railway
2. Share the dashboard URL
3. Let agents discover and use MoltKit
4. Iterate based on feedback

The toolkit is complete and ready to use! 🎉
