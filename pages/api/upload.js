import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = formidable({ multiples: false, uploadDir: './public/uploads', keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Gagal mengupload gambar' });
    }

    const filePath = files.file[0].filepath;
    const fileName = path.basename(filePath);

    return res.status(200).json({
      message: 'Gambar diterima di Vercel',
      filename: fileName,
      ukuran: files.file[0].size,
    });
  });
}
