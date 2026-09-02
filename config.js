// ============================================================
// SEMESTER CONFIG
// This is the only file you need to edit day-to-day.
// Add class times, links (Zoom, Classroom, Discord, etc.) and
// materials (PDFs, slides, drive folders) per subject here —
// both index.html and subjects.html read from this automatically.
// ============================================================

const SUBJECTS = [
  {
    code: "MATH 301",
    name: "Abstract Algebra 2",
    color: "yellow",
    // One entry per weekly meeting. day: Mon/Tue/Wed/Thu/Fri/Sat
    schedule: [
      { day: "Mon", start: "6:00 PM", end: "7:30 PM", room: "" },
      { day: "Thu", start: "6:00 PM", end: "7:30 PM", room: "" },
    ],
    links: [
      // { label: "Google Classroom", url: "" },
    ],
    materials: [
      // { label: "Syllabus", url: "" },
    ],
  },
  {
    code: "MATH 302",
    name: "Advanced Calculus 2",
    color: "blue",
    schedule: [{ day: "Mon", start: "10:30 AM", end: "1:30 PM", room: "" }],
    links: [],
    materials: [],
  },
  {
    code: "MATH 303",
    name: "Graph Theory with Applications",
    color: "yellow",
    schedule: [
      { day: "Mon", start: "3:00 PM", end: "4:30 PM", room: "" },
      { day: "Thu", start: "3:00 PM", end: "4:30 PM", room: "" },
    ],
    links: [],
    materials: [],
  },
  {
    code: "MATH 208",
    name: "Elementary Differential Equation",
    color: "blue",
    schedule: [{ day: "Sat", start: "10:30 AM", end: "1:30 PM", room: "" }],
    links: [],
    materials: [
      {
        label: "CLASS ORIENTATION - DE (FIRST SEM 26-27).pdf",
        url: "https://pupedu-my.sharepoint.com/:b:/g/personal/rrbernardino_pup_edu_ph/IQD1Qjcl1SvlRbJ0aA-6vNt7Ae2lIyXBWG4DJveKD3A7H-g?e=vt1wAH",
      },
      {
        label: "ASYNC: Solution of Differential Equations",
        url: "https://pupedu-my.sharepoint.com/:v:/r/personal/rrbernardino_pup_edu_ph/Documents/DIFFERENTIAL%20EQUATIONS%20(2026)/SOLUTION%20OF%20A%20DIFFERENTIAL%20EQUATION.mp4?d=w4ea94d37264f40ddac33487b524bd4d6&csf=1&web=1&e=t5jyjX",
      },
    ],
  },
  {
    code: "STAT 313",
    name: "Statistical Theory",
    color: "yellow",
    schedule: [
      { day: "Wed", start: "4:30 PM", end: "7:30 PM", room: "Face-to-face" },
      { day: "Sat", start: "2:30 PM", end: "5:30 PM", room: "Online" },
    ],
    links: [],
    materials: [],
  },
  {
    code: "ECON 011",
    name: "Principles of Economics",
    color: "blue",
    schedule: [{ day: "Fri", start: "4:30 PM", end: "7:30 PM", room: "" }],
    links: [],
    materials: [],
  },
  {
    code: "GEED 037",
    name: "Life and Works of Rizal",
    color: "yellow",
    schedule: [{ day: "Fri", start: "1:30 PM", end: "4:30 PM", room: "" }],
    links: [],
    materials: [],
  },
];

// Links and materials that aren't tied to one subject —
// school portal, enrollment, org pages, general references, etc.
const GENERAL_LINKS = [
  // { label: "Student Portal", url: "" },
];

const GENERAL_MATERIALS = [
  // { label: "Academic Calendar", url: "" },
];

// Order used for the weekly schedule strip on the homepage.
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Turns a course code like "MATH 301" into a URL-safe slug "math-301"
function codeToSlug(code) {
  return code.toLowerCase().replace(/\s+/g, "-");
}

function getSubjectBySlug(slug) {
  return SUBJECTS.find((s) => codeToSlug(s.code) === slug);
}
