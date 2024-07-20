import React, { useState } from "react";

interface Job {
  title: string;
  company: string;
  location: string;
  description: string;
}

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/jobs");
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
      <button onClick={fetchJobs}>Spotify</button>
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
