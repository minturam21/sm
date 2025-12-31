
export interface Admin {
  id: string;
  username: string;
  role: 'ADMIN' | 'STAFF';
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  syllabus: string;
  duration: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  category: string;
  eligibility: string;
  isPublished: boolean;
  createdAt: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  publishDate: string;
  isActive: boolean;
  createdAt: string;
}

export interface Gallery {
  id: string;
  imageUrl: string;
  category: string;
  caption: string;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'PENDING' | 'RESOLVED' | 'SPAM';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  imageUrl?: string;
  designation?: string;
  isPublished: boolean;
}

export interface InstituteInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  mapEmbedUrl: string;
}
