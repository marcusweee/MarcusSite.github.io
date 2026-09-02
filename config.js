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
      {
        label: "Week 1 – Instructional Materials (Drive folder)",
        url: "https://docs.google.com/folderview?id=1tyQq4ct3XWERE5Kp9PC3f6v4jnpnhmt_",
      },
      {
        label: "Week 1 Recording",
        url: "https://www.youtube.com/watch?v=t23QCF1NXoE",
      },
      {
        label: "Week 1.2 Recording",
        url: "https://www.youtube.com/watch?v=n9TbwXuZ5_0",
      },
      {
        label: "Week 1.2 Backup Recording",
        url: "https://www.youtube.com/watch?v=EkU0H9PDALY",
      },
    ],
  },
  {
    code: "MATH 302",
    name: "Advanced Calculus 2",
    color: "blue",
    schedule: [{ day: "Mon", start: "10:30 AM", end: "1:30 PM", room: "" }],
    links: [],
    materials: [
      {
        label: "Recording (Exam 1)",
        url: "https://www.youtube.com/watch?v=Q9H0hbxOWHs",
      },
      {
        label: "Orientation Recording",
        url: "http://youtube.com/watch?v=wkF0ocbC4HI",
      },
      {
        label: "Week 1 Backup Recording 1",
        url: "https://www.youtube.com/watch?v=-BQvDx3aYQQ",
      },
      {
        label: "Week 1 Backup Recording 2",
        url: "https://www.youtube.com/watch?v=PebFLJ_u7TY&t=10s",
      },
      {
        label: "Week 1 Beamer (Google Classroom)",
        url: "https://classroom.google.com/c/ODc1MjQzMjUwOTc1/m/ODc1NTcwOTc5MTA2/details",
      },
    ],
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
    materials: [
      {
        label: "Syllabus & Books (Drive folder)",
        url: "https://drive.google.com/drive/folders/1p_fiEL7iiuHAldoPGs6brUbQLpm4ysav",
      },
      {
        label: "Week 1 Recording – Fundamental Theorem of Graph Theory",
        url: "https://www.youtube.com/watch?v=wuts5_OGlqI&t=7s",
      },
      {
        label: "Week 1 Recording 2",
        url: "https://www.youtube.com/watch?v=jZOt1tjNpD8",
      },
      {
        label: "Week 2.1 Recording – Join of Two Graphs",
        url: "https://www.youtube.com/watch?v=9OOsH6e2l8U&t=1s",
      },
      {
        label: "Week 2.1 Recording 2",
        url: "https://www.youtube.com/watch?v=DzYI3xNUI-8",
      },
      {
        label: "Week 2.2 Recording – Corona of Graphs",
        url: "https://www.youtube.com/watch?v=k2xpsaQuQnE",
      },
    ],
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
        label: "Recording (Exam 1)",
        url: "https://www.youtube.com/watch?v=xRxqHdkFBY0",
      },
      {
        label: "Week 1 Backup Recording (SharePoint Stream)",
        url: "https://pupedu.sharepoint.com/sites/A26-27BSMATH3-1EDE/_layouts/15/stream.aspx?id=%2Fsites%2FA26%2D27BSMATH3%2D1EDE%2FShared%20Documents%2FGeneral%2FBSMATH%203%2D1%20%2819AUG26%29%2Emp4",
      },
      {
        label: "Week 2 – Vids & Beamer (OneDrive folder)",
        url: "https://pupedu-my.sharepoint.com/personal/rrbernardino_pup_edu_ph/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Frrbernardino_pup_edu_ph%2FDocuments%2FDIFFERENTIAL%20EQUATIONS%20(2026)&ga=1",
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

// Notes and deadlines to keep in view on the homepage.
// due is optional — plain reminders don't need one.
// url is optional too — leave it "" for a plain announcement.
// bullets is optional — add a short list under the text if it helps
// (e.g. what to bring, what's covered).
const ANNOUNCEMENTS = [
  // { text: "Midterm exams start", due: "Oct 6", url: "", color: "yellow" },
  // { text: "Bring for the exam", bullets: ["Valid ID", "Calculator", "Blue book"], color: "blue" },
];

// General text/links that aren't tied to one subject — portal, enrollment,
// org pages, references. Three kinds of entries, mix and match in any order:
//
//   { heading: "Enrollment" }
//     — a section heading to break up the list.
//
//   { text: "PUP Student Portal", url: "https://..." }
//     — a single line. Add url to make it a clickable link, or leave url ""
//       (or drop it) for a plain note.
//
//   { text: "Requirements for enrollment", bullets: ["Bring your COR", "Pay assessment fee"] }
//     — a line followed by an indented bullet list. You can also drop
//       "text" and just use "bullets" for a standalone list with no intro.
//
const GENERAL_ITEMS = [
  { heading: "Enrollment" },
  { text: "PUP Student Portal", url: "" },
  {
    text: "Requirements for enrollment",
    bullets: ["Bring your COR", "Pay assessment fee"],
  },
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
