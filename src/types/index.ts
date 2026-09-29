export type UserRole = 'admin' | 'creator' | 'client' | 'public';

export type ModuleId = 
  | 'project_control'
  | 'crm_clients'
  | 'staff_hr'
  | 'finance'
  | 'surat'
  | 'documents'
  | 'equipments'
  | 'packaging'
  | 'audit'
  | 'recruitment_admin'
  | 'recruitment_public'
  | 'client_portal';

export type ContentFormat = 'Reels' | 'TikTok' | 'Feed Carousel' | 'Story' | 'YouTube' | 'Photo Product';
export type ProjectStage = 'ideation' | 'shooting' | 'editing' | 'review' | 'approved' | 'published';

export interface ProjectItem {
  id: string;
  title: string;
  brandId: string;
  brandName: string;
  division: 'Social Media Management' | 'Branding' | 'Commercial Video';
  format: ContentFormat;
  stage: ProjectStage;
  scheduledDate: string;
  deadlineDate: string;
  creatorId: string;
  creatorName: string;
  creatorRole: string;
  fee: number;
  materiUrl?: string;
  driveLink?: string;
  caption: {
    hook: string;
    body: string;
    cta: string;
    hashtags: string;
  };
  clientFeedback?: string;
  clientApprovalStatus: 'pending' | 'approved' | 'revision_requested';
  cdApprovalStatus: 'pending' | 'approved';
  notes?: string;
}

export interface ClientItem {
  id: string;
  company: string;
  contactName: string;
  phone: string;
  email: string;
  division: 'Social Media Management' | 'Branding' | 'Commercial Video';
  retainerMonthlyValue: number;
  contractStart: string;
  contractEnd: string;
  quota: {
    reels: number;
    carousels: number;
    stories: number;
  };
  brandColor: string;
  status: 'active' | 'pending' | 'completed' | 'lead';
  brandKitDriveUrl: string;
  notes: string;
}

export interface StaffItem {
  id: string;
  name: string;
  role: 'Videographer' | 'Senior Editor' | 'Graphic Designer' | 'Copywriter' | 'Creative Director' | 'Social Media Specialist';
  email: string;
  phone: string;
  avatar: string;
  rateCards: {
    Reels: number;
    TikTok: number;
    'Feed Carousel': number;
    Story: number;
    YouTube: number;
    'Photo Product': number;
  };
  status: 'active' | 'leave' | 'freelance';
}

export interface AttendanceRecord {
  id: string;
  staffId: string;
  staffName: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  workMode: 'WFO' | 'WFH' | 'On Shoot';
  latitude: number;
  longitude: number;
  distanceMeters: number;
  isWithinRadius: boolean;
  notes: string;
  selfieUrl?: string;
}

export interface FinanceTransaction {
  id: string;
  type: 'income' | 'expense';
  category: 'Client Retainer' | 'Creator Fee Payout' | 'Studio & Gear Rental' | 'Operational & Utilities' | 'Software & Subscriptions' | 'Marketing & Pitch';
  description: string;
  amount: number;
  date: string;
  referenceNo: string;
  status: 'completed' | 'pending';
  clientOrStaffName?: string;
}

export type LetterCategory = 'MOU' | 'NDA' | 'SPK' | 'KTR' | 'PFW';

export interface OfficialLetter {
  id: string;
  letterNumber: string;
  category: LetterCategory;
  title: string;
  recipientName: string;
  recipientCompany: string;
  dateCreated: string;
  effectiveDate: string;
  expiryDate?: string;
  status: 'Draft' | 'Sent' | 'Signed' | 'Archived';
  contractValue?: number;
  scopeSummary: string;
  generatedBy: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: 'Camera' | 'Lens' | 'Lighting' | 'Audio' | 'Grip & Drone';
  serialNumber: string;
  condition: 'Good' | 'Fair' | 'Maintenance';
  status: 'available' | 'borrowed' | 'maintenance';
  currentBorrower?: string;
  currentProject?: string;
  returnExpectedDate?: string;
}

export interface EquipmentLoanLog {
  id: string;
  equipmentId: string;
  equipmentName: string;
  borrowerName: string;
  projectName: string;
  borrowDate: string;
  returnDate?: string;
  conditionNotes: string;
  status: 'active' | 'returned';
}

export interface PackagingSpec {
  clientName: string;
  productName: string;
  boxType: 'Tuck-End Box' | 'Corrugated Mailer' | 'Rigid Luxury Box' | 'Pouch / Sachet' | 'Coffee Bean Bag';
  dimensions: {
    width: number;
    depth: number;
    height: number;
  };
  material: 'Ivory 310gsm' | 'Kraft Paper 350gsm' | 'Art Carton 260gsm' | 'Duplex 350gsm';
  coating: 'Matte Doff Lamination' | 'Glossy Lamination' | 'Soft Touch Velvet' | 'Varnish Waterbased';
  specialFinishing: string[];
  pantoneCodes: string;
  cmykValues: { c: number; m: number; y: number; k: number };
  quantityOrder: number;
  dieLineUnit: 'mm';
}

export interface SocialMediaAuditData {
  clientHandle: string;
  clientBrand: string;
  platform: 'Instagram' | 'TikTok';
  followers: number;
  avgLikes: number;
  avgComments: number;
  avgSharesSaves: number;
  postingFreqWeekly: number;
  scores: {
    hookStrength: number;
    visualConsistency: number;
    captionQuality: number;
    ctaEffectiveness: number;
    storytelling: number;
  };
  notes: string;
}

export interface RecruitmentCandidate {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  appliedRole: string;
  portfolioUrl: string;
  cvUrl?: string;
  experienceYears: number;
  expectedSalary: number;
  stage: 'Applied' | 'Portfolio Review' | 'Interview' | 'Offered' | 'Rejected';
  scores: {
    aesthetic: number;
    technical: number;
    culture: number;
  };
  interviewDate?: string;
  meetLink?: string;
  notes: string;
  appliedDate: string;
}

export interface GasSettings {
  enabled: boolean;
  webhookUrl: string;
  sheetId: string;
  autoSync: boolean;
  lastSyncedAt?: string;
}
