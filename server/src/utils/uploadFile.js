const util = require('util');
const multer = require('multer');
const maxSize = 2 * 1024 * 1024; //2M maxSize
const { v4: uuidv4 } = require('uuid');

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname + '../../imagesUpload/');
	},
	filename: (req, file, cb) => {
		const extension = file.originalname.substring(file.originalname.lastIndexOf('.') + 1).toLowerCase();
		cb(null, `${uuidv4()}.${extension}`);
	},
});

let uploadFileMulter = multer({
	storage: storage,
	limits: { fileSize: maxSize },
}).single('file');

let uploadFile = util.promisify(uploadFileMulter);
module.exports = uploadFile;
