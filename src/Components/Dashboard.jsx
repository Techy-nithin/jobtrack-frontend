import { useEffect, useState } from "react";
import { getApplications, getInterviews } from "../services/api";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [applicationCount, setApplicationCount] = useState(0);
  const [interviewCount, setInterviewCount] = useState(0);
  const [offerCount, setOfferCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      const data = await getApplications();

      if (data) {
        setApplications(data);
        setApplicationCount(data.length);

        const offers = data.filter(
          (application) => application.status === "OFFERED",
        );

        setOfferCount(offers.length);

        const rejected = data.filter(
          (application) => application.status === "REJECTED",
        );

        setRejectedCount(rejected.length);

        let totalInterviews = 0;

        for (const application of data) {
          const interviews = await getInterviews(application.id);

          if (interviews) {
            totalInterviews += interviews.length;
          }
        }

        setInterviewCount(totalInterviews);
      }
    }

    loadDashboard();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <div className="brand">
            <div className="brand-icon">J</div>
            <span>JobTrack</span>
          </div>

          <nav className="sidebar-nav">
            <Link to="/dashboard" className="nav-item active">
              <span>▦</span>
              Dashboard
            </Link>

            <Link to="/applications" className="nav-item">
              <span>▤</span>
              Applications
            </Link>
          </nav>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <span>↪</span>
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <p className="dashboard-label">OVERVIEW</p>

            <h1>Dashboard</h1>

            <p className="dashboard-subtitle">
              Welcome back! Here's an overview of your job search.
            </p>
          </div>

          <Link to="/applications/add" className="dashboard-add-btn">
            + Add Application
          </Link>
        </div>

        {/* Statistics */}
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon applications-icon">▤</div>

            <div>
              <p className="stat-title">Applications</p>
              <h2>{applicationCount}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon interviews-icon">◉</div>

            <div>
              <p className="stat-title">Interviews</p>
              <h2>{interviewCount}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon offers-icon">★</div>

            <div>
              <p className="stat-title">Offers</p>
              <h2>{offerCount}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon rejected-icon">×</div>

            <div>
              <p className="stat-title">Rejected</p>
              <h2>{rejectedCount}</h2>
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <section className="recent-applications">
          <div className="section-header">
            <div>
              <h2>Recent Applications</h2>

              <p>Your latest job applications</p>
            </div>

            <Link to="/applications" className="view-all-btn">
              View all →
            </Link>
          </div>

          {applications.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">▤</div>

              <h3>No applications yet</h3>

              <p>Start tracking your job applications.</p>

              <Link to="/applications/add">Add your first application</Link>
            </div>
          ) : (
            <div className="recent-list">
              {applications
                .slice(-5)
                .reverse()
                .map((application) => (
                  <div key={application.id} className="recent-application">
                    <div className="company-info">
                      <div className="company-avatar">
                        {application.companyName.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h3>{application.companyName}</h3>

                        <p>{application.jobTitle}</p>
                      </div>
                    </div>

                    <span
                      className={`status-badge ${application.status.toLowerCase()}`}
                    >
                      {application.status}
                    </span>

                    <p className="application-date">
                      {application.appliedDate}
                    </p>

                    <Link
                      to={`/applications/${application.id}`}
                      className="view-btn"
                    >
                      View
                    </Link>
                  </div>
                ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
