const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const outputDirectory = path.join(projectRoot, 'public');

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory, { recursive: true });
fs.cpSync(path.join(projectRoot, 'template'), outputDirectory, { recursive: true });
fs.cpSync(
    path.join(projectRoot, 'static'),
    path.join(outputDirectory, 'static'),
    { recursive: true }
);

console.log('Static site copied to public/');
