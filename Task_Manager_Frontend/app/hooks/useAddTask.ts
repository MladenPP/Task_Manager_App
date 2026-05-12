import { useState } from "react";
import { addTaskService } from "../services/taskServices/addTaskService";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "../utility/errorHandlers/getErrorMessage";
import { User } from "../types/UserType";
import { useUser } from "./useUser";
import { UserRole } from "../types/UserRole";

const EmptyUser = {
  id: "",
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  role: UserRole.USER,
};

export function useAddTask() {
  const [title, setTitle] = useState("");
  const [user, setUser] = useState<User>(EmptyUser);
  const { boardUsers, getBoardUsers, getBoardUsersByTask } = useUser();
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [error2, setError2] = useState("");
  const router = useRouter();

  const addTask = async (id: string) => {
    try {
      const dateDueDate = new Date(dueDate);
      await addTaskService(id, title, dateDueDate, description, user.id);
      router.back();
    } catch (err: unknown) {
      getErrorMessage(err, setError2);
    }
  };

  return {
    title,
    dueDate,
    description,
    user,
    boardUsers,
    setTitle,
    setDueDate,
    setDescription,
    addTask,
    setUser,
    getBoardUsers,
    getBoardUsersByTask,
    error2,
  };
}
