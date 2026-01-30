import { useState, useRef, useEffect } from 'react';
import JSZip from 'jszip';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { QRCodeSVG } from 'qrcode.react';

import './App.css';

// Navbar Component
function Navbar({ onUploadClick, onMenuToggle, menuOpen }) {
  return (
    <header className="navbar">
      <div className="container navbar-content">
        <div className="logo">DarlingShare</div>

        <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <a href="#features" className="nav-item">Features</a>
          <a href="#how-it-works" className="nav-item">How it works</a>
          <button
            className="btn btn-primary nav-upload-btn"
            onClick={onUploadClick}
          >
            Upload Now
          </button>
        </nav>

        <button
          className="menu-toggle"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
        </button>
      </div>
    </header>
  );
}

// Hero Component
function Hero() {
  return (
    <section className="hero">
      <h1 className="hero-title">Share Files Instantly via QR Code</h1>
      <p className="hero-subtitle">
        Upload files or entire folders → get a QR code → anyone can download in seconds.
        <br />No accounts • No limits • Works everywhere
      </p>
    </section>
  );
}

// UploadZone Component
function UploadZone({ onDrop, onClick, files }) {
  return (
    <>
      <div
        className="upload-zone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onClick={onClick}
      >
        <div className="upload-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <h3>Drag & drop any files or folder here</h3>
        <p>or <span className="highlight">click to browse</span></p>
      </div>

      {files && files.length > 0 && (
        <p className="file-count">
          {files.length} file{files.length !== 1 ? 's' : ''} selected
        </p>
      )}
    </>
  );
}

