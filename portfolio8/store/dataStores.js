import { create } from "zustand";
import axiosInstance from "../lib/axios.lib";
export const useDataStore = create((set) => {
  const fetchData = async (endpoint, key) => {
    try {
      const res = await axiosInstance.get(endpoint);
      set({ [key]: res.data });
      console.log(res.data)
    } catch (err) {
    }
  };

  return {
    skills: [],
    projects: [],
    expriances: [],

  
    fetchSkills: () => fetchData("/skills", "skills"),
    fetchProjects: () => fetchData("/projects", "projects"),
    fetchExperiance: () => fetchData("/experiences", "expriances"),


  };
});
