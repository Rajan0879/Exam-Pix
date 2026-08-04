import {
  Crop,
  FileImage,
  Image as ImageIcon,
  Minimize2,
  PenLine,
  Scissors,
  UserSquare,
  type LucideIcon,
} from "lucide-react";

export type Tool = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  mode: "resize" | "compress" | "signature" | "passport" | "background" | "crop" | "convert";
};

export const tools: Tool[] = [
  {
    slug: "photo-resize",
    name: "Photo Resize",
    tagline: "Exact pixels, exact KB",
    description:
      "Resize any photograph to the exact pixel dimensions and file size limit demanded by an exam portal.",
    icon: ImageIcon,
    mode: "resize",
  },
  {
    slug: "signature-resize",
    name: "Signature Resize",
    tagline: "Clean white background",
    description:
      "Clean up a scanned signature, whiten the background, darken the ink and hit the KB target.",
    icon: PenLine,
    mode: "signature",
  },
  {
    slug: "compress-image",
    name: "Compress Image",
    tagline: "Hit any KB target",
    description:
      "Reduce file size to a target KB value without visibly damaging the photo quality.",
    icon: Minimize2,
    mode: "compress",
  },
  {
    slug: "passport-photo",
    name: "Passport Photo",
    tagline: "35 x 45 mm ready",
    description:
      "Create a standard passport size photo and download a print sheet with multiple copies.",
    icon: UserSquare,
    mode: "passport",
  },
  {
    slug: "background-remover",
    name: "Background Changer",
    tagline: "White, blue or custom",
    description:
      "Replace a busy background with a clean white or light blue backdrop accepted by exam forms.",
    icon: Scissors,
    mode: "background",
  },
  {
    slug: "crop-image",
    name: "Crop Image",
    tagline: "Fix the framing",
    description: "Crop to a fixed aspect ratio so the face fills the frame the way examiners expect.",
    icon: Crop,
    mode: "crop",
  },
  {
    slug: "image-converter",
    name: "Image Converter",
    tagline: "JPG, PNG, WEBP",
    description: "Convert between JPG, PNG and WEBP when the upload portal rejects your format.",
    icon: FileImage,
    mode: "convert",
  },
];

export function getTool(slug: string) {
  return tools.find((t) => t.slug === slug);
}
