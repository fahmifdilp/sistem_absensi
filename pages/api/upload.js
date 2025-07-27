export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Kamu bisa simpan buffer atau teruskan ke server AI nanti
    res.status(200).json({
      message: "Gambar diterima di Vercel",
      ukuran: buffer.length,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Gagal membaca gambar" });
  }
}
