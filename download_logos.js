import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'public', 'images', 'klien');

const logos = {
    'bca.png': 'https://logo.clearbit.com/bca.co.id',
    'bri.png': 'https://logo.clearbit.com/bri.co.id',
    'pln.png': 'https://logo.clearbit.com/pln.co.id',
    'pertamina.png': 'https://logo.clearbit.com/pertamina.com',
    'wika.png': 'https://logo.clearbit.com/wika.co.id',
    'astra.png': 'https://logo.clearbit.com/astra.co.id',
    'jll.png': 'https://logo.clearbit.com/jll.co.id',
    'sinarmas.png': 'https://logo.clearbit.com/sinarmasland.com',
    'schneider.png': 'https://logo.clearbit.com/se.com',
    'bosch.png': 'https://logo.clearbit.com/bosch.com',
    'hilti.png': 'https://logo.clearbit.com/hilti.com',
    'dulux.png': 'https://logo.clearbit.com/dulux.co.id',
    'daikin.png': 'https://logo.clearbit.com/daikin.co.id',
    'toto.png': 'https://logo.clearbit.com/toto.com',
    'legrand.png': 'https://logo.clearbit.com/legrand.com',
    '3m.png': 'https://logo.clearbit.com/3m.com'
};

const download = async (filename, url) => {
    try {
        const dest = path.join(dir, filename);
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        
        if (!response.ok) {
            console.log(`Failed ${filename}: ${response.status} ${response.statusText}`);
            return false;
        }
        
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(dest, buffer);
        console.log(`Downloaded ${filename}`);
        return true;
    } catch (err) {
        console.log(`Error ${filename}: ${err.message}`);
        return false;
    }
};

async function main() {
    console.log('Downloading clearbit logos...');
    for (const [filename, url] of Object.entries(logos)) {
        await download(filename, url);
    }
    console.log('All downloads completed!');
}

main();
