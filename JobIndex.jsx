import jobData from "assets/jobData";

const JobIndex = () => {

    const jobs = Object.values(jobData);

    const jobList = jobs.map((job) => {
        return <li>{job.title}</li>
    });

    return (
        <h1>{jobList}</h1>
    )
}

export default App;
