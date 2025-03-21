export type Bookmark = {
    user: string; // User ID
    jobTitle: string;
    jobLocation: string;
    jobLink: string;
    jobMode: string | null; // Nullable field
    jobSource: string;
    _id: string; // Bookmark ID
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string
    __v: number;
  };
  