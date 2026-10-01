import { useEffect, useState } from "react";
import { getApplications, deleteApplication } from "../services/api";
import { Link } from "react-router-dom";
import "./Applications.css";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    async function loadApplications() {
      const data = await getApplications();

      if (data) {
        setApplications(data);
      }
    }

    loadApplications();
  }, []);

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?",
    );
    if (!confirmed) {
      return;
    }
    const data = await deleteApplication(id);

    if (data) {
      setApplications((currentApplications) =>
        currentApplications.filter((application) => application.id !== id),
      );
    }
  }

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.companyName.toLowerCase().includes(search.toLowerCase()) ||
      application.jobTitle.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="applications-page">
      <div className="applications-header">
        <div>
          <p className="applications-label">JOB TRACKER</p>
          <h1>Applications</h1>
          <p className="applications-subtitle">
            Keep track of every opportunity in one place.
          </p>
        </div>

        <Link to="/applications/add" className="add-application-btn">
          + Add Application
        </Link>
      </div>

      <div className="applications-toolbar">
        <div className="search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search company or job title..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="filter-box">
          <span>Filter:</span>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEW">Interview</option>
            <option value="REJECTED">Rejected</option>
            <option value="OFFERED">Offered</option>
          </select>
        </div>
      </div>

      <div className="applications-table-container">
        <div className="table-header">
          <div>
            <h2>Your Applications</h2>
            <p>{filteredApplications.length} applications found</p>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="applications-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Job Title</th>
                <th>Status</th>
                <th>Applied Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application.id}>
                  <td>
                    <div className="company-cell">
                      <div className="company-avatar">
                        {application.companyName.charAt(0).toUpperCase()}
                      </div>

                      <span>{application.companyName}</span>
                    </div>
                  </td>

                  <td>
                    <span className="job-title">{application.jobTitle}</span>
                  </td>

                  <td>
                    <span
                      className={`status-badge ${application.status.toLowerCase()}`}
                    >
                      {application.status}
                    </span>
                  </td>

                  <td className="date-cell">{application.appliedDate}</td>

                  <td>
                    <div className="application-actions">
                      <Link
                        to={`/applications/${application.id}`}
                        className="table-action view-action"
                      >
                        View
                      </Link>

                      <Link
                        to={`/applications/edit/${application.id}`}
                        className="table-action edit-action"
                      >
                        Edit
                      </Link>

                      <Link
                        to={`/applications/${application.id}/interviews`}
                        className="table-action interview-action"
                      >
                        Interviews
                      </Link>

                      <button
                        className="table-action delete-action"
                        onClick={() => handleDelete(application.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredApplications.length === 0 && (
                <tr>
                  <td colSpan="5" className="no-applications">
                    <div className="empty-applications">
                      <div className="empty-app-icon">▤</div>

                      <h3>No applications found</h3>

                      <p>Try changing your search or filter.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Applications;
