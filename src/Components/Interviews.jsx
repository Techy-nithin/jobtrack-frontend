import { useEffect, useState } from "react";
import {
  getInterviews,
  createInterview,
  deleteInterview,
  updateInterview,
} from "../services/api";
import { useParams } from "react-router-dom";
import { getApplicationById } from "../services/api";
import "./Interviews.css";

function Interviews() {
  const [interviews, setInterviews] = useState([]);

  const { applicationId } = useParams();

  const [round, setRound] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [mode, setMode] = useState("ONLINE");
  const [status, setStatus] = useState("SCHEDULED");
  const [interviewer, setInterviewer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [editingInterview, setEditingInterview] = useState(null);
  const [application, setApplication] = useState(null);

  useEffect(() => {
    if (editingInterview) {
      setRound(editingInterview.round);
      setInterviewDate(editingInterview.interviewDate);
      setInterviewTime(editingInterview.interviewTime);
      setMode(editingInterview.mode);
      setStatus(editingInterview.status);
      setInterviewer(editingInterview.interviewer);
      setFeedback(editingInterview.feedback);
    }
  }, [editingInterview]);
  useEffect(() => {
    async function loadData() {
      const applicationData = await getApplicationById(applicationId);
      const interviewData = await getInterviews(applicationId);

      setApplication(applicationData);
      setInterviews(interviewData);
    }

    loadData();
  }, [applicationId]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!round) {
      alert("Interview round is required");
      return;
    }

    if (!interviewDate) {
      alert("Interview date is required");
      return;
    }

    if (!interviewTime) {
      alert("Interview time is required");
      return;
    }

    if (!interviewer.trim()) {
      alert("Interviewer is required");
      return;
    }

    const interview = {
      round: Number(round),
      interviewDate,
      interviewTime,
      mode,
      status,
      interviewer,
      feedback,
    };

    let data;

    if (editingInterview) {
      data = await updateInterview(
        applicationId,
        editingInterview.id,
        interview,
      );
    } else {
      data = await createInterview(applicationId, interview);
    }

    if (data) {
      if (editingInterview) {
        setInterviews((currentInterviews) =>
          currentInterviews.map((currentInterview) =>
            currentInterview.id === editingInterview.id
              ? data
              : currentInterview,
          ),
        );

        setEditingInterview(null);
      } else {
        setInterviews((currentInterviews) => [...currentInterviews, data]);
      }

      setRound("");
      setInterviewDate("");
      setInterviewTime("");
      setMode("ONLINE");
      setStatus("SCHEDULED");
      setInterviewer("");
      setFeedback("");
    }
  }

  async function handleDelete(interviewId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this interview?",
    );

    if (!confirmed) {
      return;
    }
    const data = await deleteInterview(applicationId, interviewId);

    if (data) {
      setInterviews((currentInterviews) =>
        currentInterviews.filter((interview) => interview.id !== interviewId),
      );
    }
  }
  function handleEdit(interview) {
    setEditingInterview(interview);
  }
  return (
    <div className="interviews-page">
      <div className="interviews-header">
        <div>
          <p className="interviews-label">JOB TRACKER</p>

          <h1>Interviews</h1>

          {application && (
            <p className="interviews-subtitle">
              {application.companyName} — {application.jobTitle}
            </p>
          )}

          <p className="interviews-description">
            Manage your interview rounds and feedback.
          </p>
        </div>

        <button
          type="button"
          className="interviews-back-btn"
          onClick={() => window.history.back()}
        >
          ← Back
        </button>
      </div>

      <div className="interview-form-card">
        <div className="interview-form-header">
          <div>
            <h2>{editingInterview ? "Edit Interview" : "Add Interview"}</h2>

            <p>
              {editingInterview
                ? "Update the interview details."
                : "Schedule a new interview round."}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="interview-form-grid">
            <div className="interview-field">
              <label>Round *</label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 1"
                value={round}
                onChange={(event) => setRound(event.target.value)}
              />
            </div>

            <div className="interview-field">
              <label>Interview Date *</label>
              <input
                type="date"
                value={interviewDate}
                onChange={(event) => setInterviewDate(event.target.value)}
              />
            </div>

            <div className="interview-field">
              <label>Interview Time *</label>
              <input
                type="time"
                value={interviewTime}
                onChange={(event) => setInterviewTime(event.target.value)}
              />
            </div>

            <div className="interview-field">
              <label>Mode</label>
              <select
                value={mode}
                onChange={(event) => setMode(event.target.value)}
              >
                <option value="ONLINE">Online</option>
                <option value="OFFLINE">Offline</option>
                <option value="PHONE">Phone</option>
              </select>
            </div>

            <div className="interview-field">
              <label>Status</label>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="SCHEDULED">Scheduled</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div className="interview-field">
              <label>Interviewer *</label>
              <input
                type="text"
                placeholder="e.g. John Smith"
                value={interviewer}
                onChange={(event) => setInterviewer(event.target.value)}
              />
            </div>
          </div>

          <div className="interview-field feedback-field">
            <label>Feedback</label>
            <textarea
              placeholder="Add interview feedback, questions asked, or notes..."
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
            />
          </div>

          <div className="interview-form-actions">
            {editingInterview && (
              <button
                type="button"
                className="interview-cancel-btn"
                onClick={() => {
                  setEditingInterview(null);
                  setRound("");
                  setInterviewDate("");
                  setInterviewTime("");
                  setMode("ONLINE");
                  setStatus("SCHEDULED");
                  setInterviewer("");
                  setFeedback("");
                }}
              >
                Cancel Edit
              </button>
            )}

            <button type="submit" className="interview-submit-btn">
              {editingInterview ? "Update Interview" : "Add Interview"}
            </button>
          </div>
        </form>
      </div>

      <div className="interview-list-section">
        <div className="interview-list-header">
          <div>
            <h2>Interview Rounds</h2>

            <p>
              {interviews.length}{" "}
              {interviews.length === 1 ? "interview" : "interviews"} recorded
            </p>
          </div>
        </div>

        {interviews.length === 0 ? (
          <div className="interviews-empty-state">
            <div className="empty-interview-icon">◉</div>

            <h3>No interviews yet</h3>

            <p>Add your first interview round above.</p>
          </div>
        ) : (
          <div className="interview-list">
            {interviews.map((interview) => (
              <div key={interview.id} className="interview-card">
                <div className="interview-card-header">
                  <div className="round-info">
                    <div className="round-number">{interview.round}</div>

                    <div>
                      <h3>Round {interview.round}</h3>

                      <p>
                        {interview.interviewDate} • {interview.interviewTime}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`interview-status ${interview.status.toLowerCase()}`}
                  >
                    {interview.status}
                  </span>
                </div>

                <div className="interview-details">
                  <div className="interview-detail">
                    <span>Mode</span>
                    <strong>{interview.mode}</strong>
                  </div>

                  <div className="interview-detail">
                    <span>Interviewer</span>
                    <strong>{interview.interviewer}</strong>
                  </div>
                </div>

                {interview.feedback && (
                  <div className="interview-feedback">
                    <span>Feedback</span>
                    <p>{interview.feedback}</p>
                  </div>
                )}

                <div className="interview-card-actions">
                  <button
                    className="interview-edit-btn"
                    onClick={() => handleEdit(interview)}
                  >
                    Edit
                  </button>

                  <button
                    className="interview-delete-btn"
                    onClick={() => handleDelete(interview.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Interviews;
