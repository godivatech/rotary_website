const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
    console.error("Missing Cloudinary configuration in .env file!");
    process.exit(1);
}

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
});

const getFilesRecursively = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const name = path.join(dir, file);
        if (fs.statSync(name).isDirectory()) {
            getFilesRecursively(name, fileList);
        } else {
            // Ignore archives and system files
            if (!file.endsWith('.rar') && !file.endsWith('.zip') && !file.endsWith('.7z') && file !== '.DS_Store') {
                fileList.push(name);
            }
        }
    }
    return fileList;
};

const sanitizePath = (str) => {
    // Replace backslashes with slashes, then spaces with underscores
    return str.replace(/\\/g, '/').replace(/ /g, '_');
};

const uploadImages = async () => {
    const imagesDir = path.join(__dirname, 'public', 'images');
    if (!fs.existsSync(imagesDir)) {
        console.error("Could not find public/images directory!");
        return;
    }

    console.log("Scanning public/images for files...");
    const files = getFilesRecursively(imagesDir);
    console.log(`Found ${files.length} images to upload.`);

    for (let i = 0; i < files.length; i++) {
        const filePath = files[i];
        
        // Get relative path from 'public/' (e.g. 'images/RCM president/1938-1939 Sir James Doak.jpg')
        const relativePath = path.relative(path.join(__dirname, 'public'), filePath);
        
        // Remove extension for public_id
        const parsed = path.parse(relativePath);
        const relativePathWithoutExt = path.join(parsed.dir, parsed.name);
        
        // Construct public_id with websites prefix and underscores
        const publicId = sanitizePath(`websites/rotary-website/${relativePathWithoutExt}`);

        console.log(`[${i + 1}/${files.length}] Uploading ${parsed.base} -> Public ID: ${publicId}...`);
        
        try {
            await cloudinary.uploader.upload(filePath, {
                public_id: publicId,
                overwrite: true,
                invalidate: true,
                unique_filename: false, // Do not append random suffix
                resource_type: 'auto'
            });
            console.log(`Successfully uploaded: ${publicId}`);
        } catch (error) {
            console.error(`Failed to upload ${parsed.base}:`, error.message);
        }
    }

    console.log("\nAll uploads completed!");
};

uploadImages();
