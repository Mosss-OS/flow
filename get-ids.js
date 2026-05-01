import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const PAT = process.env.HASHNODE_PAT;

if (!PAT) {
  console.log('\n❌ No HASHNODE_PAT found in .env');
  console.log('1. Go to: https://hashnode.com/settings/access-tokens');
  console.log('2. Create token with "Posts: Write" permission');
  console.log('3. Add to .env: HASHNODE_PAT=your_token_here\n');
  process.exit(1);
}

const query = {
  query: `{ me { publications { _id, subdomain } } }`
};

const response = await fetch('https://api.hashnode.com/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': PAT,
  },
  body: JSON.stringify(query),
});

const result = await response.json();
if (result.errors) {
  console.error('Error:', result.errors);
  process.exit(1);
}

console.log('\n✅ Your Publications:\n');
result.data.me.publications.forEach(pub => {
  console.log(`_id: ${pub._id}`);
  console.log(`subdomain: ${pub.subdomain}\n`);
});
console.log('Add to .env:');
console.log(`HASHNODE_PUB_ID=${result.data.me.publications[0]._id}\n`);
