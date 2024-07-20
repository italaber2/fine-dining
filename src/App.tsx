import React, { useState } from "react";

interface Job {
  title: string;
  company: string;
  location: string;
  description: string;
  link: string;
}

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSpotifyJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/jobs/spotify");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTogglJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/jobs/toggl");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchKodifyJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/jobs/kodify");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchIndeedPtQaJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/jobs/indeed/pt-qa");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchIndeedEsQaJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/jobs/indeed/es-qa");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Job Listings</h1>
      <button onClick={fetchSpotifyJobs}>Spotify</button>
      <button onClick={fetchTogglJobs}>Toggl</button>
      <button onClick={fetchKodifyJobs}>Kodify</button>
      <button onClick={fetchIndeedPtQaJobs}>Indeed PT QA</button>
      <button onClick={fetchIndeedEsQaJobs}>Indeed ES QA</button>
      {loading ? (
        <p>Loading...</p>
      ) : jobs.length ? (
        <ul>
          {jobs.map((job, index) => (
            <li key={index}>
              <h2>{job.title}</h2>
              <p>
                {job.company} - {job.location}
              </p>
              <p>{job.description}</p>
              <a href={job.link} target="_blank" rel="noopener noreferrer">
                View Job
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs found</p>
      )}
    </div>
  );
};

export default App;
