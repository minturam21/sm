
import { Course, Notice, Gallery, Testimonial, Enquiry } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: '1',
    title: 'Advanced Software Engineering',
    description: 'A comprehensive program covering full-stack development, system design, and cloud architecture.',
    syllabus: 'Unit 1: Fundamentals\nUnit 2: React & TypeScript\nUnit 3: Node.js Backend\nUnit 4: AWS Deployment',
    duration: '6 Months',
    mode: 'Hybrid',
    category: 'Computer Science',
    eligibility: 'Bachelor in Tech/Science or equivalent',
    isPublished: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Data Science & AI',
    description: 'Learn to build predictive models and analyze large datasets using Python and TensorFlow.',
    syllabus: 'Statistics, Machine Learning, Deep Learning, NLP',
    duration: '8 Months',
    mode: 'Online',
    category: 'Data Science',
    eligibility: 'Strong math background',
    isPublished: true,
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: '1',
    title: 'Admission Open for Summer 2024',
    content: 'Registration for the upcoming summer batch is now open. Early bird discounts apply until May 15th.',
    publishDate: '2024-05-01',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Campus Drive: Google & Microsoft',
    content: 'We are excited to announce our upcoming placement week starting next Monday.',
    publishDate: '2024-05-05',
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_GALLERY: Gallery[] = [
  { id: '1', imageUrl: 'https://picsum.photos/id/1/800/600', category: 'Campus', caption: 'Modern Infrastructure', createdAt: new Date().toISOString() },
  { id: '2', imageUrl: 'https://picsum.photos/id/2/800/600', category: 'Events', caption: 'Annual Convocation 2023', createdAt: new Date().toISOString() },
  { id: '3', imageUrl: 'https://picsum.photos/id/3/800/600', category: 'Labs', caption: 'State-of-the-art Robotics Lab', createdAt: new Date().toISOString() }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    content: 'The curriculum is highly industry-focused. I landed a job at a top tech firm within weeks of graduating.',
    designation: 'Software Engineer at Meta',
    isPublished: true
  },
  {
    id: '2',
    name: 'David Miller',
    content: 'Fantastic faculty and great environment. The practical labs were the highlight of my course.',
    designation: 'M.Tech Graduate',
    isPublished: true
  }
];

export const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    message: 'I am interested in the Data Science course.',
    status: 'PENDING',
    createdAt: new Date().toISOString()
  }
];
