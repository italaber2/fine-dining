import React, { useState } from "react";
import logo from "./fineDiningButler.png";
import "./App.css";

interface Job {
  title: string;
  company: string;
  location: string;
  link: string;
  clicked: boolean;
}

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoints = [
        "/api/jobs/spotify",
        "/api/jobs/toggl",
        "/api/jobs/kodify",
        "/api/jobs/indeed/cz-qa",
        "/api/jobs/indeed/pt-qa",
        "/api/jobs/indeed/es-qa",
        "/api/jobs/indeed/dk-qa",
        "/api/jobs/indeed/de-qa",
        "/api/jobs/indeed/nl-qa",
        "/api/jobs/indeed/lu-qa",
        "/api/jobs/indeed/no-qa",
        "/api/jobs/indeed/fr-qa",
        "/api/jobs/indeed/fi-tae",
        "/api/jobs/indeed/se-qa",
        "/api/jobs/indeed/it-tester",
        "/api/jobs/indeed/at-tester",
        "/api/jobs/indeed/be-qa",
      ];

      const allJobs: Job[] = [];
      for (const endpoint of endpoints) {
        const response = await fetch(
          `https://welcome-moth-kind.ngrok-free.app${endpoint}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch jobs from ${endpoint}`);
        }
        const data = await response.json();
        const formattedJobs = data.map((job: Job) => ({
          ...job,
          clicked: false,
        }));
        allJobs.push(...formattedJobs);
      }

      setJobs(allJobs);
    } catch (err: any) {
      console.error("Error fetching jobs:", err);
      setError("An error occurred while fetching jobs.");
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = (index: number) => {
    const updatedJobs = [...jobs];
    updatedJobs[index].clicked = true;
    setJobs(updatedJobs);
  };

  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Job Listings</h1>
      </div>
      <div className="container">
        <div className="sidebar">
          <button onClick={fetchAllJobs} disabled={loading}>
            {loading ? "Fetching Jobs..." : "Fetch Jobs from All Markets"}
          </button>
        </div>
        <div className="content">
          {loading ? (
            <p>Loading jobs from all markets...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : jobs.length ? (
            <ul className="job-results">
              {jobs.map((job, index) => (
                <li key={index}>
                  <h2>{job.title}</h2>
                  <p>
                    {job.company} - {job.location}
                  </p>
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLinkClick(index)}
                    style={{ color: job.clicked ? "red" : "blue" }}
                  >
                    View Job
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No jobs found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
