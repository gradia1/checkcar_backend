
const multer = require('multer');
const path = require('path');
const app = require('express');
const fs = require('fs');
//const express = require("express")
const router = app.Router();
const archiver = require('archiver');

//require('dotenv').config();

router.get("/", (req, res) => {
    res.send("port is " + process.env.DB_PORT);
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = req.body.folder || 'default';
        const uploadPath = path.join(__dirname, 'uploads', folder);

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath); // ตั้งค่าโฟลเดอร์ที่ใช้เก็บไฟล์
    },
    filename: (req, file, cb) => {
        const customFileName = req.body.fileName
        cb(null, customFileName + path.extname(file.originalname)); // ตั้งชื่อไฟล์
    }
});

const upload = multer({ storage: storage });

router.post('/uploadFile', upload.single('image'), (req, res) => {

    try {
        if (req.file) {
            res.status(200).json({
                message: 'File uploaded successfully',
                file: req.file

            });
        } else {
            res.status(400).json({ message: 'File upload failed' });
        }
    }
    catch (err) {
        console.log(err.message)
    }
});

router.use('/uploads', app.static(path.join(__dirname, 'uploads')));

router.get('/forallcar/:id', (req, res) => {
    const id = req.params.id;
    var imgname = ['front.jpg', 'back.jpg', 'frontleft.jpg', 'frontright.jpg', 'backleft.jpg', 'backright', 'left.jpg', 'right.jpg']
    var retv = []
    for (var i = 0; i < imgname.length; i++) {
        let imagePath = path.join(__dirname, 'uploads/' + id, imgname[i]);
        if (fs.existsSync(imagePath))
            retv.push({ name: imgname[i], have: "1" })
        else
            retv.push({ name: imgname[i], have: "0" })
    }
    // console.log("ทดสอบ")
    // console.log(retv)
    res.send(retv)


});

router.get('/checkMandan/:folder', (req, res) => {
    var retError = []
    const folder = req.params.folder;
    var imgname = ['front.jpg', 'back.jpg', 'left.jpg', 'right.jpg',
        'milerate.jpg', 'bodynumber.jpg', 'roof.jpg', 'keys.jpg',
        'frontseat.jpg', 'platenumber.jpg', 'licensecard.jpg', 'coverbook.jpg']
    var retv = "1"
    var pass = true;

    for (var i = 0; i < imgname.length; i++) {
        let imagePath = path.join(__dirname, 'uploads/' + folder, imgname[i]);
        if (fs.existsSync(imagePath))
            //retv.push({ name: imgname[i], have: "1" })
            pass = true;
        else {
            pass = false
            retv = "0"
            retError.push({ name: imgname[i], have: "0" })
            //break
        }
    }
    // console.log("ทดสอบ")
    // console.log(retv)
    res.send({ response_result: retv, error: retError })



});

// API สำหรับตรวจสอบไฟล์ภาพ
router.get('/check-image/:imageName', (req, res) => {
    try {
        const imageName = req.params.imageName;
        const imagePath = path.join(__dirname, 'uploads', imageName); // ปรับเส้นทางให้ตรงกับโฟลเดอร์ของคุณ  

        if (fs.existsSync(imagePath)) {
            res.status(200).send({ message: 'File exists' });
        } else {
            res.status(404).send({ message: 'File does not exist' });
        }
    }
    catch (err) {
        console.log(err.message)
    }
});

// ลบทั้งโฟลเดอร์ 'uploads'
router.delete('/delete-folder', (req, res) => {
    const folder = "/" + req.body.folder;
    const origin = path.join(__dirname, 'uploads', folder);
    let uploadFolder = origin;
    //console.log("uploadFolder = " + origin)
    if (fs.existsSync(uploadFolder)) {
        fs.rmSync(uploadFolder, { recursive: true, force: true }); // ลบทั้งโฟลเดอร์และไฟล์ภายใน
        res.send({ status: 200, error: 'ลบโฟลเดอร์เรียบร้อยแล้ว' });
    } else {
        res.status(404).json({ error: 'ไม่พบโฟลเดอร์' });
    }
});


router.delete('/delete-image', (req, res) => {
    const imageName = req.query.fileName;  // Assume the image name is sent in the request body

    if (!imageName) {
        return res.status(400).json({ error: 'Image name is required' });
    }

    const imagePath = path.join(__dirname, 'uploads', imageName);  // Change 'uploads' to your image directory

    fs.unlink(imagePath, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error deleting the image', details: err.message });
        }
        res.status(200).json({ message: 'Image deleted successfully' });
    });
});

router.get('/download-folder', (req, res) => {
    const folder_download = "/" + req.body.folder;

    if (req.body.folder == undefined){
        res.status(404).json({ error: 'ไม่พบ folder' })
        return;
    }

    const folderPath = path.join(__dirname, 'uploads', "/" + folder_download); // Folder you want to zip
    //console.log(folderPath);
    const archiveName = folder_download + '.zip';

    if (!fs.existsSync(folderPath)) {
        res.status(404).json({ error: 'Folder does not exist' });
        return;
    }

    res.setHeader('Content-Disposition', `attachment; filename=${archiveName}`);
    res.setHeader('Content-Type', 'application/zip');

    const archive = archiver('zip', {
        zlib: { level: 9 },
    });

    archive.on('error', (err) => {
        res.status(500).json({ error: err.message });
    });

    // Pipe the archive to the response
    archive.pipe(res);

    // Append the entire folder
    archive.directory(folderPath, false);

    // Finalize the archive (send it)
    archive.finalize();
});

module.exports = router;

