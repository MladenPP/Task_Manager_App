import { useState, useEffect } from "react";
import { getTaskListService } from "../services/taskServices/getTaskListService";
import { Task } from "../types/TaskType";
import { updateTaskService } from "../services/taskServices/updateTaskService";
import { getErrorMessage } from "../utility/errorHandlers/getErrorMessage";
import { useParams } from "next/navigation";

export function useTaskList() {
  const params = useParams();
  const id = params.id as string;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { tasks } = await getTaskListService(id);
        setTasks(tasks);
        setLoading(false);
        setError("");
      } catch (err: unknown) {
        getErrorMessage(err, setError);
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const updateStatus = async (updatedTask: Task) => {
    try {
      const res = await updateTaskService(updatedTask);
      setError("");
      return res;
    } catch (err: unknown) {
      getErrorMessage(err, setError);
      return updatedTask;
    }
  };

  return {
    tasks,
    error,
    loading,
    updateStatus,
    setTasks,
    setError,
  };
}
