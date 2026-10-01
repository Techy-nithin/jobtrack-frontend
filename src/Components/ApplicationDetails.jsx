import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApplicationById } from "../services/api";
import "./ApplicationDetails.css";

function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);

  useEffect(() => {
    async function loadApplication() {
      const data = await getApplicationById(id);

      setApplication(data);
    }

    loadApplication();
  }, [id]);

  if (!application) {
    return <p>Loading...</p>;
  }
  return (
    <div className="application-details-page">
      <div className="details-header">
        <div>
          <p className="details-label">JOB TRACKER</p>

          <h1>Application Details</h1>

          <p className="details-subtitle">
            View information about this job application.
          </p>
        </div>

        <button
          className="details-back-btn"
          onClick={() => navigate("/applications")}
        >
          ← Back to Applications
        </button>
      </div>

      <div className="application-details-card">
        <div className="details-company-header">
          <div className="details-company-avatar">
            {application.companyName.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2>{application.companyName}</h2>

            <p>{application.jobTitle}</p>
          </div>
        </div>

        <div className="details-status-row">
          <span className={`status-badge ${application.status.toLowerCase()}`}>
            {application.status}
          </span>
        </div>

        <div className="details-info-grid">
          <div className="details-info-item">
            <span>Location</span>
            <strong>{application.location}</strong>
          </div>

          <div className="details-info-item">
            <span>Applied Date</span>
            <strong>{application.appliedDate}</strong>
          </div>
        </div>

        <div className="details-section">
          <h3>Job Posting</h3>

          {application.jobUrl ? (
            <a
              href={application.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="job-url-btn"
            >
              Open Job Posting ↗
            </a>
          ) : (
            <p className="not-provided">No job posting URL provided.</p>
          )}
        </div>

        <div className="details-section">
          <h3>Notes</h3>

          <div className="notes-box">
            {application.notes ? (
              <p>{application.notes}</p>
            ) : (
              <p className="not-provided">No notes added.</p>
            )}
          </div>
        </div>

        <div className="details-actions">
          <button
            className="details-secondary-btn"
            onClick={() => navigate(`/applications/edit/${id}`)}
          >
            Edit Application
          </button>

          <button
            className="details-primary-btn"
            onClick={() => navigate(`/applications/${id}/interviews`)}
          >
            View Interviews
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetails;
