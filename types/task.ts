export interface Task {
  createdAt: string;
  description: string;
  status: string;
  title: string;
  updatedAt: string;
  id: string;
}

export interface NewTask {
  description: string;
  status: string;
  title: string;
}
