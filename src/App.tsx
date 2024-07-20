import React, { useState } from "react";

interface Job {
  title: string;
  link: string;
}

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchJobs = async (endpoint: string) => {
    setLoading(true);
    try {
      const response = await fetch(endpoint);
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
      <button onClick={() => fetchJobs("/api/jobs/spotify")}>Spotify</button>
      <button onClick={() => fetchJobs("/api/jobs/toggl")}>Toggl</button>
      <button onClick={() => fetchJobs("/api/jobs/kodify")}>Kodify</button>
      <button onClick={() => fetchJobs("/api/jobs/indeed/pt-qa")}>
        Indeed PT QA
      </button>
      <button onClick={() => fetchJobs("/api/jobs/indeed/es-qa")}>
        Indeed ES QA
      </button>
      <button onClick={() => fetchJobs("/api/jobs/indeed/es-tester")}>
        Indeed ES Tester
      </button>
      <button onClick={() => fetchJobs("/api/jobs/indeed/dk-qa")}>
        Indeed DK QA
      </button>
      <button onClick={() => fetchJobs("/api/jobs/indeed/de-qa")}>
        Indeed DE QA
      </button>
      <button onClick={() => fetchJobs("/api/jobs/indeed/nl-qa")}>
        Indeed NL QA
      </button>
      <button onClick={() => fetchJobs("/api/jobs/indeed/lu-qa")}>
        Indeed LU QA
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : jobs.length ? (
        <ul>
          {jobs.map((job, index) => (
            <li key={index}>
              <h2>{job.title}</h2>
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
