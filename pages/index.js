import { useState } from 'react';

export default function Home() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.file.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.filename) {
      setImage(data.filename);
      setUrl(`/uploads/${data.filename}`);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Upload Gambar dari ESP32</h1>
      <form onSubmit={handleUpload}>
        <input type="file" name="file" />
        <button type="submit">Upload</button>
      </form>

      {url && (
        <div style={{ marginTop: 20 }}>
          <h3>Preview:</h3>
          <img src={url} alt="Hasil Upload" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
}
