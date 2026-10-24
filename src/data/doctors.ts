import type { DoctorReviewer } from "@/types/catalogue";

export const DOCTORS: DoctorReviewer[] = [
  {
    id: "dr-shantakumar-muruda",
    name: "Dr. Shantakumar Muruda",
    qualification: "MBBS, MD (Biochemistry)",
    department: "Clinical Biochemistry & Molecular Diagnostics",
    registrationNumber: "KMC-68491",
    profileUrl: "/dr-shantakumar-muruda",
    avatarUrl: "https://res.cloudinary.com/btjglif5/image/upload/v1784150133/Assets-QXL/legacy-assets/image/dr_shantakumar_latest.jpg"
  },
  {
    id: "dr-naveen-kumar-n",
    name: "Dr. Naveen Kumar N",
    qualification: "MBBS, DCP, DNB (Pathology)",
    department: "Haematopathology & Clinical Pathology",
    registrationNumber: "KMC-79214",
    profileUrl: "/dr-naveen-kumar-n",
    avatarUrl: "https://res.cloudinary.com/btjglif5/image/upload/v1784150134/Assets-QXL/legacy-assets/image/dr_naveen_latest.jpg"
  },
  {
    id: "dr-pritilata-rout",
    name: "Dr. Pritilata Rout",
    qualification: "MBBS, MD (Pathology), NIMHANS Alumna",
    department: "Histopathology, Cytology & Neuropathology",
    registrationNumber: "KMC-54320",
    profileUrl: "/dr-pritilata-rout",
    avatarUrl: "https://res.cloudinary.com/btjglif5/image/upload/v1784150135/Assets-QXL/legacy-assets/image/dr_pritilata_latest.jpg"
  }
];

export const doctorsById: Record<string, DoctorReviewer> = Object.fromEntries(
  DOCTORS.map(d => [d.id, d])
);
