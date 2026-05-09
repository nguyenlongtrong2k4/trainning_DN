'use client'; 

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="skeleton-page">
        <div className="skeleton-element banner"></div>
        <div className="skeleton-element title"></div>
        <div className="skeleton-element paragraph p1"></div>
        <div className="skeleton-element paragraph p2"></div>
        <div className="skeleton-grid">
          <div className="skeleton-element block"></div>
          <div className="skeleton-element block"></div>
        </div>
      </div>
      <style jsx>{`
        .loading-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #fafafa; 
          z-index: 9999;
          padding: 40px 20px;
          display: flex;
          justify-content: center;
        }

        .skeleton-page {
          width: 100%;
          max-width: 1200px; 
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .skeleton-element {
          background-color: #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        }

        .skeleton-element::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.2) 20%,
            rgba(255, 255, 255, 0.5) 60%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }

        .banner { height: 300px; }
        .title { height: 48px; width: 60%; margin-top: 20px; }
        .paragraph { height: 20px; }
        .p1 { width: 90%; }
        .p2 { width: 80%; }
        .skeleton-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
        .block { height: 200px; }
      `}</style>
    </div>
  );
}