const util = require('util');
const multer = require('multer');
const maxSize = 2 * 1024 * 1024; //2M maxSize
const { v4: uuidv4 } = require('uuid');
const path = require('path');

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if (file.mimetype == 'image/gif') {
			cb(null, __dirname + '../../imagesUpload/animated/');
		} else {
			cb(null, __dirname + '../../imagesUpload/original/');
		}
	},
	filename: (req, file, cb) => {
		const extension = file.originalname
			.substring(file.originalname.lastIndexOf('.') + 1)
			.toLowerCase();
		cb(null, `${uuidv4()}.${extension}`);
	},
});

let uploadFileMulter = multer({
	storage: storage,
	limits: { fileSize: maxSize },
	fileFilter: (req, file, cb) => {
		var ext = path.extname(file.originalname);
		if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
			return cb(null, false);
		}
		cb(null, true);
	},
}).single('file');

let middlewareUploadFile = util.promisify(uploadFileMulter);
module.exports = middlewareUploadFile;
