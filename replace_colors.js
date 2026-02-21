const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (file.endsWith('.tsx') || file.endsWith('.css') || file.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf-8');
            let originalContent = content;

            // Component class matches
            content = content.replace(/neon-cyan/g, 'tech-turquoise');
            content = content.replace(/neon-purple/g, 'coral-accent');
            content = content.replace(/dark-bg/g, 'navy-bg');

            // Hardcoded Colors in index.css
            content = content.replace(/#00F5FF/g, '#00D1C7');
            content = content.replace(/#A855F7/g, '#FF3B4A');
            content = content.replace(/#050510/g, '#0B1F2D');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf-8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

replaceInDir(srcDir);
console.log('Done replacement.');
