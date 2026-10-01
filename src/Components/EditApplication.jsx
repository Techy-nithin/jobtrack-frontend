import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApplicationById, updateApplication } from "../services/api";
import "./AddApplication.css";

function EditApplication() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("APPLIED");
  const [appliedDate, setAppliedDate] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    async function loadApplication() {
      const data = await getApplicationById(id);

      setCompanyName(data.companyName);
      setJobTitle(data.jobTitle);
      setLocation(data.location);
      setStatus(data.status);
      setAppliedDate(data.appliedDate);
      setJobUrl(data.jobUrl);
      setNotes(data.notes);
    }

    loadApplication();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!companyName.trim()) {
      alert("Company name is required");
      return;
    }

    if (!jobTitle.trim()) {
      alert("Job title is required");
      return;
    }

    if (!location.trim()) {
      alert("Location is required");
      return;
    }

    if (!appliedDate) {
      alert("Applied date is required");
      return;
    }

    const application = {
      companyName,
      jobTitle,
      location,
      status,
      appliedDate,
      jobUrl,
      notes,
    };

    const data = await updateApplication(id, application);

    if (data) {
      navigate("/applications");
    }
  }
  return (
    <div className="add-application-page">
      <div className="add-application-header">
        <div>
          <p className="add-application-label">JOB TRACKER</p>

          <h1>Edit Application</h1>

          <p className="add-application-subtitle">
            Update the details of your job application.
          </p>
        </div>
      </div>

      <form className="application-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Job Information</h2>

          <p>Update the details about this position.</p>

          <div className="form-grid">
            <div className="form-field">
              <label>Company Name *</label>

              <input
                type="text"
                placeholder="e.g. Google"
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Job Title *</label>

              <input
                type="text"
                placeholder="e.g. Java Developer"
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Location *</label>

              <input
                type="text"
                placeholder="e.g. Bengaluru"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Status</label>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEW">Interview</option>
                <option value="REJECTED">Rejected</option>
                <option value="OFFERED">Offered</option>
              </select>
            </div>

            <div className="form-field">
              <label>Applied Date *</label>

              <input
                type="date"
                value={appliedDate}
                onChange={(event) => setAppliedDate(event.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Job URL</label>

              <input
                type="text"
                placeholder="https://company.com/jobs/..."
                value={jobUrl}
                onChange={(event) => setJobUrl(event.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Notes</h2>

          <p>Update any notes you want to remember.</p>

          <textarea
            className="notes-input"
            placeholder="Add notes about the role, recruiter, requirements, etc."
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="secondary-btn"
            onClick={() => navigate("/applications")}
          >
            Cancel
          </button>

          <button type="submit" className="primary-btn">
            Update Application
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditApplication;
