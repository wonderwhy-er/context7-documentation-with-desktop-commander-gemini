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

/**
 * Rerank projects based on a search term
 * @param projects List of projects to rerank
 * @param searchTerm Term to rerank by (matches against project name and title)
 * @returns Reranked list of projects
 */
export function rerankProjects(projects: Project[], searchTerm: string): Project[] {
  if (!searchTerm) return projects;
  const lowerSearchTerm = searchTerm.toLowerCase();
  return [...projects].sort((a, b) => {
    const aTitle = a.settings.title.toLowerCase();
    const aProject = a.settings.project.toLowerCase();
    const bTitle = b.settings.title.toLowerCase();
    const bProject = b.settings.project.toLowerCase();

    // Exact matches first
    const aExactMatch = aProject === lowerSearchTerm || aTitle === lowerSearchTerm;
    const bExactMatch = bProject === lowerSearchTerm || bTitle === lowerSearchTerm;

    if (aExactMatch && !bExactMatch) return -1;
    if (!aExactMatch && bExactMatch) return 1;

    // Then starts-with matches
    const aStartsWithMatch =
      aProject.startsWith(lowerSearchTerm) || aTitle.startsWith(lowerSearchTerm);
    const bStartsWithMatch =
      bProject.startsWith(lowerSearchTerm) || bTitle.startsWith(lowerSearchTerm);

    if (aStartsWithMatch && !bStartsWithMatch) return -1;
    if (!aStartsWithMatch && bStartsWithMatch) return 1;

    // Then contains matches
    const aContainsMatch = aProject.includes(lowerSearchTerm) || aTitle.includes(lowerSearchTerm);
    const bContainsMatch = bProject.includes(lowerSearchTerm) || bTitle.includes(lowerSearchTerm);

    if (aContainsMatch && !bContainsMatch) return -1;
    if (!aContainsMatch && bContainsMatch) return 1;

    // Default to alphabetical by project name
    return aProject.localeCompare(bProject);
  });
}
