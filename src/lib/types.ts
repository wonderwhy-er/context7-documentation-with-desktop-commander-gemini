export interface ProjectSettings {
  title: string;
  project: string;
  folders: string[];
  docsRepoUrl: string;
}

export interface Version {
  lastUpdate: string;
  state: "initial" | "parsed" | "finalized" | "invalid_docs" | "error" | "stop" | "delete";
  parseDuration: number;
  totalTokens: number;
  totalSnippets: number;
  averageTokens: number;
}

export interface Project {
  settings: ProjectSettings;
  version: Version;
}

export interface CodeListElement {
  language: string;
  code: string;
}

export interface CodeSnippet {
  codeTitle: string;
  codeDescription: string;
  codeLanguage: string;
  codeTokens: number;
  codeId: string;
  pageTitle: string;
  codeList: CodeListElement[];
  relavance: number;
}
