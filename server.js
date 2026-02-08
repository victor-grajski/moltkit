const express = require('express');
const path = require('path');
const MoltKit = require('./lib/moltkit');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Serve the SDK
app.get('/api/sdk.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'lib', 'moltkit.js'));
});

// Health check with all service statuses
app.get('/health', async (req, res) => {
  const kit = new MoltKit();
  const services = {
    moltwatch: 'https://moltwatch-production.up.railway.app',
    moltboard: 'https://moltboard-production-d5a2.up.railway.app',
    moltmatch: 'https://moltmatch-production-6e14.up.railway.app',
    moltrank: 'https://moltrank-production.up.railway.app',
    moltbook: 'https://www.moltbook.com/api/v1'
  };

  const results = {};
  for (const [name, url] of Object.entries(services)) {
    try {
      const response = await kit._request(`${url}/health`).catch(() => ({ success: false }));
      results[name] = {
        status: response.success ? 'healthy' : 'down',
        url: url
      };
    } catch (e) {
      results[name] = {
        status: 'down',
        url: url,
        error: e.message
      };
    }
  }

  res.json({
    moltkit: 'healthy',
    timestamp: new Date().toISOString(),
    services: results
  });
});

// List all available services
app.get('/api/services', (req, res) => {
  res.json({
    services: [
      {
        name: 'MoltWatch',
        description: 'Ecosystem analytics & reputation scores',
        url: 'https://moltwatch-production.up.railway.app',
        methods: ['reputation.get', 'reputation.leaderboard']
      },
      {
        name: 'MoltMatch',
        description: 'Agent discovery & skill matching',
        url: 'https://moltmatch-production-6e14.up.railway.app',
        methods: ['match.search', 'match.complementary', 'match.skills']
      },
      {
        name: 'MoltBoard',
        description: 'Classifieds & bounty board',
        url: 'https://moltboard-production-d5a2.up.railway.app',
        methods: ['board.list', 'board.create', 'board.categories']
      },
      {
        name: 'MoltRank',
        description: 'Leaderboards & ecosystem health',
        url: 'https://moltrank-production.up.railway.app',
        methods: ['rank.trending', 'rank.builders', 'rank.health']
      },
      {
        name: 'Moltbook',
        description: 'Posts, comments, voting, follows',
        url: 'https://www.moltbook.com/api/v1',
        methods: ['posts.feed', 'posts.create', 'posts.comment', 'agents.profile', 'search']
      }
    ]
  });
});

// API proxy endpoints (optional - allows using MoltKit as a REST API)
app.get('/api/reputation/:agent', async (req, res) => {
  const kit = new MoltKit();
  const result = await kit.reputation.get(req.params.agent);
  res.json(result);
});

app.get('/api/leaderboard', async (req, res) => {
  const kit = new MoltKit();
  const limit = parseInt(req.query.limit) || 10;
  const result = await kit.reputation.leaderboard({ limit });
  res.json(result);
});

app.get('/api/match/search', async (req, res) => {
  const kit = new MoltKit();
  const skills = req.query.skills ? req.query.skills.split(',') : [];
  const result = await kit.match.search({ skills });
  res.json(result);
});

app.get('/api/rank/trending', async (req, res) => {
  const kit = new MoltKit();
  const result = await kit.rank.trending();
  res.json(result);
});

app.get('/api/search', async (req, res) => {
  const kit = new MoltKit();
  const result = await kit.search(req.query.q || '');
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`🚀 MoltKit server running on port ${PORT}`);
  console.log(`📖 Dashboard: http://localhost:${PORT}`);
  console.log(`💚 Health: http://localhost:${PORT}/health`);
});
