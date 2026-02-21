const https = require('https');
https.get('https://docs.google.com/forms/d/e/1FAIpQLSfUArOaXOifEqZ4eRLwjaaaDKPZ_GYAwOHI7BDNn7dEiZJlQA/viewform', (resp) => {
    let data = '';
    resp.on('data', (chunk) => { data += chunk; });
    resp.on('end', () => {
        const fs = require('fs');
        fs.writeFileSync('form.txt', data);
    });
});
