---
title: "Breaking Things with AI: How I Built a Self-Healing E-Commerce Test Suite"
subtitle: "Using Passmark + Playwright to regression-test Vercel Commerce with natural language tests — no fragile selectors required."
date: 2026-05-01
tags: [AI, Testing, Playwright, Passmark, Hackathon, E-Commerce, DevRel, TypeScript, BreakingAppsHackathon]
cover: https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop
---

## Why I Chose This Project

When I saw the **[Breaking Things / Breaking Apps Hackathon](https://hashnode.com/hackathons/breaking-things)** on Hashnode, I knew I wanted to build something that genuinely "breaks things to make them stronger." As a Fullstack Developer and AI DevRel, I've spent countless hours fixing brittle Playwright tests that break the moment a CSS class changes.

Then I discovered **[Passmark](https://github.com/bug0inc/passmark)** — an open-source Playwright library that lets you write tests in **plain English**, with auto-healing, multi-model AI verification, and intelligent caching.

I decided to build a **minimal, complete regression test suite for Vercel Commerce** (`demo.vercel.store`) — a real-world Next.js e-commerce app with product variants, cart logic, checkout flows, and responsive design. The result is `flow`: a one-syllable, lightweight repo that packages all the power of AI-native testing.

---

## Technical Deep-Dive

### The Stack
- **Playwright** (foundation for browser automation)
- **Passmark** (AI-native test orchestration)
- **TypeScript** (type-safe, readable test code)
- **Redis** (optional caching layer to reduce AI costs)
- **Multi-model AI**: Anthropic Claude + Google Gemini for consensus assertions

### Minimal Repo Structure
The `flow` repo is intentionally simple:
```
flow/
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
├── tests/
│   └── commerce.spec.ts  # All core flows in one file
└── README.md
```

### How Passmark Changed My Testing Approach

#### Traditional Playwright Test
```typescript
await page.locator('[data-testid="product-card"]').first().click();
await page.locator('#add-to-cart-btn').click();
await expect(page.locator('.cart-badge')).toHaveText('1');
```

#### Passmark Test (Plain English!)
```typescript
await passmark.runUserFlow(page, [
  'Click on the first product card',
  'Click the Add to Cart button',
  'Verify the cart badge shows 1 item'
], { assertion: 'Product was added to cart successfully' });
```

No selectors to maintain. No brittle test code. When the UI changes, Passmark's **auto-healing** kicks in and repairs the step using AI vision + DOM understanding.

### Key Features Implemented

#### 1. Natural Language Steps
Every test reads like a user story. Passmark translates English into Playwright actions using AI:

```typescript
await passmark.runUserFlow(page, [
  'Search for "hoodie" using the search bar',
  'Apply a price filter (low to high)',
  'Verify results match "hoodie" and are sorted by price'
]);
```

#### 2. Multi-Model Assertions
I used **consensus verification** across two AI models:
```typescript
await passmark.assert(page, 'Verify this product page looks professional', {
  models: ['anthropic', 'google'],
  consensus: 'majority'
});
```

This reduces false positives compared to a single model's judgment.

#### 3. Auto-Healing Dynamic UIs
Passmark detected when Vercel Commerce updated a button's selector and automatically found the new element — no test code changes needed.

#### 4. Intelligent Caching with Redis
By enabling Redis caching, repeat test runs cost **$0** for previously seen steps. The AI "remembers" how to perform actions.

---

## Challenges & How Passmark Helped

### Challenge 1: Dynamic Selectors on Vercel Commerce
Vercel Commerce uses dynamic attributes that occasionally change. Traditional Playwright would fail here.

**How Passmark helped**: Auto-healing detected the UI change and found the element using AI vision + semantic understanding.

### Challenge 2: Verifying Complex Visual States
Checking if a product page "looks right" is subjective and hard to assert with traditional code.

**How Passmark helped**: Multi-model assertions from Claude and Gemini provided a consensus "yes/no" on visual quality.

### Challenge 3: Test Maintenance Across Devices
Mobile and desktop layouts differ significantly.

**How Passmark helped**: Natural language steps like `"Verify the mobile menu is visible"` work across viewports without separate test files.

### Challenge 4: AI API Costs
Running AI-powered tests can get expensive.

**How Passmark helped**: Redis caching means repeated steps are free after the first run.

---

## Results & Insights

### Test Coverage
The minimal `commerce.spec.ts` covers 4 core flows:
1. Browse products & navigation
2. Search and filtering
3. Add to cart & checkout simulation
4. Responsive design & auto-healing demo

### Metrics
| Metric | Result |
|--------|--------|
| Test Files | 1 (minimal) |
| Test Cases | 4 core flows |
| Passmark Features Used | 4 (natural language, auto-heal, multi-model, cache) |
| Traditional vs AI Effort | ~3x faster test authoring with Passmark |

### Comparison: Traditional vs Passmark
| Aspect | Traditional Playwright | Passmark (AI-Native) |
|--------|----------------------|----------------------|
| Test Authoring | Selector-based | Plain English |
| Maintenance | High (breaks often) | Low (auto-healing) |
| Visual Assertions | Manual screenshots | AI-powered semantic checks |
| Multi-model Verification | Not built-in | Built-in consensus |

---

## Conclusion

Building this test suite for the Breaking Things Hackathon completely changed how I think about testing. **Passmark doesn't replace Playwright — it supercharges it.**

The ability to write tests in plain English, have them auto-heal when the UI changes, and verify results with multiple AI models is a glimpse into the future of QA engineering.

If you're tired of fixing broken selectors every time your UI changes, give **Passmark** a try. Your future self will thank you.

---

## Links & Resources
- 🎯 **Live Repo**: [github.com/Mosss-OS/flow](https://github.com/Mosss-OS/flow)
- 📦 **Passmark**: [github.com/bug0inc/passmark](https://github.com/bug0inc/passmark)
- 🛒 **Vercel Commerce**: [demo.vercel.store](https://demo.vercel.store)
- 🏆 **Hackathon**: [Breaking Things on Hashnode](https://hashnode.com/hackathons/breaking-things)

---

*Thanks to the Hashnode team and the Passmark maintainers for making this hackathon possible. Now go break some things (and fix them with AI)!* 🚀
