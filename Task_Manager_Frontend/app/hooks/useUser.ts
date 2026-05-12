import { useCallback, useState } from "react";
import { User } from "../types/UserType";
import { getErrorMessage } from "../utility/errorHandlers/getErrorMessage";
import { getAllUsersService } from "../services/userServices/getAllUsersService";
import { getBoardUsersByTaskService } from "../services/userServices/getBoardUsersByTask";
import { getBoardUsersService } from "../services/userServices/getBoardUsersService";

export function useUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [boardUsers, setBoardUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  const getBoardUsers = useCallback(async (id: string) => {
    try {
      const res = await getBoardUsersService(id);
      setBoardUsers(res);
      setError("");
    } catch (err) {
      getErrorMessage(err, setError);
    }
  }, []);

  const getBoardUsersByTask = useCallback(async (id: string) => {
    try {
      const res = await getBoardUsersByTaskService(id);
      setBoardUsers(res);
      setError("");
    } catch (err) {
      getErrorMessage(err, setError);
    }
  }, []);

  const getUsers = useCallback(async () => {
    try {
      const res = await getAllUsersService();
      setUsers(res);
      setError("");
    } catch (err) {
      getErrorMessage(err, setError);
    }
  }, []);

  return {
    users,
    boardUsers,
    error,
    getBoardUsers,
    getUsers,
    setUsers,
    getBoardUsersByTask,
  };
}
