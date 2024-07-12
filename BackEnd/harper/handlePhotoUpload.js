// photoUpload.js
const fs = require('fs');
const mongoose = require('mongoose');

async function handlePhotoUpload(req, res, Model) {
    const id = req.params.id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        if (req.file && req.file.path) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        }
        return res.status(400).json({ msg: "Not a valid ID" });
    }

    // Check if file is uploaded
    if (!req.file) {
        return res.status(400).json({ msg: "No file uploaded" });
    }

    // Validate file type
    if (!req.file.mimetype.startsWith('image')) {
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }
        });
        return res.status(400).json({ msg: "File must be an image" });
    }

    try {
        // Update model with the new photo URL
        const updatedDocument = await Model.findByIdAndUpdate(id, {
            photo: '/' + req.file.filename
        }, { new: true });

        if (!updatedDocument) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
            return res.status(400).json({ msg: "Document not found" });
        }

        return res.json(updatedDocument);
    } catch (e) {
        console.error(e);
        if (req.file && req.file.path) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        }
        return res.status(500).json({ msg: "Internal server error" });
    }
}

module.exports = handlePhotoUpload;
