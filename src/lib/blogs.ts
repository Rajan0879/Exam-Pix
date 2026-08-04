export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  date: string;
  sections: { heading: string; body: string[] }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "photo-size-for-government-exams",
    title: "Photo and Signature Size for Government Exams: The Complete 2026 Guide",
    excerpt:
      "Every major Indian exam has a different pixel and KB requirement. Here is the single reference table plus the fastest way to match it.",
    category: "Guides",
    readMinutes: 7,
    date: "2026-06-18",
    sections: [
      {
        heading: "Why photo rejection happens",
        body: [
          "Most application forms are rejected not because of eligibility, but because the uploaded photograph fails a silent validation rule. Portals check three things: pixel dimensions, file size in kilobytes, and file format.",
          "A photo taken on a modern phone is typically 3000 x 4000 pixels and 4 MB. Almost every exam portal caps the photo at 50 KB, so the raw file will always be rejected.",
        ],
      },
      {
        heading: "The three numbers that matter",
        body: [
          "Dimensions decide how the photo is displayed on your admit card. Common values are 413 x 531 px for SSC and Railway exams and 200 x 230 px for banking exams.",
          "File size is a hard limit. If the notification says 20 KB to 50 KB, a 19 KB file is rejected just as fast as a 51 KB file.",
          "Format is almost always JPG. PNG files carry transparency data that many older government portals cannot parse.",
        ],
      },
      {
        heading: "Getting it right in one attempt",
        body: [
          "Search your exam on ExamPix, upload the raw photo, and the exact preset is applied automatically. The output is generated in your browser, so nothing is uploaded anywhere.",
          "Always keep one clean, high resolution source photo on white background. From that single file you can generate every variant an exam asks for.",
        ],
      },
    ],
  },
  {
    slug: "how-to-scan-signature-correctly",
    title: "How to Scan Your Signature Correctly for Online Applications",
    excerpt:
      "A grey, blurry signature is the second most common rejection reason. Six minutes of care saves a full application cycle.",
    category: "How-to",
    readMinutes: 5,
    date: "2026-05-30",
    sections: [
      {
        heading: "Start with the paper",
        body: [
          "Use a plain white unruled sheet. Sign inside a rectangle roughly 6 cm wide and 2 cm tall with a black or blue gel pen. Avoid ballpoint pens with faint ink.",
        ],
      },
      {
        heading: "Capture in even light",
        body: [
          "Photograph the paper in daylight near a window, holding the camera parallel to the sheet. Shadows across the paper turn grey after compression and look like smudges.",
          "Do not use flash directly — it creates a bright hotspot that the portal may read as a blank area.",
        ],
      },
      {
        heading: "Clean and resize",
        body: [
          "Run the file through the Signature tool. Background whitening pushes light grey pixels to pure white, and ink darkening restores contrast lost to compression.",
          "Finish by targeting the KB limit from the notification, usually 10 KB to 20 KB.",
        ],
      },
    ],
  },
  {
    slug: "common-application-form-mistakes",
    title: "9 Application Form Mistakes That Cost Students an Entire Exam Cycle",
    excerpt:
      "From capital letter signatures to expired photographs — the small errors that quietly invalidate a form.",
    category: "Checklist",
    readMinutes: 6,
    date: "2026-04-22",
    sections: [
      {
        heading: "Document mistakes",
        body: [
          "Signing in capital letters. Most commissions treat a block-letter signature as invalid because it cannot be matched at the exam centre.",
          "Using a photo older than three months. Several exams require the date of photography printed on the image itself.",
          "Uploading a group photo cropped to one face. Resolution collapses and the face becomes unusable on the admit card.",
        ],
      },
      {
        heading: "Technical mistakes",
        body: [
          "Renaming a PNG to .jpg. The file header still says PNG and the upload silently fails.",
          "Compressing until the face is unreadable. Reduce dimensions first, then compress — not the other way around.",
        ],
      },
      {
        heading: "Process mistakes",
        body: [
          "Filling the form on the last day. Portals throttle under load and uploads fail mid-way.",
          "Not saving a copy of the final submitted images. Keep every generated file in one folder per exam.",
        ],
      },
    ],
  },
  {
    slug: "passport-size-photo-explained",
    title: "Passport Size Photo in India: Dimensions, Background and Print Layout",
    excerpt:
      "35 x 45 mm, white background, 80% face coverage. What that means in pixels and how to print a full sheet.",
    category: "Guides",
    readMinutes: 4,
    date: "2026-03-14",
    sections: [
      {
        heading: "The standard",
        body: [
          "An Indian passport size photo is 35 mm wide and 45 mm tall. At 300 DPI that becomes roughly 413 x 531 pixels, which is exactly why so many exam portals use that number.",
        ],
      },
      {
        heading: "Framing rules",
        body: [
          "Face should occupy 70 to 80 percent of the height, with a small margin above the head. Look straight into the lens with a neutral expression and both ears visible.",
        ],
      },
      {
        heading: "Printing a sheet",
        body: [
          "The Passport Photo tool arranges multiple copies on a 4x6 inch sheet so a local print shop can produce a full set from one download.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
