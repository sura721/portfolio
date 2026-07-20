"use client";

import { UploadButton } from "@/utils/uploadthings";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import useSWR from "swr";

type Skill = { _id: string; name: string };
type Project = { _id: string; title: string };
type Experience = { _id: string; title: string };
type Education = { _id: string; degree: string };
type Certification = { _id: string; name: string };
type Feature = { _id: string; title: string };
type Testimonial = {
  _id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
  status: string;
};
type TestimonialDraft = {
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
  status: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AdminPage = () => {
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
  const { data: features, mutate: mutateFeatures } = useSWR<Feature[]>(
    "/api/features",
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
    "/api/testimonials?status=all",
    fetcher
  );

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
  const [featureTitle, setFeatureTitle] = useState("");
  const [featureDescription, setFeatureDescription] = useState("");
  const [featureStatus, setFeatureStatus] = useState("Researching");
  const [certificationName, setCertificationName] = useState("");
  const [certificationIssuer, setCertificationIssuer] = useState("");
  const [certificationVerificationUrl, setCertificationVerificationUrl] = useState("");
  const [testimonialName, setTestimonialName] = useState("");
  const [testimonialRole, setTestimonialRole] = useState("");
  const [testimonialCompany, setTestimonialCompany] = useState("");
  const [testimonialQuote, setTestimonialQuote] = useState("");
  const [testimonialInitials, setTestimonialInitials] = useState("");
  const [testimonialDrafts, setTestimonialDrafts] = useState<Record<string, TestimonialDraft>>({});

  useEffect(() => {
    if (!testimonials) return;

    const nextDrafts = testimonials.reduce<Record<string, TestimonialDraft>>((acc, item) => {
      acc[item._id] = {
        name: item.name,
        role: item.role,
        company: item.company,
        quote: item.quote,
        initials: item.initials,
        status: item.status,
      };
      return acc;
    }, {});

    setTestimonialDrafts(nextDrafts);
  }, [testimonials]);

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
        toast.success(successMessage);
        mutate();
        return true;
      }

      const errorData = await response.json().catch(() => null);
      toast.error(errorData?.error || "Something went wrong");
      return false;
    } catch (error) {
      toast.error(`An unexpected error occurred: ${error}`);
      return false;
    }
  };

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
        toast.success("Item deleted successfully!");
        mutate();
      } else {
        const errorData = await response.json().catch(() => null);
        toast.error(errorData?.error || "Failed to delete");
      }
    } catch (error) {
      toast.error(`An unexpected error occurred: ${error}`);
    }
  };

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

  const handleFeatureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleApiSubmit(
      "features",
      {
        title: featureTitle,
        description: featureDescription,
        status: featureStatus,
      },
      "Feature added!",
      mutateFeatures
    );
    if (success) {
      setFeatureTitle("");
      setFeatureDescription("");
      setFeatureStatus("Researching");
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
        status: "pending",
      },
      "Testimonial submitted for review!",
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

  const updateDraftField = (id: string, field: keyof TestimonialDraft, value: string) => {
    setTestimonialDrafts((current) => ({
      ...current,
      [id]: {
        ...(current[id] ?? {
          name: "",
          role: "",
          company: "",
          quote: "",
          initials: "",
          status: "pending",
        }),
        [field]: value,
      },
    }));
  };

  const handleTestimonialUpdate = async (item: Testimonial, statusOverride?: string) => {
    const draft = testimonialDrafts[item._id] ?? {
      name: item.name,
      role: item.role,
      company: item.company,
      quote: item.quote,
      initials: item.initials,
      status: item.status,
    };

    try {
      const response = await fetch(`/api/testimonials/${item._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...draft,
          status: statusOverride ?? draft.status ?? "pending",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        toast.error(errorData?.error || "Failed to update testimonial");
        return;
      }

      toast.success(statusOverride ? `Testimonial ${statusOverride}.` : "Testimonial updated.");
      mutateTestimonials();
    } catch (error) {
      toast.error(`An unexpected error occurred: ${error}`);
    }
  };

  return (
    <div className="container mx-auto p-8 space-y-12 bg-gray-900 text-white min-h-screen">
      <Toaster position="top-center" richColors />
      <h1 className="text-4xl font-bold text-center">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <form
          onSubmit={handleFeatureSubmit}
          className="space-y-4 p-6 bg-gray-800 rounded-lg"
        >
          <h2 className="text-2xl font-semibold">Add Current Work</h2>
          <input
            value={featureTitle}
            onChange={(e) => setFeatureTitle(e.target.value)}
            placeholder="Feature title"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <textarea
            value={featureDescription}
            onChange={(e) => setFeatureDescription(e.target.value)}
            placeholder="Short description"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <select
            value={featureStatus}
            onChange={(e) => setFeatureStatus(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded"
          >
            <option>Researching</option>
            <option>In Progress</option>
            <option>Building</option>
            <option>Launching Soon</option>
          </select>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-700"
          >
            Add Current Work
          </button>
        </form>

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
                toast.success("Upload Completed");
              }
            }}
            onUploadError={(error: Error) => {
              toast.error(`ERROR! ${error.message}`);
            }}
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
          <h2 className="text-2xl font-semibold mb-4">Manage Current Work</h2>
          <div className="space-y-2">
            {features?.map((feature) => (
              <div
                key={feature._id}
                className="flex justify-between items-center bg-gray-700 p-2 rounded"
              >
                <span className="truncate pr-2">{feature.title}</span>
                <button
                  onClick={() =>
                    handleDelete("features", feature._id, mutateFeatures)
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
          <div className="space-y-3">
            {testimonials?.map((item) => {
              const draft = testimonialDrafts[item._id] ?? {
                name: item.name,
                role: item.role,
                company: item.company,
                quote: item.quote,
                initials: item.initials,
                status: item.status,
              };

              return (
                <div key={item._id} className="bg-gray-700 p-3 rounded space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate pr-2">{draft.name}</span>
                    <span className="text-xs uppercase tracking-wide text-gray-300">{draft.status}</span>
                  </div>
                  <input
                    value={draft.name}
                    onChange={(e) => updateDraftField(item._id, "name", e.target.value)}
                    placeholder="Name"
                    className="w-full p-2 bg-gray-600 rounded"
                  />
                  <input
                    value={draft.role}
                    onChange={(e) => updateDraftField(item._id, "role", e.target.value)}
                    placeholder="Role"
                    className="w-full p-2 bg-gray-600 rounded"
                  />
                  <input
                    value={draft.company}
                    onChange={(e) => updateDraftField(item._id, "company", e.target.value)}
                    placeholder="Company"
                    className="w-full p-2 bg-gray-600 rounded"
                  />
                  <textarea
                    value={draft.quote}
                    onChange={(e) => updateDraftField(item._id, "quote", e.target.value)}
                    placeholder="Quote"
                    className="w-full p-2 bg-gray-600 rounded"
                  />
                  <input
                    value={draft.initials}
                    onChange={(e) => updateDraftField(item._id, "initials", e.target.value)}
                    placeholder="Initials"
                    className="w-full p-2 bg-gray-600 rounded"
                  />
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleTestimonialUpdate(item, "approved")}
                      className="px-3 py-1 text-sm bg-green-600 rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleTestimonialUpdate(item, "rejected")}
                      className="px-3 py-1 text-sm bg-yellow-600 rounded hover:bg-yellow-700"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleTestimonialUpdate(item)}
                      className="px-3 py-1 text-sm bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleDelete("testimonials", item._id, mutateTestimonials)}
                      className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
