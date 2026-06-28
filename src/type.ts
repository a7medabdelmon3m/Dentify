import { number } from "zod";

export type patientCaseType = {
  id: number;
  specidRequiredSpecialization: string;
  description: string;
  city: string;
  status: string;
  createdAt: string ;
  patientName: string;
  image: string;
  aiAnalysisResult: string | null;
};
export type userProfileType = {
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  specializations: null;
};
export type ApiResponse<T> = {
  success: boolean;
  error?: string;
  data?: T;
  status: number;
};
export type availableDoctorsType = {
  id: number;
  fullName: string;
  city: string;
  uniEmail: string;
  profileImageUrl: null;
  specializations: string[];
};
export type proposalType = {
    id: number,
    caseId: number,
    studentId: number,
    studentName: string,
    studentCity: string,
    studentPhoneNumber: string,
    studentProfileImageUrl: string,
    averageRating: number,
    totalRatings: number,
    status: string,
    initiatedBy: string,
    createdAt: string
  } ;

  export type appointmentType = {
    "id": number,
    "caseId": number,
    "patientName": string,
    "studentName": string,
    "location": string,
    "status": string,
    "appointmentDate": `${string}T${string}Z`
};

export type studentAvailableCaseType = {
    "id": number,
    "specidRequiredSpecialization": string,
    "description": string,
    "city": string,
    "status": string,
    "createdAt": `${string}T${string}Z`,
    "patientName": string,
    "image": string,
    "aiAnalysisResult": string
  };
  export type profileType = {
  "fullName": string,
  "email": string,
  "phoneNumber": string,
  "role": string,
  "specializations":string[
    
  ]
}

