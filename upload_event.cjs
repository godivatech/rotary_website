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

async function uploadDiwaliImages() {
    const eventFolderName = "Diwali celebration 2026";
    const dirPath = path.join(__dirname, 'public', 'images', eventFolderName);

    if (!fs.existsSync(dirPath)) {
        console.error(`❌ Directory not found: ${dirPath}`);
        return;
    }

    const files = fs.readdirSync(dirPath).filter(file => {
        const lower = file.toLowerCase();
        return lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png');
    });

    files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    console.log(`\n======================================================`);
    console.log(`📸 Found ${files.length} images in "${eventFolderName}"`);
    console.log(`🚀 Uploading one-by-one to: websites/rotary-website/gallery/Diwali_celebration_2026/`);
    console.log(`======================================================\n`);

    const uploadedList = [];

    for (let i = 0; i < files.length; i++) {
        const fileName = files[i];
        const filePath = path.join(dirPath, fileName);
        
        // Clean base name: e.g. VJY00537.jpg.jpeg -> VJY00537
        const cleanBaseName = fileName.replace(/\.(jpg|jpeg|png)\.(jpg|jpeg|png)$/i, '').replace(/\.(jpg|jpeg|png)$/i, '');
        const publicId = `websites/rotary-website/gallery/Diwali_celebration_2026/${cleanBaseName}`;

        process.stdout.write(`[${i + 1}/${files.length}] Uploading ${fileName} -> ${cleanBaseName} ... `);

        try {
            const result = await cloudinary.uploader.upload(filePath, {
                public_id: publicId,
                overwrite: true,
                resource_type: 'image'
            });

            console.log(`✅ OK (${result.format}, ${(result.bytes / 1024).toFixed(1)} KB)`);
            uploadedList.push({
                fileName,
                cleanBaseName,
                publicId,
                localPath: `/images/${eventFolderName}/${fileName}`,
                secureUrl: result.secure_url
            });
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }

        await sleep(200);
    }

    console.log(`\n======================================================`);
    console.log(`🎉 All ${uploadedList.length} images uploaded successfully!`);
    console.log(`📂 Folder: websites/rotary-website/gallery/Diwali_celebration_2026/`);
    console.log(`======================================================\n`);
}

uploadDiwaliImages();
