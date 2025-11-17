const fs = require('fs');
const path = require('path');

// Configuration
const START_DATE = new Date('2025-11-10T09:00:00-08:00'); // PST timezone
const END_DATE = new Date('2025-11-20T17:00:00-08:00'); // PST timezone
const TOTAL_COMMITS = 24; // 4 + 20 commits

function generateRandomTimestamp(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function formatGitTimestamp(date) {
  // Format for GIT_AUTHOR_DATE and GIT_COMMITTER_DATE
  // RFC2822 format: "Wed, 21 Oct 2015 07:28:00 -0700"
  return date.toUTCString();
}

function formatConventionalCommit(commitIndex, author) {
  // Phase 1: First 4 commits - setup phase
  if (commitIndex <= 4) {
    const phase1Commits = [
      'feat(contract): implement encrypted one-time code contract',
      'fix(contract): add input validation and security checks',
      'refactor(contract): optimize gas usage and code structure',
      'feat(frontend): implement basic UI components and hooks'
    ];
    return phase1Commits[commitIndex - 1];
  }

  // Phase 2: Commits 5-24 - bug fixes and improvements
  const types = ['feat', 'fix', 'refactor', 'docs', 'style', 'test', 'chore'];
  const scopes = author === 'ChaselTaylor' ? ['contract', 'config', 'deploy', 'test'] : ['frontend', 'config', 'deploy'];
  const descriptions = [
    'implement core functionality',
    'add error handling',
    'update configuration',
    'fix validation logic',
    'improve performance',
    'add new features',
    'refactor code structure',
    'update dependencies',
    'fix security issues',
    'add tests',
    'update documentation',
    'improve UI components',
    'optimize gas usage',
    'add input validation',
    'fix deployment issues',
    'resolve null pointer issues',
    'add missing null checks',
    'fix state management bugs',
    'improve type safety',
    'enhance user experience'
  ];

  const type = types[Math.floor(Math.random() * types.length)];
  const scope = scopes[Math.floor(Math.random() * scopes.length)];
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];

  return `${type}(${scope}): ${description}`;
}

function generateCommits() {
  const commits = [];
  let currentAuthor = 'ChaselTaylor'; // Start with contract author
  let currentEmail = 'hlcohff678754@outlook.com';
  let commitsByCurrentAuthor = 0;

  for (let i = 0; i < TOTAL_COMMITS; i++) {
    const timestamp = generateRandomTimestamp(START_DATE, END_DATE);

    // Phase 1: First 4 commits have fixed authors
    let author, email;
    if (i < 3) { // First 3 commits by contract author
      author = 'ChaselTaylor';
      email = 'hlcohff678754@outlook.com';
    } else if (i === 3) { // 4th commit by UI author
      author = 'LynnJim11';
      email = 'qvonsci7667017@outlook.com';
    } else {
      // Phase 2: Random alternation
      author = currentAuthor;
      email = currentEmail;
    }

    commits.push({
      index: i + 1,
      author,
      email,
      timestamp: formatGitTimestamp(timestamp),
      message: formatConventionalCommit(i + 1, author)
    });

    // Update current author for phase 2
    if (i >= 3) {
      commitsByCurrentAuthor++;

      // Randomly switch author after 1-3 commits
      if (commitsByCurrentAuthor >= Math.floor(Math.random() * 3) + 1) {
        currentAuthor = currentAuthor === 'ChaselTaylor' ? 'LynnJim11' : 'ChaselTaylor';
        currentEmail = currentEmail === 'hlcohff678754@outlook.com' ? 'qvonsci7667017@outlook.com' : 'hlcohff678754@outlook.com';
        commitsByCurrentAuthor = 0;
      }
    }
  }

  return commits;
}

function saveToFile(commits) {
  const output = commits.map(commit =>
    `${commit.index}|${commit.author}|${commit.email}|${commit.timestamp}|${commit.message}`
  ).join('\n');

  fs.writeFileSync('commits_schedule.txt', output);
  console.log('Generated commits schedule saved to commits_schedule.txt');
}

const commits = generateCommits();
saveToFile(commits);
