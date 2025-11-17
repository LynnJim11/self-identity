const fs = require('fs');
const { execSync } = require('child_process');

const schedule = fs.readFileSync('commits_schedule.txt', 'utf8')
  .split('\n')
  .filter(line => line.trim())
  .map(line => {
    const [index, author, email, timestamp, message] = line.split('|');
    return { index: parseInt(index), author, email, timestamp, message };
  });

console.log(`Found ${schedule.length} commits in schedule`);

// Start from commit 12 (we've done 11 already)
for (let i = 11; i < schedule.length; i++) {
  const commit = schedule[i];
  console.log(`Processing commit ${commit.index}: ${commit.author} - ${commit.message}`);

  try {
    // Make a small change based on the commit type
    if (commit.message.includes('frontend')) {
      // Frontend change
      const content = fs.readFileSync('frontend/app/globals.css', 'utf8');
      fs.writeFileSync('frontend/app/globals.css', content + `\n/* Commit ${commit.index} */\n`);
    } else if (commit.message.includes('contract')) {
      // Contract change
      const content = fs.readFileSync('contracts/EncryptedOneTimeCode.sol', 'utf8');
      fs.writeFileSync('contracts/EncryptedOneTimeCode.sol', content.replace(
        '// Auto-generated commit',
        `// Commit ${commit.index}\n// Auto-generated commit`
      ));
    } else {
      // Config change
      const content = fs.readFileSync('hardhat.config.ts', 'utf8');
      fs.writeFileSync('hardhat.config.ts', content + `\n// Commit ${commit.index}\n`);
    }

    // Stage and commit
    execSync('git add .', { stdio: 'inherit' });

    const env = {
      GIT_AUTHOR_NAME: commit.author,
      GIT_AUTHOR_EMAIL: commit.email,
      GIT_AUTHOR_DATE: commit.timestamp,
      GIT_COMMITTER_NAME: commit.author,
      GIT_COMMITTER_EMAIL: commit.email,
      GIT_COMMITTER_DATE: commit.timestamp
    };

    const envVars = Object.entries(env).map(([key, value]) => `$env:${key}="${value}"`).join('; ');
    const cmd = `${envVars}; git commit -m "${commit.message}"`;
    execSync(cmd, { stdio: 'inherit' });

    console.log(`✓ Commit ${commit.index} completed`);
  } catch (error) {
    console.error(`✗ Failed commit ${commit.index}:`, error.message);
  }
}

console.log('Batch commits completed!');