// UploadButton Component
function UploadButton({ onClick, disabled, label }) {
  return (
    <button
      className={`btn btn-primary upload-btn ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

// ProgressBar Component
function ProgressBar({ progress }) {
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
    </div>
  );
}

// ResultContainer Component
function ResultContainer({ downloadUrl }) {
  return (
    <div className="result-container">
      <h2>Your file is ready!</h2>
      <div className="qr-wrapper">
        <QRCodeSVG
          value={downloadUrl}
          size={220}
          level="H"
          fgColor="#4f46e5"
          bgColor="transparent"
        />
      </div>

      <p className="scan-instruction">Scan with your phone camera</p>

      <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="download-link">
        {downloadUrl}
      </a>

      <a href={downloadUrl} download className="btn btn-outline">
        Direct Download
      </a>
    </div>
  );
}

// Features Section Component
function FeaturesSection() {
  return (
    <section id="features" className="features-section">
      <h2 className="section-title">Key Features</h2>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">📂</div>
          <h3>Any File Type</h3>
          <p>Upload images, documents, videos, archives, or entire folders – we handle it all.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure Sharing</h3>
          <p>Files are stored temporarily and accessible only via unique QR codes or links.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3>Instant QR Generation</h3>
          <p>Generate scannable QR codes in seconds for quick downloads on any device.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>Cross-Device</h3>
          <p>Seamless transfer between phones, laptops, and tablets without apps.</p>
        </div>
      </div>
    </section>
  );
}

// HowItWorks Section Component
function HowItWorksSection() {
  return (
    <section id="how-it-works" className="how-it-works-section">
      <h2 className="section-title">How It Works</h2>
      <div className="steps-container">
        <div className="step">
          <div className="step-number">1</div>
          <h3>Upload Files</h3>
          <p>Drag & drop or select any files/folders from your device.</p>
        </div>
        <div className="step-arrow">→</div>
        <div className="step">
          <div className="step-number">2</div>
          <h3>Generate QR</h3>
          <p>We process and create a unique QR code and download link.</p>
        </div>
        <div className="step-arrow">→</div>
        <div className="step">
          <div className="step-number">3</div>
          <h3>Share & Download</h3>
          <p>Scan the QR or use the link to download instantly on any device.</p>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>DarlingShare • Simple file sharing via QR code • {new Date().getFullYear()}</p>
        <p>Made with care in Pakistan</p>
      </div>
    </footer>
  );
}

// WelcomeModal Component
function WelcomeModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="welcome-modal">
        <button className="modal-close" onClick={onClose}>×</button>

        <h2>Welcome to DarlingShare</h2>

        <p className="modal-text">
          Upload any file or folder and instantly get a QR code that anyone can scan to download.
          Perfect for sharing photos, documents, presentations and more — no account needed.
        </p>

        <div className="modal-demo-qr">
          <QRCodeSVG value="https://qrshare.example.com/demo" size={140} level="H" fgColor="#4f46e5" />
        </div>

        <button className="btn btn-primary modal-btn" onClick={onClose}>
          Start Sharing →
        </button>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [files, setFiles] = useState(null);
  const [isFolder, setIsFolder] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [error, setError] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const fileInputRef = useRef(null);
  const chunkSize = 1024 * 1024; // 1MB
  const backendUrl = 'https://fileshareb.onrender.com';

  useEffect(() => {
    const hasSeen = localStorage.getItem('qrshare-welcome-seen');
    if (hasSeen) {
      setShowWelcome(false);
    }
  }, []);

  const closeWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('qrshare-welcome-seen', 'true');
  };

  const handleFileChange = (e) => {
    const selected = e.target.files;
    const hasFolder = Array.from(selected || []).some(f => f.webkitRelativePath);
    setIsFolder(hasFolder);
    setFiles(selected);
    resetState();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files;
    const hasFolder = Array.from(dropped).some(f => f.webkitRelativePath);
    setIsFolder(hasFolder);
    setFiles(dropped);
    resetState();
  };

  const resetState = () => {
    setError('');
    setUploadStatus('');
    setDownloadUrl('');
    setProgress(0);
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      setError('Please select at least one file or folder');
      return;
    }

    setError('');
    setUploadStatus('Preparing files...');
    setProgress(0);

    let uploadFile;
    let filename;

    try {
      if (files.length > 1 || isFolder) {
        setUploadStatus('Creating zip archive...');
        const zip = new JSZip();
        Array.from(files).forEach(file => {
          const path = file.webkitRelativePath || file.name;
          zip.file(path, file);
        });
        const content = await zip.generateAsync({ type: 'blob' });
        const folderName = isFolder && files[0]?.webkitRelativePath
          ? files[0].webkitRelativePath.split('/')[0] || 'folder'
          : 'multiple-files';
        filename = `${folderName}.zip`;
        uploadFile = new File([content], filename, { type: 'application/zip' });
      } else {
        uploadFile = files[0];
        filename = uploadFile.name;
      }

      const uuid = uuidv4();
      const totalChunks = Math.ceil(uploadFile.size / chunkSize);

      setUploadStatus('Uploading...');

      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, uploadFile.size);
        const chunk = uploadFile.slice(start, end);

        const res = await axios.post(`${backendUrl}/upload`, chunk, {
          params: {
            uuid,
            chunkIndex: i,
            totalChunks,
            filename,
          },
          headers: { 'Content-Type': 'application/octet-stream' },
        });

        if (res.data?.error) {
          throw new Error(res.data.error);
        }

        setProgress(Math.round(((i + 1) / totalChunks) * 100));
      }

      setUploadStatus('Upload successful!');
      setDownloadUrl(`${backendUrl}/download/${uuid}`);

    } catch (err) {
      console.error(err);
      setError('Upload failed: ' + (err.response?.data?.error || err.message || 'Unknown error'));
      setUploadStatus('');
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="app-container">
      <Navbar 
        onUploadClick={() => fileInputRef.current?.click()} 
        onMenuToggle={toggleMenu}
        menuOpen={menuOpen}
      />

      <main className="main-content container">
        <Hero />

        <UploadZone 
          onDrop={handleDrop} 
          onClick={() => fileInputRef.current?.click()} 
          files={files} 
        />

        <input
          type="file"
          multiple
          webkitdirectory=""
          directory=""
          ref={fileInputRef}
          onChange={handleFileChange}
          className="file-input-hidden"
        />

        <UploadButton 
          onClick={handleUpload} 
          disabled={uploadStatus.includes('Uploading')} 
          label={uploadStatus.includes('Uploading') ? 'Uploading...' : 'Upload & Generate QR'} 
        />

        {uploadStatus && <p className="status-message success">{uploadStatus}</p>}
        {error && <p className="status-message error">{error}</p>}

        {progress > 0 && progress < 100 && <ProgressBar progress={progress} />}

        {downloadUrl && <ResultContainer downloadUrl={downloadUrl} />}
      </main>

      <FeaturesSection />
      <HowItWorksSection />

      <Footer />

      {showWelcome && <WelcomeModal onClose={closeWelcome} />}
    </div>
  );
}

export default App;