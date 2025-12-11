import React, { useState, useEffect } from "react";
import logo from "./fineDiningButler.png";
import "./App.css";

interface Job {
  title: string;
  company: string;
  location: string;
  link: string;
  clicked: boolean;
}

const BASE_URL = "https://welcome-moth-kind.ngrok-free.app";

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [groups, setGroups] = useState<Record<string, string[]>>({});

  // Load backend config and auto-group endpoints by inferred source
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/config`);
        if (!res.ok) return;

        const data = await res.json();

        // Example path: "/api/jobs/indeed/de-qa"
        // segments = ["", "api", "jobs", "indeed", "de-qa"]
        const grouped = data.reduce((acc: any, item: any) => {
          const segments = item.path.split("/");
          const source = segments[3]; // "indeed", "apify", "startupJobs", etc.

          if (!acc[source]) acc[source] = [];
          acc[source].push(item.path);

          return acc;
        }, {});

        setGroups(grouped);
      } catch (err) {
        console.error("Failed to load config:", err);
      }
    };

    loadConfig();
  }, []);

  // Fetch jobs for a specific source (load only that group's endpoints)
  const fetchJobsBySource = async (source: string) => {
    const endpoints = groups[source];
    if (!endpoints) return;

    setLoading(source);
    setError(null);

    const collected: Job[] = [];

    for (const endpoint of endpoints) {
      try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
          headers: { "ngrok-skip-browser-warning": "69420" },
        });

        if (!res.ok) continue;

        const data = await res.json();

        if (Array.isArray(data)) {
          collected.push(
            ...data.map((j: Job) => ({ ...j, clicked: false }))
          );
        }
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
      }
    }

    setJobs(collected);
    setLoading(null);
  };

  const handleLinkClick = (i: number) => {
    const updated = [...jobs];
    updated[i].clicked = true;
    setJobs(updated);
  };

  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Job Listings</h1>
      </div>

      <div className="container">
        <div className="sidebar">
          {Object.keys(groups).map((source) => (
            <button
              key={source}
              onClick={() => fetchJobsBySource(source)}
              disabled={!!loading}
            >
              {loading === source ? `Fetching ${source}...` : source}
            </button>
          ))}
        </div>

        <div className="content">
          {loading ? (
            <p>Loading jobs...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : jobs.length ? (
            <ul className="job-results">
              {jobs.map((job, idx) => (
                <li key={idx}>
                  <h2>{job.title}</h2>
                  <p>{job.company} - {job.location}</p>
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLinkClick(idx)}
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
