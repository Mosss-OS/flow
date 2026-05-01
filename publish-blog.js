import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAT = process.env.HASHNODE_PAT;
const PUB_ID = process.env.HASHNODE_PUB_ID;
const POST_PATH = path.resolve(__dirname, 'blog-post.md');

if (!PAT || !PUB_ID) {
  console.error('❌ Missing HASHNODE_PAT or HASHNODE_PUB_ID in .env');
  process.exit(1);
}

// Parse frontmatter and content
const content = fs.readFileSync(POST_PATH, 'utf-8');
const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!fmMatch) {
  console.error('❌ Invalid frontmatter in blog-post.md');
  process.exit(1);
}

const fmLines = fmMatch[1].split('\n');
const body = fmMatch[2];

const fm = {};
fmLines.forEach(line => {
  const [key, ...vals] = line.split(':');
  if (key && vals.length) fm[key.trim()] = vals.join(':').trim().replace(/^"|"$/g, '');
});

const title = fm.title || 'Untitled Post';
const subtitle = fm.subtitle || '';
const tagsRaw = (fm.tags || '').split(',').map(t => t.trim()).filter(Boolean);
const tags = tagsRaw.map(t => ({ name: t.replace(/^\[|\]$/g, ''), slug: t.toLowerCase().replace(/^\[|\]$/g, '').replace(/\s+/g, '-') }));
const cover = fm.cover || '';

console.log(`📝 Publishing: "${title}"`);
console.log(`Tags: ${tags.map(t => t.name).join(', ')}\n`);

// GraphQL mutation - using correct publishPost with proper types
const payload = {
  query: `
    mutation PublishPost($input: PublishPostInput!) {
      publishPost(input: $input) {
        post {
          id
          slug
        }
      }
    }
  `,
  variables: {
    input: {
      publicationId: PUB_ID,
      title,
      subtitle,
      contentMarkdown: body,
      tags,
      ...(cover && {
        coverImageOptions: {
          coverImageURL: cover,
        },
      }),
    },
  },
};

// Send request
const response = await fetch('https://gql.hashnode.com/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: PAT,
  },
  body: JSON.stringify(payload),
});

const result = await response.json();

if (result.errors) {
  console.error('❌ Publish failed:', JSON.stringify(result.errors, null, 2));
  process.exit(1);
}

const post = result.data.publishPost.post;
console.log(`✅ Published successfully!`);
console.log(`📄 Post ID: ${post.id}`);
console.log(`🔗 Slug: ${post.slug}`);
console.log(`\n🌐 Your article will be live at:`);
console.log(`   https://your-subdomain.hashnode.dev/${post.slug}`);
console.log(`\n💡 Replace "your-subdomain" with your actual Hashnode subdomain`);
