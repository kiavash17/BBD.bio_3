import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css';

function App() {
  const [fcsFiles, setFcsFiles] = useState([]);
  const [metadataFile, setMetadataFile] = useState(null);
  const [experimentDescription, setExperimentDescription] = useState('');

  // Dropzone for .fcs files
  const onDrop = (acceptedFiles) => {
    setFcsFiles([...fcsFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.fcs',
    multiple: true,
  });

  const handleMetadataFileChange = (e) => {
    setMetadataFile(e.target.files[0]);
  };

  const handleRemoveFile = (index) => {
    setFcsFiles(fcsFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fcsFiles.length === 0) {
      alert('Please upload .fcs files.');
      return;
    }

    const formData = new FormData();
    fcsFiles.forEach((file, index) => {
      formData.append(`fcsFile_${index}`, file);
    });
    formData.append('metadataFile', metadataFile);
    formData.append('experimentDescription', experimentDescription);

    // TODO: Send formData to backend for processing
    console.log('Form submitted:', formData);
    alert('Data submitted successfully!');
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Flow Cytometry Analysis</h1>
        <form onSubmit={handleSubmit}>
          {/* Section 1: Dropzone for .fcs files */}
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag & drop .fcs files here, or click to select files</p>
          </div>
          <div className="file-list">
            {fcsFiles.length > 0 && (
              <>
                <strong>Uploaded Files:</strong>
                <ul>
                  {fcsFiles.map((file, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                      {file.name}
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        style={{ marginLeft: '10px', cursor: 'pointer' }}
                      >
                        x
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Section 2: Experiment Description and Chat Box */}
          <div className="chat-section">
            <label>Experiment Description:</label>
            <div className="chat-box" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: '24px', padding: '10px', marginTop: '10px' }}>
              <label className="paperclip-button" style={{ marginRight: '10px' }}>
                <span className="paperclip-icon" style={{ fontSize: '24px', cursor: 'pointer' }}>📎</span>
                <input type="file" accept=".csv,.xlsx" onChange={handleMetadataFileChange} style={{ display: 'none' }} />
              </label>
              <textarea
                value={experimentDescription}
                onChange={(e) => setExperimentDescription(e.target.value)}
                placeholder="Describe the experiment in plain English or paste a table here"
                rows="1"
                style={{ flex: 1, border: 'none', outline: 'none', backgroundColor: 'transparent', resize: 'none' }}
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="submit-container">
            <button type="submit" className="submit-button">Submit for Analysis</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
