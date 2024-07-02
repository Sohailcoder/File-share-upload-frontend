import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const fileInputRef = useRef();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        try {
          const response = await uploadFile(data);
          setResult(response.path);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="App">
      <div className='container'>
        <img src="https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg" className='img' alt="A beautiful landscape" />
        <div className='wrapper'>
          <h1>Simple file sharing!</h1>
          <p>Upload and share the download link.</p>
          
          <button onClick={onUploadClick}>Upload</button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          {result && <a href={result} target='_blank' rel="noopener noreferrer">{result}</a>}
        </div>
      </div>
    </div>
  );
}

export default App;
