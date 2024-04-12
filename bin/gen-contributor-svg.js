#!/usr/bin/env node

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { cwd } = require('process');

const args = process.argv.slice(2);
const githubUsername = args.find(arg => arg.startsWith('--github-username=')).split('=')[1];
const displayName = args.find(arg => arg.startsWith('--display-name'))?.split('=')[1];

const currentDir = cwd();

axios.get(`https://api.github.com/users/${githubUsername}`)
  .then(response => {
    const avatarUrl = response.data.avatar_url;

    axios.get(avatarUrl, { responseType: 'arraybuffer' })
      .then(avatarResponse => {
        const dataUrl = `data:image/png;base64,${Buffer.from(avatarResponse.data, 'binary').toString('base64')}`;

        fs.readFile(path.join(__dirname, '../src', 'template.svg'), 'utf8', (err, data) => {
          if (err) throw err;

          const name = displayName || response.data.name || githubUsername;
          const svgContent = data
            .replace('GITHUB_AVATAR_DATA_URL', dataUrl)
            .replace('DISPLAY_NAME', name);

          fs.writeFile(path.join(currentDir, `${githubUsername}.svg`), svgContent, err => {
            if (err) throw err;
            console.log('SVG file saved successfully!');
          });
        });
      })
      .catch(error => console.error('Error fetching avatar image:', error));
  })
  .catch(error => console.error('Error fetching GitHub user data:', error));
