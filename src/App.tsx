import React, { useState } from "react";

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
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const fetchJobs = async (endpoint: string, buttonId: string) => {
    setLoading(true);
    setActiveButton(buttonId);
    try {
      const response = await fetch(
        `https://welcome-moth-kind.ngrok-free.app${endpoint}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        const updatedJobs = data.map((job: Job) => ({
          ...job,
          clicked: false,
        }));
        setJobs(updatedJobs);
      } else {
        throw new Error("Response not JSON");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
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
        <h1>Job Listings</h1>
      </div>
      <div className="container">
        <div className="sidebar">
          {[
            { label: "Spotify", endpoint: "/api/jobs/spotify" },
            { label: "Toggl", endpoint: "/api/jobs/toggl" },
            { label: "Kodify", endpoint: "/api/jobs/kodify" },
            { label: "Indeed PT QA", endpoint: "/api/jobs/indeed/pt-qa" },
            { label: "Indeed ES QA", endpoint: "/api/jobs/indeed/es-qa" },
            {
              label: "Indeed ES Tester",
              endpoint: "/api/jobs/indeed/es-tester",
            },
            { label: "Indeed DK QA", endpoint: "/api/jobs/indeed/dk-qa" },
            { label: "Indeed DE QA", endpoint: "/api/jobs/indeed/de-qa" },
            { label: "Indeed NL QA", endpoint: "/api/jobs/indeed/nl-qa" },
            { label: "Indeed LU QA", endpoint: "/api/jobs/indeed/lu-qa" },
            { label: "Indeed NO QA", endpoint: "/api/jobs/indeed/no-qa" },
            { label: "Indeed FR QA", endpoint: "/api/jobs/indeed/fr-qa" },
            { label: "Indeed FI TAE", endpoint: "/api/jobs/indeed/fi-tae" },
            { label: "Indeed SE QA", endpoint: "/api/jobs/indeed/se-qa" },
            {
              label: "Indeed IT Tester",
              endpoint: "/api/jobs/indeed/it-tester",
            },
            {
              label: "Indeed AT Tester",
              endpoint: "/api/jobs/indeed/at-tester",
            },
            { label: "Indeed BE QA", endpoint: "/api/jobs/indeed/be-qa" },
            {
              label: "Indeed BE Tester",
              endpoint: "/api/jobs/indeed/be-tester",
            },
          ].map((job, index) => (
            <button
              key={index}
              onClick={() => fetchJobs(job.endpoint, job.label)}
              style={{
                backgroundColor: activeButton === job.label ? "lightblue" : "",
              }}
            >
              {job.label}
            </button>
          ))}
        </div>
        <div className="content">
          {loading ? (
            <p>Loading...</p>
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
