# passmark-commerce-tests

Minimal AI-powered test suite for Vercel Commerce using [Passmark](https://github.com/bug0inc/passmark) + Playwright.

Built for the [Breaking Things Hackathon](https://hashnode.com/hackathons/breaking-things).

## Features
- Natural language test steps
- Auto-healing selectors
- Multi-model AI assertions
- Redis caching (optional)

## Quick Start

```bash
git clone https://github.com/Mosss-OS/flow.git
cd flow
npm install
npx playwright install --with-deps
cp .env.example .env  # add your API keys
npm test
```

## Run Options
- `npm test` — headless
- `npm run test:ui` — UI mode

## Environment
```
ANTHROPIC_API_KEY=sk-ant-xxx
GOOGLE_GENERATIVE_AI_API_KEY=AIza-xxx
REDIS_URL=redis://localhost:6379  # optional
```

## Test Coverage
- Browse products & search
- Cart & checkout flow
- Responsive design
- Auto-healing demo

---
**Author**: [@Mosss-OS](https://github.com/Mosss-OS)  
**Blog**: [Read on Hashnode](https://hashnode.com/your-post)
