export interface HealthResource {
  id: string;
  title: string;
  category: 'mental-health' | 'fitness' | 'nutrition' | 'general';
  description: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  views: number;
  likes: number;
}

export interface WellnessProgram {
  id: string;
  name: string;
  type: 'fitness' | 'mental-health' | 'nutrition' | 'lifestyle';
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  imageUrl: string;
  participants: number;
  sessions: number;
}

export interface SupportRequest {
  id: string;
  studentName: string;
  email: string;
  category: 'mental-health' | 'physical-health' | 'nutrition' | 'other';
  subject: string;
  message: string;
  status: 'pending' | 'in-progress' | 'resolved';
  date: string;
  priority: 'low' | 'medium' | 'high';
}

export interface UsageMetrics {
  totalUsers: number;
  activeUsers: number;
  resourceViews: number;
  programEnrollments: number;
  supportRequests: number;
  categoryBreakdown: {
    category: string;
    count: number;
  }[];
}
