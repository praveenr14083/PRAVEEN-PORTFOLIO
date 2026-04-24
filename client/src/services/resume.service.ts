export type Resume = {
  id: string;
  fileUrl: string;
  filePublicId: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  updatedAt: {
    _seconds: number;
    _nanoseconds: number;
  };
};

export const resumeService = {
  // 🔥 Fetch resume
  get: async (): Promise<Resume> => {
    const res = await fetch("/api/resume");

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const response = await res.json();
    return response?.data || null;
  },
};
