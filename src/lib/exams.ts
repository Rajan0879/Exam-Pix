export type DocSpec = {
  label: string;
  dimensions: string;
  fileSize: string;
  format: string;
  background?: string;
  width: number;
  height: number;
  maxKb: number;
};

export type Exam = {
  slug: string;
  name: string;
  fullName: string;
  authority: string;
  category: "SSC" | "Railway" | "Banking" | "UPSC" | "Medical" | "Engineering" | "State" | "Defence";
  status: "Open" | "Upcoming" | "Closed";
  short: string;
  initials: string;
  updates: string;
  specs: DocSpec[];
  instructions: string[];
  mistakes: string[];
  faqs: { q: string; a: string }[];
};

const photo = (w: number, h: number, kb: number, extra?: Partial<DocSpec>): DocSpec => ({
  label: "Photograph",
  dimensions: `${w} x ${h} px`,
  fileSize: `20 KB – ${kb} KB`,
  format: "JPG / JPEG",
  background: "White or light coloured",
  width: w,
  height: h,
  maxKb: kb,
  ...extra,
});

const sign = (w: number, h: number, kb: number): DocSpec => ({
  label: "Signature",
  dimensions: `${w} x ${h} px`,
  fileSize: `10 KB – ${kb} KB`,
  format: "JPG / JPEG",
  background: "White",
  width: w,
  height: h,
  maxKb: kb,
});

const thumb = (w: number, h: number, kb: number): DocSpec => ({
  label: "Thumb impression",
  dimensions: `${w} x ${h} px`,
  fileSize: `10 KB – ${kb} KB`,
  format: "JPG / JPEG",
  background: "White",
  width: w,
  height: h,
  maxKb: kb,
});

const baseInstructions = [
  "Photograph must be recent (taken within the last 3 months) with a clear front view of the face.",
  "Face should cover about 70–80% of the frame with both ears visible.",
  "Signature must be done with black or blue ink on white paper, then scanned or photographed.",
  "Do not upload selfies, filtered images, or photos with caps and sunglasses.",
];

const baseMistakes = [
  "Uploading a photo larger than the allowed file size limit.",
  "Blurred or low-resolution scan of the signature.",
  "Using a coloured or patterned background instead of white.",
  "Photo dimensions not matching the exact pixel requirement.",
];

const baseFaqs = (name: string) => [
  {
    q: `What photo size is required for ${name}?`,
    a: `Check the requirement table on this page — ExamPix automatically applies the exact pixel dimensions and KB limit for ${name} when you upload your image.`,
  },
  {
    q: "Is my uploaded file stored anywhere?",
    a: "No. All resizing happens inside your browser. Your photo and signature never leave your device and nothing is uploaded to a server.",
  },
  {
    q: "Do I need to create an account?",
    a: "No signup is required. Upload, generate and download in a few seconds — completely free.",
  },
  {
    q: "Which format should I upload?",
    a: "JPG or JPEG is accepted by almost every exam portal. ExamPix outputs JPG by default and lets you switch to PNG or WEBP if needed.",
  },
];

