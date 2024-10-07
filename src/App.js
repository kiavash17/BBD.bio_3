import React, { useState } from 'react';

function App() {
  const [fcsFile, setFcsFile] = useState(null);
  const [metadataFile, setMetadataFile] = useState(null);
  const [antibodyPanel, setAntibodyPanel] = useState('');
  const [positiveControl, setPositiveControl] = useState('');
  const [negativeControl, setNegativeControl] = useState('');

  const handleFcsFileChange = (e) => {
    setFcsFile(e.target.files[0]);
  };

  const handleMetadataFileChange = (e) => {
    setMetadataFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fcsFile || !metadataFile) {
      alert('Please upload both .fcs file and metadata file.');
      return;
    }

    const formData = new FormData();
    formData.append('fcsFile', fcsFile);
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
        <div>
          <label>Upload .fcs File:</label>
          <input type="file" accept=".fcs" onChange={handleFcsFileChange} />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Upload Metadata (Excel/CSV):</label>
          <input type="file" accept=".csv,.xlsx" onChange={handleMetadataFileChange} />
        </div>
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
        <div style={{ marginTop: '20px' }}>
          <button type="submit">Submit for Analysis</button>
        </div>
      </form>
    </div>
  );
}

export default App;
