"use client";

import { UploadButton } from "@/utils/uploadthings";
import { useState } from "react";
import useSWR from "swr";

// Define types for our data
type Skill = { _id: string; name: string };
type Project = { _id: string; title: string };
type Experience = { _id: string; title: string };
type Education = { _id: string; degree: string };
type Certification = { _id: string; name: string };
type Testimonial = { _id: string; name: string };

// A generic fetcher for useSWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AdminPage = () => {
  // SWR hooks to fetch existing data and get a 'mutate' function to re-fetch
  const { data: skills, mutate: mutateSkills } = useSWR<Skill[]>(
    "/api/skills",
    fetcher
  );
  const { data: projects, mutate: mutateProjects } = useSWR<Project[]>(
    "/api/projects",
    fetcher
  );
  const { data: experiences, mutate: mutateExperiences } = useSWR<Experience[]>(
    "/api/experience",
    fetcher
  );
  const { data: education, mutate: mutateEducation } = useSWR<Education[]>(
    "/api/education",
    fetcher
  );
  const { data: certifications, mutate: mutateCertifications } = useSWR<Certification[]>(
    "/api/certifications",
    fetcher
  );
  const { data: testimonials, mutate: mutateTestimonials } = useSWR<Testimonial[]>(
    "/api/testimonials",
    fetcher
  );

  // States for your forms (as you had before)
  const [skillName, setSkillName] = useState("");
  const [skillCategory, setSkillCategory] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [projectTech, setProjectTech] = useState("");
  const [projectLive, setProjectLive] = useState("");
  const [projectGithub, setProjectGithub] = useState("");
  const [expTitle, setExpTitle] = useState("");
  const [expDesc, setExpDesc] = useState("");
  const [expDate, setExpDate] = useState("");
  const [expType, setExpType] = useState("Personal Projects");
  const [expIcon, setExpIcon] = useState("code");
  const [educationDegree, setEducationDegree] = useState("");
  const [educationInstitution, setEducationInstitution] = useState("");
  const [educationDescription, setEducationDescription] = useState("");
  const [educationStatus, setEducationStatus] = useState("");
  const [certificationName, setCertificationName] = useState("");
  const [certificationIssuer, setCertificationIssuer] = useState("");
  const [certificationVerificationUrl, setCertificationVerificationUrl] = useState("");
  const [testimonialName, setTestimonialName] = useState("");
  const [testimonialRole, setTestimonialRole] = useState("");
  const [testimonialCompany, setTestimonialCompany] = useState("");
  const [testimonialQuote, setTestimonialQuote] = useState("");
  const [testimonialInitials, setTestimonialInitials] = useState("");

  // Generic handler for form submissions
  const handleApiSubmit = async (
    endpoint: string,
    body: object,
    successMessage: string,
    mutate: () => void
  ) => {
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        alert(successMessage);
        mutate(); // Re-fetch the data to show the new item
        return true;
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Something went wrong"}`);
        return false;
      }
    } catch (error) {
      alert(`An unexpected error occurred: ${error}`);
      return false;
    }
  };

  // Generic handler for deletions
  const handleDelete = async (
    endpoint: string,
    id: string,
    mutate: () => void
  ) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }
    try {
      const response = await fetch(`/api/${endpoint}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Item deleted successfully!");
        mutate(); // Re-fetch the data to remove the item from the list
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to delete"}`);
      }
    } catch (error) {
      alert(`An unexpected error occurred: ${error}`);
    }
  };

  // Form submit handlers (now with mutate)
  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleApiSubmit(
      "skills",
      { name: skillName, category: skillCategory },
      "Skill Added!",
      mutateSkills
    );
    if (success) {
      setSkillName("");
      setSkillCategory("");
    }
  };
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const technologies = projectTech.split(",").map((t) => t.trim());
    const success = await handleApiSubmit(
      "projects",
      {
        title: projectTitle,
        description: projectDesc,
        image: projectImage,
        technologies,
        liveUrl: projectLive,
        githubUrl: projectGithub,
      },
      "Project Added!",
      mutateProjects
    );
    if (success) {
      setProjectTitle("");
      setProjectDesc("");
      setProjectImage("");
      setProjectTech("");
      setProjectLive("");
      setProjectGithub("");
    }
  };
  const handleExperienceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleApiSubmit(
      "experience",
      {
        title: expTitle,
        description: expDesc,
        dateRange: expDate,
        type: expType,
        icon: expIcon,
      },
      "Experience Added!",
      mutateExperiences
    );
    if (success) {
      setExpTitle("");
      setExpDesc("");
      setExpDate("");
    }
  };

  const handleEducationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleApiSubmit(
      "education",
      {
        degree: educationDegree,
        institution: educationInstitution,
        description: educationDescription,
        status: educationStatus,
      },
      "Education entry added!",
      mutateEducation
    );
    if (success) {
      setEducationDegree("");
      setEducationInstitution("");
      setEducationDescription("");
      setEducationStatus("");
    }
  };

  const handleCertificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleApiSubmit(
      "certifications",
      {
        name: certificationName,
        issuer: certificationIssuer,
        verificationUrl: certificationVerificationUrl,
      },
      "Certification added!",
      mutateCertifications
    );
    if (success) {
      setCertificationName("");
      setCertificationIssuer("");
      setCertificationVerificationUrl("");
    }
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleApiSubmit(
      "testimonials",
      {
        name: testimonialName,
        role: testimonialRole,
        company: testimonialCompany,
        quote: testimonialQuote,
        initials: testimonialInitials,
      },
      "Testimonial added!",
      mutateTestimonials
    );
    if (success) {
      setTestimonialName("");
      setTestimonialRole("");
      setTestimonialCompany("");
      setTestimonialQuote("");
      setTestimonialInitials("");
    }
  };

  return (
    <div className="container mx-auto p-8 space-y-12 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold text-center">Admin Dashboard</h1>

      {/* --- FORMS (as before) --- */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <form
          onSubmit={handleSkillSubmit}
          className="space-y-4 p-6 bg-gray-800 rounded-lg"
        >
          <h2 className="text-2xl font-semibold">Add New Skill</h2>
          <input
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            placeholder="Skill Name"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <input
            value={skillCategory}
            onChange={(e) => setSkillCategory(e.target.value)}
            placeholder="Category"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Add Skill
          </button>
        </form>
        {/* Project and Experience forms here... */}
        <form
          onSubmit={handleProjectSubmit}
          className="space-y-4 p-6 bg-gray-800 rounded-lg col-span-1 md:col-span-2 lg:col-span-1"
        >
          <h2 className="text-2xl font-semibold">Add New Project</h2>
          <input
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="Project Title"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <textarea
            value={projectDesc}
            onChange={(e) => setProjectDesc(e.target.value)}
            placeholder="Description"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <input
            value={projectTech}
            onChange={(e) => setProjectTech(e.target.value)}
            placeholder="Technologies (comma-separated)"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <input
            value={projectLive}
            onChange={(e) => setProjectLive(e.target.value)}
            placeholder="Live URL"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <input
            value={projectGithub}
            onChange={(e) => setProjectGithub(e.target.value)}
            placeholder="GitHub URL"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res) {
                setProjectImage(res[0].url);
                alert("Upload Completed");
              }
            }}
            onUploadError={(error: Error) => alert(`ERROR! ${error.message}`)}
          />
          {projectImage && (
            <p className="text-green-400 text-sm truncate">
              Image uploaded: {projectImage}
            </p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
          >
            Add Project
          </button>
        </form>
        <form
          onSubmit={handleExperienceSubmit}
          className="space-y-4 p-6 bg-gray-800 rounded-lg"
        >
          <h2 className="text-2xl font-semibold">Add New Experience</h2>
          <input
            value={expTitle}
            onChange={(e) => setExpTitle(e.target.value)}
            placeholder="Experience Title"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <textarea
            value={expDesc}
            onChange={(e) => setExpDesc(e.target.value)}
            placeholder="Description"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <input
            value={expDate}
            onChange={(e) => setExpDate(e.target.value)}
            placeholder="Date Range"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <select
            value={expType}
            onChange={(e) => setExpType(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded"
          >
            <option>Personal Projects</option>
<option>Freelance Projects</option>
<option>Backend Development</option>
<option>Database Management</option>
<option>Frontend Development</option>
<option>AI Integration</option>
<option>Deployment</option>
<option>Authentication</option>
<option>API Development</option>
<option>UI/UX Improvements</option>
<option>Testing & Debugging</option>
<option>Open Source Contributions</option>
<option>Team Collaboration</option>

          </select>
          <input
            value={expIcon}
            onChange={(e) => setExpIcon(e.target.value)}
            placeholder="Icon Name (e.g. code)"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 rounded hover:bg-green-700"
          >
            Add Experience
          </button>
        </form>
      </div>

      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
        <form
          onSubmit={handleEducationSubmit}
          className="space-y-4 p-6 bg-gray-800 rounded-lg"
        >
          <h2 className="text-2xl font-semibold">Add Education</h2>
          <input
            value={educationDegree}
            onChange={(e) => setEducationDegree(e.target.value)}
            placeholder="Degree"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <input
            value={educationInstitution}
            onChange={(e) => setEducationInstitution(e.target.value)}
            placeholder="Institution"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <textarea
            value={educationDescription}
            onChange={(e) => setEducationDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <input
            value={educationStatus}
            onChange={(e) => setEducationStatus(e.target.value)}
            placeholder="Status (e.g. In Progress, Completed)"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Add Education
          </button>
        </form>

        <form
          onSubmit={handleCertificationSubmit}
          className="space-y-4 p-6 bg-gray-800 rounded-lg"
        >
          <h2 className="text-2xl font-semibold">Add Certification</h2>
          <input
            value={certificationName}
            onChange={(e) => setCertificationName(e.target.value)}
            placeholder="Certification Name"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <input
            value={certificationIssuer}
            onChange={(e) => setCertificationIssuer(e.target.value)}
            placeholder="Issuer"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <input
            value={certificationVerificationUrl}
            onChange={(e) => setCertificationVerificationUrl(e.target.value)}
            placeholder="Verification URL"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
          >
            Add Certification
          </button>
        </form>

        <form
          onSubmit={handleTestimonialSubmit}
          className="space-y-4 p-6 bg-gray-800 rounded-lg"
        >
          <h2 className="text-2xl font-semibold">Add Testimonial</h2>
          <input
            value={testimonialName}
            onChange={(e) => setTestimonialName(e.target.value)}
            placeholder="Name"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <input
            value={testimonialRole}
            onChange={(e) => setTestimonialRole(e.target.value)}
            placeholder="Role"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <input
            value={testimonialCompany}
            onChange={(e) => setTestimonialCompany(e.target.value)}
            placeholder="Company"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <textarea
            value={testimonialQuote}
            onChange={(e) => setTestimonialQuote(e.target.value)}
            placeholder="Quote"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <input
            value={testimonialInitials}
            onChange={(e) => setTestimonialInitials(e.target.value)}
            placeholder="Initials"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 rounded hover:bg-green-700"
          >
            Add Testimonial
          </button>
        </form>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Manage Skills</h2>
          <div className="space-y-2">
            {skills?.map((skill) => (
              <div
                key={skill._id}
                className="flex justify-between items-center bg-gray-700 p-2 rounded"
              >
                <span>{skill.name}</span>
                <button
                  onClick={() =>
                    handleDelete("skills", skill._id, mutateSkills)
                  }
                  className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Manage Projects</h2>
          <div className="space-y-2">
            {projects?.map((project) => (
              <div
                key={project._id}
                className="flex justify-between items-center bg-gray-700 p-2 rounded"
              >
                <span className="truncate pr-2">{project.title}</span>
                <button
                  onClick={() =>
                    handleDelete("projects", project._id, mutateProjects)
                  }
                  className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Manage Experiences</h2>
          <div className="space-y-2">
            {experiences?.map((exp) => (
              <div
                key={exp._id}
                className="flex justify-between items-center bg-gray-700 p-2 rounded"
              >
                <span className="truncate pr-2">{exp.title}</span>
                <button
                  onClick={() =>
                    handleDelete("experience", exp._id, mutateExperiences)
                  }
                  className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Manage Education</h2>
          <div className="space-y-2">
            {education?.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-gray-700 p-2 rounded"
              >
                <span className="truncate pr-2">{item.degree}</span>
                <button
                  onClick={() =>
                    handleDelete("education", item._id, mutateEducation)
                  }
                  className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Manage Certifications</h2>
          <div className="space-y-2">
            {certifications?.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-gray-700 p-2 rounded"
              >
                <span className="truncate pr-2">{item.name}</span>
                <button
                  onClick={() =>
                    handleDelete("certifications", item._id, mutateCertifications)
                  }
                  className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Manage Testimonials</h2>
          <div className="space-y-2">
            {testimonials?.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-gray-700 p-2 rounded"
              >
                <span className="truncate pr-2">{item.name}</span>
                <button
                  onClick={() =>
                    handleDelete("testimonials", item._id, mutateTestimonials)
                  }
                  className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
