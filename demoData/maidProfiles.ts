import j1 from "@/public/jobImage/j1.jpg";
import j2 from "@/public/jobImage/j2.jpg";
import j3 from "@/public/jobImage/j3.jpg";
import j4 from "@/public/jobImage/j4.jpg";

export const maidProfiles = [
  {
    id: 1,
    name: "Wati",
    nationality: "Indonesian",
    age: 38,
    image: j1,
    Bahasa_Indonesia: "Fluent",
    yearsInSingapore: 6,
    preferredCare: "children aged 1-6",
    skills: "cooking Indonesian & Chinese food",
    languages: {
      english: "Basic",
      native: "Bahasa Indonesian Fluent",
    },
    availability: " 15 August 2025",
  },
  {
    id: 2,
    name: "Marla",
    nationality: "Filipino",
    age: 32,
    image: j2,
    yearsInSingapore: 4,
    preferredCare: "infant care & housekeeping",
    softskills: "tech-savvy and independent",
    skills: "Strong in infant care & housekeeping &  new born baby care",
    languages: {
      english: "Good English",
      native: "Filipino",
    },
    availability: "for transfer immediately",
  },
  {
    id: 3,
    name: "Mya",
    nationality: "Myanmar",
    age: 27,
    image: j3,
    yearsInSingapore: 3,
    softskills: " Experience with elderly (wheelchair support)",
    preferredCare: "elderly (including wheelchair support)",
    skills: "can cook simple Chinese & Burmese dishes",
    languages: {
      english: "Simple English",
      native: "Burmese",
      additional: "fast learner",
    },
    availability: "end of July",
  },
  {
    id: 4,
    name: "Siti",
    nationality: "Indonesian",
    age: 40,
    image: j4,
    yearsInSingapore: 10,
    preferredCare: "cooking & housekeeping",
    Commitment: "Wants a long-term employe",
    skills: "very experienced in cooking & housekeeping",
    languages: {
      english: "Basic",
      native: "Bahasa Indonesian",
      additional: "Mandarin",
    },
    availability: "Transfer notice given by current employer",
  },
];
