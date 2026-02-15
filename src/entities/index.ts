/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: codingstats
 * Interface for CodingStats
 */
export interface CodingStats {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  dashboardTitle?: string;
  /** @wixFieldType number */
  problemsSolvedCount?: number;
  /** @wixFieldType number */
  dailyStreakCount?: number;
  /** @wixFieldType number */
  globalRanking?: number;
  /** @wixFieldType datetime */
  lastUpdated?: Date | string;
  /** @wixFieldType url */
  profileUrl?: string;
  /** @wixFieldType number */
  progressIndicatorValue?: number;
}


/**
 * Collection ID: education
 * Interface for Education
 */
export interface Education {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType url */
  credentialUrl?: string;
  /** @wixFieldType text */
  entryType?: string;
  /** @wixFieldType text */
  degreeName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  certificateImage?: string;
  /** @wixFieldType text */
  institution?: string;
  /** @wixFieldType number */
  startYear?: number;
  /** @wixFieldType number */
  endYear?: number;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  location?: string;
}


/**
 * Collection ID: experience
 * Interface for Experience
 */
export interface Experience {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  jobTitle?: string;
  /** @wixFieldType text */
  companyName?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType date */
  startDate?: Date | string;
  /** @wixFieldType date */
  endDate?: Date | string;
  /** @wixFieldType text */
  description?: string;
}


/**
 * Collection ID: githubrepositories
 * Interface for GitHubRepositories
 */
export interface GitHubRepositories {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  repositoryName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  primaryLanguage?: string;
  /** @wixFieldType url */
  repositoryUrl?: string;
  /** @wixFieldType number */
  starsCount?: number;
  /** @wixFieldType datetime */
  lastUpdated?: Date | string;
}


/**
 * Collection ID: projects
 * Interface for Projects
 */
export interface Projects {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectName?: string;
  /** @wixFieldType text */
  tagline?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  techStack?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  projectImage?: string;
  /** @wixFieldType url */
  liveDemoUrl?: string;
  /** @wixFieldType url */
  githubUrl?: string;
  /** @wixFieldType date */
  completionDate?: Date | string;
}


/**
 * Collection ID: skills
 * Interface for Skills
 */
export interface Skills {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  skillName?: string;
  /** @wixFieldType number */
  proficiencyLevel?: number;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  skillImage?: string;
}


/**
 * Collection ID: socialprofiles
 * Interface for SocialProfiles
 */
export interface SocialProfiles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  platform?: string;
  /** @wixFieldType url */
  profileUrl?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  platformLogo?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType number */
  displayOrder?: number;
}
