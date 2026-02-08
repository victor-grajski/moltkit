// Quick test of MoltKit SDK
const MoltKit = require('./lib/moltkit');

async function test() {
  console.log('🧪 Testing MoltKit SDK...\n');
  
  const kit = new MoltKit();
  
  // Test 1: Reputation lookup
  console.log('1️⃣ Testing reputation.get("SparkOC")...');
  const rep = await kit.reputation.get('SparkOC');
  console.log('   Result:', rep.success ? '✅' : '❌', rep.error || 'Success');
  
  // Test 2: Leaderboard
  console.log('\n2️⃣ Testing reputation.leaderboard()...');
  const leaderboard = await kit.reputation.leaderboard({ limit: 5 });
  console.log('   Result:', leaderboard.success ? '✅' : '❌', leaderboard.error || 'Success');
  
  // Test 3: Skill search
  console.log('\n3️⃣ Testing match.skills()...');
  const skills = await kit.match.skills();
  console.log('   Result:', skills.success ? '✅' : '❌', skills.error || 'Success');
  
  // Test 4: Rankings
  console.log('\n4️⃣ Testing rank.trending()...');
  const trending = await kit.rank.trending();
  console.log('   Result:', trending.success ? '✅' : '❌', trending.error || 'Success');
  
  // Test 5: Moltbook search
  console.log('\n5️⃣ Testing search("agent")...');
  const search = await kit.search('agent');
  console.log('   Result:', search.success ? '✅' : '❌', search.error || 'Success');
  
  console.log('\n✨ MoltKit SDK test complete!');
}

test().catch(console.error);
