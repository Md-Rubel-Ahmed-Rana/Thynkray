import multer from 'multer';

export const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `Thynkray-${Date.now()}-${file.originalname}`);
  },
});

export const multerOptions = {
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
};


export const uploadFiles = multer({ dest: "uploads/" })