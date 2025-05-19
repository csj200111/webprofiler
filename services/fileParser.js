const fs = require('fs');

function parseInputFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const result = [];
  let tasks = [];
  
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return; // 빈 줄은 무시

    const parts = trimmed.split(/\s+/);

    if (parts[0].startsWith('task')) {
      tasks = parts;
    } else if (parts[0].startsWith('core')) {
      const core = parts[0];
      parts.slice(1).forEach((value, idx) => {
        if (tasks[idx]) {
          result.push({
            core,
            task: tasks[idx],
            usaged: parseInt(value),
          });
        }
      });
    }
  });

  return result;
}

module.exports = { parseInputFile };
