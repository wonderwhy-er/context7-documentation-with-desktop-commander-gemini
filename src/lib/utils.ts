import { Project } from "./types.js";

/**
 * Format a project for display
 * @param project The project to format
 * @returns Formatted project string
 */
export function formatProject(project: Project): string {
  return `Title: ${project.settings.title}\nLibrary name: ${project.settings.project}\n`;
}

/**
 * Format a list of projects for display
 * @param projects List of projects to format
 * @returns Formatted text with all projects
 */
export function formatProjectsList(projects: Project[]): string {
  const formattedProjects = projects.map(formatProject);
  return `${formattedProjects.length} available documentation libraries:\n\n${formattedProjects.join("\n")}`;
}
