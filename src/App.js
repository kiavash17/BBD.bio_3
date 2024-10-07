import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function App() {
  const [fcsFiles, setFcsFiles] = useState([]);
  const [metadataFile, setMetadataFile] = useState(null);
  const [antibodyPanel, setAntibodyPanel] = useState('');
  const [positiveControl, setPositiveControl] = useState('');
  const [negativeControl, setNegativeControl] = useState('');

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

    if (fcsFiles.length === 0 || !metadataFile) {
      alert('Please upload .fcs files and metadata file.');
      return;
    }

    const formData = new FormData();
    fcsFiles.forEach((file, index) => {
      formData.append(`fcsFile_${index}`, file);
    });
    formData.append('metadataFile', metadataFile);
    formData.append('antibodyPanel', antibodyPanel);
    formData.append('positiveControl', positiveControl);
    formData.append('negativeControl', negativeControl);

    // TODO: Send formData to backend for processing
    console.log('Form submitted:', formData);
    alert('Data submitted successfully!');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Flow Cytometry Analysis</h1>
      <form onSubmit={handleSubmit}>
        {/* Dropzone for .fcs files */}
        <div
          {...getRootProps()}
          style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', marginBottom: '10px' }}
        >
          <input {...getInputProps()} />
          <p>Drag & drop .fcs files here, or click to select files</p>
        </div>
        <div>
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
        </div>

        {/* Metadata file upload */}
        <div style={{ marginTop: '10px' }}>
          <label>Upload Metadata (Excel/CSV):</label>
          <input type="file" accept=".csv,.xlsx" onChange={handleMetadataFileChange} />
        </div>

        {/* Additional input fields */}
        <div style={{ marginTop: '10px' }}>
          <label>Antibody Panel:</label>
          <input
            type="text"
            value={antibodyPanel}
            onChange={(e) => setAntibodyPanel(e.target.value)}
            placeholder="e.g., CD4, CD8"
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Positive Control:</label>
          <input
            type="text"
            value={positiveControl}
            onChange={(e) => setPositiveControl(e.target.value)}
            placeholder="e.g., Sample A"
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Negative Control:</label>
          <input
            type="text"
            value={negativeControl}
            onChange={(e) => setNegativeControl(e.target.value)}
            placeholder="e.g., Sample B"
          />
        </div>

        {/* Submit button */}
        <div style={{ marginTop: '20px' }}>
          <button type="submit">Submit for Analysis</button>
        </div>
      </form>
    </div>
  );
}

export default App;