export const exams: Exam[] = [
  {
    slug: "ssc-cgl",
    name: "SSC CGL",
    fullName: "Staff Selection Commission — Combined Graduate Level",
    authority: "Staff Selection Commission",
    category: "SSC",
    status: "Open",
    initials: "CGL",
    short: "Graduate level recruitment for Group B and C posts across ministries.",
    updates: "Application window open — photo must be taken within the last 3 months.",
    specs: [photo(413, 531, 50), sign(413, 155, 20)],
    instructions: baseInstructions,
    mistakes: baseMistakes,
    faqs: baseFaqs("SSC CGL"),
  },
  {
    slug: "ssc-chsl",
    name: "SSC CHSL",
    fullName: "Combined Higher Secondary Level Examination",
    authority: "Staff Selection Commission",
    category: "SSC",
    status: "Open",
    initials: "CHSL",
    short: "12th pass level recruitment for LDC, JSA, DEO and postal assistant posts.",
    updates: "Live application — signature must be in running handwriting, not capital letters.",
    specs: [photo(413, 531, 50), sign(413, 155, 20)],
    instructions: baseInstructions,
    mistakes: baseMistakes,
    faqs: baseFaqs("SSC CHSL"),
  },
  {
    slug: "ssc-gd-constable",
    name: "SSC GD",
    fullName: "SSC General Duty Constable",
    authority: "Staff Selection Commission",
    category: "Defence",
    status: "Upcoming",
    initials: "GD",
    short: "Constable recruitment for BSF, CISF, CRPF, SSB, ITBP and Assam Rifles.",
    updates: "Notification expected soon — keep documents ready in advance.",
    specs: [photo(320, 240, 50), sign(240, 100, 20)],
    instructions: baseInstructions,
    mistakes: baseMistakes,
    faqs: baseFaqs("SSC GD"),
  },
  {
    slug: "rrb-ntpc",
    name: "RRB NTPC",
    fullName: "Railway Recruitment Board — Non Technical Popular Categories",
    authority: "Railway Recruitment Board",
    category: "Railway",
    status: "Open",
    initials: "NTPC",
    short: "Station master, clerk, guard and junior accountant posts across zones.",
    updates: "Application open — RRB portals reject photos above 50 KB.",
    specs: [photo(413, 531, 50), sign(413, 155, 30)],
    instructions: baseInstructions,
    mistakes: baseMistakes,
    faqs: baseFaqs("RRB NTPC"),
  },
  {
    slug: "upsc-cse",
    name: "UPSC CSE",
    fullName: "Union Public Service Commission — Civil Services Examination",
    authority: "UPSC",
    category: "UPSC",
    status: "Open",
    initials: "CSE",
    short: "IAS, IPS, IFS and allied central services examination.",
    updates: "Photo must carry your name and date of photograph printed at the bottom.",
    specs: [photo(350, 350, 300), sign(350, 350, 300)],
    instructions: [
      "The photograph must clearly show your name and the date it was taken printed below the image.",
      ...baseInstructions,
    ],
    mistakes: baseMistakes,
    faqs: baseFaqs("UPSC CSE"),
  },
  {
    slug: "ibps-po",
    name: "IBPS PO",
    fullName: "Institute of Banking Personnel Selection — Probationary Officer",
    authority: "IBPS",
    category: "Banking",
    status: "Open",
    initials: "PO",
    short: "Probationary officer recruitment across participating public sector banks.",
    updates: "IBPS requires photo, signature, left thumb impression and a handwritten declaration.",
    specs: [photo(200, 230, 50), sign(140, 60, 20), thumb(240, 240, 50)],
    instructions: [
      "Left thumb impression must be on white paper with blue or black ink.",
      ...baseInstructions,
    ],
    mistakes: baseMistakes,
    faqs: baseFaqs("IBPS PO"),
  },
  {
    slug: "neet-ug",
    name: "NEET UG",
    fullName: "National Eligibility cum Entrance Test — Undergraduate",
    authority: "National Testing Agency",
    category: "Medical",
    status: "Upcoming",
    initials: "NEET",
    short: "Single entrance test for MBBS, BDS and AYUSH admissions in India.",
    updates: "NTA requires postcard size photo along with passport photo and thumb impression.",
    specs: [photo(413, 531, 200), sign(413, 155, 30), thumb(240, 240, 50)],
    instructions: baseInstructions,
    mistakes: baseMistakes,
    faqs: baseFaqs("NEET UG"),
  },
  {
    slug: "jee-main",
    name: "JEE Main",
    fullName: "Joint Entrance Examination — Main",
    authority: "National Testing Agency",
    category: "Engineering",
    status: "Open",
    initials: "JEE",
    short: "Engineering entrance for NITs, IIITs, CFTIs and JEE Advanced eligibility.",
    updates: "Application live — photo must include 80% face coverage on white background.",
    specs: [photo(413, 531, 200), sign(413, 155, 30)],
    instructions: baseInstructions,
    mistakes: baseMistakes,
    faqs: baseFaqs("JEE Main"),
  },
  {
    slug: "up-police-constable",
    name: "UP Police",
    fullName: "Uttar Pradesh Police Constable Recruitment",
    authority: "UPPRPB",
    category: "State",
    status: "Upcoming",
    initials: "UPP",
    short: "State level constable recruitment conducted by UP Police Board.",
    updates: "Keep photo, signature and thumb impression ready before the portal opens.",
    specs: [photo(200, 230, 50), sign(140, 60, 20), thumb(240, 240, 30)],
    instructions: baseInstructions,
    mistakes: baseMistakes,
    faqs: baseFaqs("UP Police Constable"),
  },
  {
    slug: "bihar-police-csbc",
    name: "Bihar Police",
    fullName: "Central Selection Board of Constable — Bihar Police",
    authority: "CSBC Bihar",
    category: "State",
    status: "Closed",
    initials: "CSBC",
    short: "Constable recruitment conducted by the Bihar CSBC board.",
    updates: "Last cycle closed — next notification expected in the coming months.",
    specs: [photo(200, 230, 50), sign(140, 60, 20)],
    instructions: baseInstructions,
    mistakes: baseMistakes,
    faqs: baseFaqs("Bihar Police"),
  },
  {
    slug: "sbi-clerk",
    name: "SBI Clerk",
    fullName: "State Bank of India — Junior Associate",
    authority: "State Bank of India",
    category: "Banking",
    status: "Open",
    initials: "SBI",
    short: "Junior associate (customer support and sales) recruitment in SBI branches.",
    updates: "Handwritten declaration image is mandatory along with photo and signature.",
    specs: [photo(200, 230, 50), sign(140, 60, 20), thumb(240, 240, 50)],
    instructions: baseInstructions,
    mistakes: baseMistakes,
    faqs: baseFaqs("SBI Clerk"),
  },
  {
    slug: "rrb-group-d",
    name: "RRB Group D",
    fullName: "Railway Recruitment Board — Level 1 Group D",
    authority: "Railway Recruitment Board",
    category: "Railway",
    status: "Open",
    initials: "GRP D",
    short: "Track maintainer, pointsman, helper and assistant posts in Indian Railways.",
    updates: "Application open — colour photo on white background only.",
    specs: [photo(413, 531, 100), sign(413, 155, 30)],
    instructions: baseInstructions,
    mistakes: baseMistakes,
    faqs: baseFaqs("RRB Group D"),
  },
];

export const examCategories = [
  "All",
  "SSC",
  "Railway",
  "Banking",
  "UPSC",
  "Medical",
  "Engineering",
  "State",
  "Defence",
] as const;

export const popularSearches = ["SSC CGL", "RRB NTPC", "UPSC CSE", "NEET UG", "IBPS PO"];

export function getExam(slug: string) {
  return exams.find((e) => e.slug === slug);
}

export function searchExams(query: string, category = "All") {
  const q = query.trim().toLowerCase();
  return exams.filter((e) => {
    const inCategory = category === "All" || e.category === category;
    if (!inCategory) return false;
    if (!q) return true;
    return (
      e.name.toLowerCase().includes(q) ||
      e.fullName.toLowerCase().includes(q) ||
      e.authority.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q)
    );
  });
}
