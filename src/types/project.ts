export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  date: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  figmaUrl?: string;
  presentationUrl?: string;
  commission?: boolean;
  status?: 'online' | 'offline' | 'down';
}
