import { Project } from "@/types/project";

const projects: Project[] = [
  {
    id: "project-5",
    title: "Tournament Management Website v1.0",
    shortDescription: "A website that can handle tournament registration and management.",
    date: "June 2024 - Present",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/CS471-Tournament-Website/tournament-website-front",
    figmaUrl: "https://www.figma.com/design/tr1VJ6IcltUhb0g93zwvSG/se-pages-design?node-id=187-2446&t=3qFctfA6s9AbpeDf-1",
    status: "offline",
  },
  {
    id: "project-4",
    title: "Medicine Recognition Application & Stock Counter",
    shortDescription: "A medicine recognition application that can recognize the medicine and count the stock of the medicine using YoloV5 and Firebase.",
    date: "Nov 2023 - Mar 2024",
    technologies: ["Flutter", "Dart", "Firebase", "Python"],
    githubUrl: "https://github.com/MedicCount/medic_count_fe",
    figmaUrl: "https://www.figma.com/design/pIwOyamhHtmBHXHNPpgUp5/01418342-Mobile-App-Development-%7C-Final-Project-UX%2FUI?node-id=0-1&t=7M2YEjjweVQde81K-1",
    presentationUrl: "https://www.canva.com/design/DAGBMlqWrOc/o2PcJgFC30nFG3aEgI2bGQ/edit",
  },
  {
    id: "project-3",
    title: "KU Hackathon 2023 - กระเทาะแอปนิสิต โดยนิสิต เพื่อนิสิต",
    shortDescription: "Hackathon for students by students, a project that requires students to create a mobile application to replace old NisitKU App with new features.",
    date: "Nov 2023 - Mar 2024",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/ku-t3ch/ku-hackathon",
    liveUrl: "https://hackathon.ku.ac.th/",
    status: "offline",
  },
  {
    id: "project-2",
    title: "KUSA Project - Student Activity Management System (First Phase)",
    shortDescription: "A project that help clubs to open their activities and manage their activities with their requested student activity budget allocations.",
    date: "Nov 2023 - Mar 2024",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://saku.sa.ku.ac.th/",
    commission: true,
    status: "online",
  },
  {
    id: "project-1",
    title: "POP KU - POP Kana",
    shortDescription: "A fun pop cat game to test your reflexes and show off your skills, compete as individuals for each departments.",
    date: "Sep 2023",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/ku-t3ch/pop-kana",
    liveUrl: "https://pop-ku.kutech.club/",
    figmaUrl: "https://www.figma.com/design/rUA8fIrSf0vbPrbBzDvSa4/Popcat%40KU-T3CH?node-id=0-1&t=g4vXRTqbaoWsdyaa-1",
    status: "offline",
  },
];

export default projects;
