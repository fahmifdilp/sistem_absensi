import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ error: "Upload gagal saat parsing" });
    }

    // Cek apakah file berhasil diterima
    if (!files.file) {
      console.error("Tidak ada file yang diterima:", files);
      return res.status(400).json({ error: "File tidak ditemukan" });
    }

    const file = files.file;
    try {
      const buffer = fs.readFileSync(file.filepath);

      return res.status(200).json({
        message: "Gambar diterima di Vercel",
        filename: file.originalFilename,
        ukuran: buffer.length,
      });
    } catch (e) {
      console.error("Gagal baca file:", e);
      return res.status(500).json({ error: "Gagal membaca file" });
    }
  });
}
