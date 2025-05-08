interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

interface AuthFormData {
  name?: string;
  email: string;
  username: string;
  password: string;
}
