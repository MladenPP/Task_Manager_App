import { Task } from "../../types/TaskType";
import axios from "axios";

export async function updateTaskService(task: Task): Promise<Task> {
  const res = await axios.patch(
    `http://localhost:5000/task/${task.id}`,
    {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
    },
    {
      withCredentials: true,
    },
  );

  return res.data;
}
