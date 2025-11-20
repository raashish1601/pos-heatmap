export interface Candidate {
  id: string;
  name: string;
  experience: number;
  canJoinIn: number;
  minimumSalary: number;
  skills: Record<string, number>;
}

export interface Skill {
  name: string;
  type: "numeric" | "skill";
}

export type ViewType = "compare" | "individual" | "shortlisted";

export interface FilterOptions {
  minExperience?: number;
  maxExperience?: number;
  minSalary?: number;
  maxSalary?: number;
  maxJoinDays?: number;
  selectedSkills?: string[];
  sortBy?: "experience" | "salary" | "availability" | "name";
  sortOrder?: "asc" | "desc";
}
