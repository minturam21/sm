
import { Course, Notice, Gallery, Enquiry, Testimonial, InstituteInfo } from '../types';
import { INITIAL_COURSES, INITIAL_NOTICES, INITIAL_GALLERY, INITIAL_TESTIMONIALS, INITIAL_ENQUIRIES } from './mockData';

// Simulated DB with LocalStorage
const STORAGE_KEYS = {
  COURSES: 'edu_courses',
  NOTICES: 'edu_notices',
  GALLERY: 'edu_gallery',
  ENQUIRIES: 'edu_enquiries',
  TESTIMONIALS: 'edu_testimonials',
  INSTITUTE: 'edu_info',
  AUTH: 'edu_auth'
};

const getFromStore = <T,>(key: string, initial: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : initial;
};

const setToStore = <T,>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// --- API Service ---
export const api = {
  // Courses
  courses: {
    getAll: async () => getFromStore<Course[]>(STORAGE_KEYS.COURSES, INITIAL_COURSES),
    getPublished: async () => (await api.courses.getAll()).filter(c => c.isPublished),
    getById: async (id: string) => (await api.courses.getAll()).find(c => c.id === id),
    create: async (data: Omit<Course, 'id' | 'createdAt'>) => {
      const courses = await api.courses.getAll();
      const newCourse: Course = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() };
      setToStore(STORAGE_KEYS.COURSES, [newCourse, ...courses]);
      return newCourse;
    },
    update: async (id: string, data: Partial<Course>) => {
      const courses = await api.courses.getAll();
      const updated = courses.map(c => c.id === id ? { ...c, ...data } : c);
      setToStore(STORAGE_KEYS.COURSES, updated);
    },
    delete: async (id: string) => {
      const courses = await api.courses.getAll();
      setToStore(STORAGE_KEYS.COURSES, courses.filter(c => c.id !== id));
    }
  },

  // Notices
  notices: {
    getAll: async () => getFromStore<Notice[]>(STORAGE_KEYS.NOTICES, INITIAL_NOTICES),
    getActive: async () => (await api.notices.getAll()).filter(n => n.isActive),
    getById: async (id: string) => (await api.notices.getAll()).find(n => n.id === id),
    create: async (data: Omit<Notice, 'id' | 'createdAt'>) => {
      const list = await api.notices.getAll();
      const newItem: Notice = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() };
      setToStore(STORAGE_KEYS.NOTICES, [newItem, ...list]);
      return newItem;
    },
    update: async (id: string, data: Partial<Notice>) => {
      const list = await api.notices.getAll();
      const updated = list.map(n => n.id === id ? { ...n, ...data } : n);
      setToStore(STORAGE_KEYS.NOTICES, updated);
    },
    delete: async (id: string) => {
      const list = await api.notices.getAll();
      setToStore(STORAGE_KEYS.NOTICES, list.filter(n => n.id !== id));
    }
  },

  // Gallery
  gallery: {
    getAll: async () => getFromStore<Gallery[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY),
    create: async (data: Omit<Gallery, 'id' | 'createdAt'>) => {
      const list = await api.gallery.getAll();
      const newItem: Gallery = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() };
      setToStore(STORAGE_KEYS.GALLERY, [newItem, ...list]);
    },
    delete: async (id: string) => {
      const list = await api.gallery.getAll();
      setToStore(STORAGE_KEYS.GALLERY, list.filter(g => g.id !== id));
    }
  },

  // Enquiries
  enquiries: {
    getAll: async () => getFromStore<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES),
    create: async (data: Omit<Enquiry, 'id' | 'status' | 'createdAt'>) => {
      const list = await api.enquiries.getAll();
      const newItem: Enquiry = { 
        ...data, 
        id: Date.now().toString(), 
        status: 'PENDING', 
        createdAt: new Date().toISOString() 
      };
      setToStore(STORAGE_KEYS.ENQUIRIES, [newItem, ...list]);
    },
    updateStatus: async (id: string, status: Enquiry['status']) => {
      const list = await api.enquiries.getAll();
      const updated = list.map(e => e.id === id ? { ...e, status } : e);
      setToStore(STORAGE_KEYS.ENQUIRIES, updated);
    }
  },

  // Settings
  settings: {
    getInfo: async () => getFromStore<InstituteInfo>(STORAGE_KEYS.INSTITUTE, {
      name: 'EduInstify International',
      address: '123 Education Lane, Knowledge Park, NY 10001',
      phone: '+1 (555) EDU-0000',
      email: 'admissions@eduinstify.com',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1683400000000!5m2!1sen!2sus'
    }),
    updateInfo: async (data: InstituteInfo) => setToStore(STORAGE_KEYS.INSTITUTE, data)
  },

  // Auth
  auth: {
    login: async (username: string, pass: string) => {
      if (username === 'admin' && pass === 'admin123') {
        const token = 'mock-jwt-token-' + Date.now();
        setToStore(STORAGE_KEYS.AUTH, token);
        return true;
      }
      return false;
    },
    logout: async () => localStorage.removeItem(STORAGE_KEYS.AUTH),
    isAuthenticated: () => !!localStorage.getItem(STORAGE_KEYS.AUTH)
  }
};
