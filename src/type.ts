import { UniversityIcon } from "lucide-react";
import { number } from "zod";


export type patientCaseType = {
  id: number;
  specidRequiredSpecialization: string;
  city: string;
  status: string;
  createdAt: string;
  age: number;
  patientName: string;
  image: string;
  aiAnalysisResult: string;
};
export type CreateCasePayload = {
  Image: File; // لأننا هنبعتها كـ FormData
  SymptomsText?: string;
  PainDuration?: string;
  ChronicDiseases?: string;
  City: string;
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
export type forgetPasswordType = {
    email:string
  }
  export type studentType = {
  "id": number,
  "fullName": string,
  "phoneNumber": string,
  "city": string,
  "uniEmail": string,
  "profileImageUrl": string,
  "specializations": string[
    
  ]
}
export type notificationType = {
    "id": number,
    "isRead": boolean,
    "title": string,
    "message": string,
    "type": number,
    "referenceId": number,
    "createdAt": string
  }
  export type studentTreatementRequest = {
    "requestId": number,
    "caseId": number,
    "patientName": string,
    "caseDescription": string,
    "city": string,
    "caseStatus": number | string,
    "requestStatus": number | string,
    "createdAt": string
  }
  export type patientTreatementRequest = {
    "id": number,
    "caseId": number,
    "studentId": number,
    "studentName": string,
    "studentCity": string,
    "studentPhoneNumber": string,
    "studentProfileImageUrl": string | null,
    "averageRating":number,
    "totalRatings":number,
    "status": string,
    "initiatedBy": string,
    "createdAt": string
  }
  export type currentUserType = {
  "userId": string,
  "email": string,
  "displayName": string,
  "role": string
}
export type RegisterFormValues = {
  id:number,
  fullName: string;
  uniEmail: string;
  email: string;
  phoneNumber: string;
  password: string;
  city: string;
  specializations: number[]; // مصفوفة أرقام زي ما إنت محدد في Schema
};

// {
//   id,
//   patientName,
//   phone,
//   city,
//   age,
//   email,
//   treatmentRquest:{
//     requestId,
//     treatmentProposal,
//     patientCase:{
//       caseId,
//       status,
//       disease,
//       desc,
//       images:[...],
//   },
//   appointments:{
//       id,
//       status,
//       location,
//       date,
//   },
//   myDoctor:{
//       id,
//       name,
//       university,
//   }
//   }
  

// }

