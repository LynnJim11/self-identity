// 生成提交计划的脚本
function generateCommitPlan() {
  const startTime = new Date('2025-11-01T09:00:00-08:00'); // PST
  const endTime = new Date('2025-11-10T17:00:00-08:00'); // PST

  const authors = [
    { name: 'LynnJim11', email: 'qvonsci7667017@outlook.com' },
    { name: 'ChaselTaylor', email: 'hlcohff678754@outlook.com' }
  ];

  const commits = [];
  let currentTime = new Date(startTime);
  let currentAuthorIndex = 0;
  let consecutiveCount = 0;
  let maxConsecutive = Math.floor(Math.random() * 4) + 1; // 1-4次

  const fileCategories = {
    // 项目配置 (两个作者都可以)
    'project-config': [
      '.gitignore',
      'package.json',
      'package-lock.json',
      'tsconfig.json',
      '.prettierrc.yml',
      '.solcover.js'
    ],

    // Hardhat配置 (ChaselTaylor)
    'hardhat-config': [
      'hardhat.config.ts',
      '.eslintrc.yml'
    ],

    // FHEVM类型定义 (两个作者)
    'fhevm-types': [
      'types/@fhevm/index.ts',
      'types/@fhevm/solidity/index.ts',
      'types/@fhevm/solidity/lib/index.ts',
      'types/@fhevm/solidity/config/index.ts'
    ],

    // 合约开发 (ChaselTaylor)
    'contracts': [
      'contracts/EncryptedOneTimeCode.sol'
    ],

    // 部署脚本 (ChaselTaylor)
    'deploy': [
      'deploy/deploy.ts'
    ],

    // 任务脚本 (ChaselTaylor)
    'tasks': [
      'tasks/accounts.ts',
      'tasks/EncryptedOneTimeCode.ts'
    ],

    // 测试文件 (ChaselTaylor)
    'tests': [
      'test/EncryptedOneTimeCode.ts',
      'test/EncryptedOneTimeCodeSepolia.ts'
    ],

    // 前端基础 (LynnJim11)
    'frontend-base': [
      'frontend/package.json',
      'frontend/package-lock.json',
      'frontend/tsconfig.json',
      'frontend/next.config.ts',
      'frontend/tailwind.config.ts',
      'frontend/postcss.config.mjs',
      'frontend/next-env.d.ts'
    ],

    // 前端应用结构 (LynnJim11)
    'frontend-app': [
      'frontend/app/layout.tsx',
      'frontend/app/page.tsx',
      'frontend/app/globals.css',
      'frontend/app/providers.tsx',
      'frontend/app/icon.svg'
    ],

    // 前端组件 (LynnJim11)
    'frontend-components': [
      'frontend/components/WalletButton.tsx',
      'frontend/components/OneTimeCodeVerification.tsx',
      'frontend/components/ErrorNotDeployed.tsx',
      'frontend/components/ErrorFilterScript.tsx'
    ],

    // 前端hooks (LynnJim11)
    'frontend-hooks': [
      'frontend/hooks/useRainbowWallet.tsx',
      'frontend/hooks/useOneTimeCode.tsx',
      'frontend/hooks/useInMemoryStorage.tsx'
    ],

    // 前端FHEVM集成 (LynnJim11)
    'frontend-fhevm': [
      'frontend/fhevm/useFhevm.tsx',
      'frontend/fhevm/FhevmDecryptionSignature.ts',
      'frontend/fhevm/fhevmTypes.ts',
      'frontend/fhevm/GenericStringStorage.ts'
    ],

    // 前端FHEVM内部 (LynnJim11)
    'frontend-fhevm-internal': [
      'frontend/fhevm/internal/constants.ts',
      'frontend/fhevm/internal/fhevm.ts',
      'frontend/fhevm/internal/fhevmTypes.ts',
      'frontend/fhevm/internal/PublicKeyStorage.ts',
      'frontend/fhevm/internal/RelayerSDKLoader.ts'
    ],

    // 前端FHEVM模拟 (LynnJim11)
    'frontend-fhevm-mock': [
      'frontend/fhevm/internal/mock/fhevmMock.ts'
    ],

    // 前端工具和脚本 (LynnJim11)
    'frontend-utils': [
      'frontend/utils/errorFilter.ts',
      'frontend/scripts/genabi.mjs'
    ],

    // 前端ABI和地址 (LynnJim11)
    'frontend-abi': [
      'frontend/abi/EncryptedOneTimeCodeABI.ts',
      'frontend/abi/EncryptedOneTimeCodeAddresses.ts'
    ],

    // 前端静态资源 (LynnJim11)
    'frontend-public': [
      'frontend/public/logo.svg',
      'frontend/vercel.json',
      'frontend/README_VERCEL.md'
    ],

    // 部署构件 (两个作者)
    'artifacts': [
      'artifacts/contracts/EncryptedOneTimeCode.sol/EncryptedOneTimeCode.json',
      'artifacts/contracts/EncryptedOneTimeCode.sol/EncryptedOneTimeCode.dbg.json'
    ],

    // 缓存文件 (两个作者)
    'cache': [
      'cache/solidity-files-cache.json'
    ],

    // 部署文件 (两个作者)
    'deployments': [
      'deployments/localhost/EncryptedOneTimeCode.json',
      'deployments/sepolia/EncryptedOneTimeCode.json'
    ],

    // 类型定义工厂 (两个作者)
    'type-factories': [
      'types/contracts/index.ts',
      'types/factories/contracts/index.ts',
      'types/factories/@fhevm/index.ts'
    ],

    // 通用类型 (两个作者)
    'common-types': [
      'types/common.ts',
      'types/contracts/EncryptedOneTimeCode.ts',
      'types/hardhat.d.ts',
      'types/index.ts'
    ],

    // 文档 (两个作者)
    'docs': [
      'README.md',
      'identity.mp4'
    ]
  };

  // Conventional commit types
  const commitTypes = ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'build', 'ci', 'perf'];

  // Generate 30 commits
  for (let i = 1; i <= 30; i++) {
    const author = authors[currentAuthorIndex];

    // Select files for this commit (1-5 files from different categories)
    const availableCategories = Object.keys(fileCategories).filter(cat => {
      // Filter categories based on author
      if (author.name === 'ChaselTaylor') {
        return !cat.startsWith('frontend-') || cat === 'project-config' || cat === 'fhevm-types' ||
               cat === 'artifacts' || cat === 'cache' || cat === 'deployments' ||
               cat === 'type-factories' || cat === 'common-types' || cat === 'docs';
      } else {
        return cat.startsWith('frontend-') || cat === 'project-config' || cat === 'fhevm-types' ||
               cat === 'artifacts' || cat === 'cache' || cat === 'deployments' ||
               cat === 'type-factories' || cat === 'common-types' || cat === 'docs';
      }
    });

    const selectedCategories = [];
    const numCategories = Math.min(Math.floor(Math.random() * 3) + 1, availableCategories.length);
    for (let j = 0; j < numCategories; j++) {
      const category = availableCategories.splice(Math.floor(Math.random() * availableCategories.length), 1)[0];
      selectedCategories.push(category);
    }

    const selectedFiles = [];
    selectedCategories.forEach(cat => {
      const files = fileCategories[cat];
      if (files) {
        const numFiles = Math.min(Math.floor(Math.random() * 3) + 1, files.length);
        for (let j = 0; j < numFiles; j++) {
          const file = files[Math.floor(Math.random() * files.length)];
          if (!selectedFiles.includes(file)) {
            selectedFiles.push(file);
          }
        }
      }
    });

    // Generate commit message
    const commitType = commitTypes[Math.floor(Math.random() * commitTypes.length)];
    const scopes = ['core', 'ui', 'contract', 'config', 'build', 'test', 'deploy', 'types', 'docs'];
    const scope = scopes[Math.floor(Math.random() * scopes.length)];

    const messages = [
      'add initial implementation',
      'implement core functionality',
      'update configuration settings',
      'add new feature support',
      'fix compatibility issues',
      'optimize performance',
      'refactor code structure',
      'add error handling',
      'update dependencies',
      'improve documentation',
      'add testing utilities',
      'update build scripts',
      'fix deployment issues',
      'add type definitions',
      'update UI components',
      'implement validation logic',
      'add security improvements',
      'optimize bundle size',
      'update API integration',
      'fix styling issues'
    ];

    const message = messages[Math.floor(Math.random() * messages.length)];
    const commitMessage = `${commitType}(${scope}): ${message}`;

    commits.push({
      id: i,
      author: author.name,
      email: author.email,
      timestamp: new Date(currentTime),
      message: commitMessage,
      files: selectedFiles
    });

    // Update time (91 minutes to 12 hours)
    const minutesToAdd = Math.floor(Math.random() * (12 * 60 - 91)) + 91; // 91 to 720 minutes
    currentTime = new Date(currentTime.getTime() + minutesToAdd * 60 * 1000);

    // Ensure not on the hour
    if (currentTime.getMinutes() === 0) {
      currentTime.setMinutes(Math.floor(Math.random() * 59) + 1);
    }

    // Switch author logic
    consecutiveCount++;
    if (consecutiveCount >= maxConsecutive) {
      currentAuthorIndex = (currentAuthorIndex + 1) % 2;
      consecutiveCount = 0;
      maxConsecutive = Math.floor(Math.random() * 4) + 1; // 1-4次
    }

    // Check if we've exceeded the time range
    if (currentTime > endTime) {
      break;
    }
  }

  return commits;
}

const commits = generateCommitPlan();
console.log(JSON.stringify(commits, null, 2));
