# JobTrack — Job Application & Interview Management System

JobTrack is a modern React frontend for managing job applications and interview rounds in one place.

It provides a clean dashboard where users can track applications, monitor interview rounds, update application details, and manage their job search.

## Features

- User registration and login
- JWT-based authentication
- Protected routes
- Dashboard with application statistics
- View all job applications
- Search applications by company or job title
- Filter applications by status
- Add new job applications
- Edit existing applications
- Delete applications
- View detailed application information
- Manage interview rounds
- Add, edit, and delete interviews
- Track interview date and time
- Track interview mode and status
- Store interviewer information
- Add interview feedback
- Logout functionality
- Responsive and modern UI

## Tech Stack

### Frontend

- React.js
- JavaScript
- React Router
- Axios
- HTML5
- CSS3
- Vite

### Backend

- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- MySQL

### Tools

- Visual Studio Code
- Eclipse
- Postman
- Git
- GitHub

### Application Structure

```text
src/
├── Components/
│   ├── Dashboard.jsx
│   ├── Dashboard.css
│   ├── Applications.jsx
│   ├── Applications.css
│   ├── AddApplication.jsx
│   ├── AddApplication.css
│   ├── EditApplication.jsx
│   ├── ApplicationDetails.jsx
│   ├── ApplicationDetails.css
│   ├── Interviews.jsx
│   ├── Interviews.css
│   ├── Login.jsx
│   ├── Register.jsx
│   └── ProtectedRoute.jsx
│
├── services/
│   ├── api.js
│   └── apiClient.js
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Styling

The frontend uses separate CSS files for individual pages and components to keep the styling organized and maintainable.

- `Dashboard.css` — Dashboard styling
- `Applications.css` — Applications list and search/filter UI
- `AddApplication.css` — Add and Edit Application forms
- `ApplicationDetails.css` — Application details page
- `Interviews.css` — Interview management page
- `App.css` — Shared application-level styles
- `index.css` — Global styles

## Screenshots

### Dashboard

![JobTrack Dashboard](jobtrack-frontend\screenshot\dashboard.png)

### Applications

![JobTrack Applications](jobtrack-frontend\screenshot\Applications.png)

### Interviews

![JobTrack Interviews](jobtrack-frontend\screenshot\Interviews.png)
