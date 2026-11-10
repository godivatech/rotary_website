const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
    console.error("❌ Missing Cloudinary configuration in .env file!");
    process.exit(1);
}

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const eventsToUpload = [
    {
        localFolder: "rotary club 89th installation",
        cloudinaryFolder: "89th_installation"
    },
    {
        localFolder: "ROTARY CLUB toilet inaguration",
        cloudinaryFolder: "toilet_inauguration"
    }
];

async function uploadAllEvents() {
    for (const ev of eventsToUpload) {
        const dirPath = path.join(__dirname, 'public', 'images', ev.localFolder);

        if (!fs.existsSync(dirPath)) {
            console.error(`❌ Directory not found: ${dirPath}`);
            continue;
        }

        const files = fs.readdirSync(dirPath).filter(file => {
            const lower = file.toLowerCase();
            return lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png');
        });

        files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

        console.log(`\n======================================================`);
        console.log(`📸 Uploading "${ev.localFolder}" (${files.length} images)`);
        console.log(`📂 Destination: websites/rotary-website/gallery/${ev.cloudinaryFolder}/`);
        console.log(`======================================================\n`);

        for (let i = 0; i < files.length; i++) {
            const fileName = files[i];
            const filePath = path.join(dirPath, fileName);
            
            // Clean filename to standard alphanumeric public_id
            const cleanBase = fileName
                .replace(/\.[a-zA-Z0-9.]+$/, '')
                .replace(/[^a-zA-Z0-9_-]/g, '_')
                .replace(/_+/g, '_')
                .replace(/^_|_$/g, '');

            const publicId = `websites/rotary-website/gallery/${ev.cloudinaryFolder}/${cleanBase}`;

            process.stdout.write(`[${i + 1}/${files.length}] Uploading ${fileName} -> ${cleanBase} ... `);

            try {
                const result = await cloudinary.uploader.upload(filePath, {
                    public_id: publicId,
                    overwrite: true,
                    resource_type: 'image'
                });

                console.log(`✅ OK (${(result.bytes / 1024).toFixed(1)} KB)`);
            } catch (error) {
                console.log(`❌ Error: ${error.message}`);
            }

            await sleep(200);
        }

        console.log(`\n🎉 Finished uploading "${ev.localFolder}"!`);
    }

    console.log(`\n======================================================`);
    console.log(`🚀 All events uploaded successfully to Cloudinary!`);
    console.log(`======================================================\n`);
}

uploadAllEvents();

