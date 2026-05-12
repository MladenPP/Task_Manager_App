import { useEffect, useState } from "react";
import { getProfileService } from "../services/userServices/getProfileService";
import { changeUserService } from "../services/userServices/changeUserService";
import { User } from "../types/UserType";
import { deleteUserService } from "../services/userServices/deleteUserService";
import { getErrorMessage } from "../utility/errorHandlers/getErrorMessage";
import { UserRole } from "../types/UserRole";

export function useProfile() {
  const emptyUser: User = {
    id: "",
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    role: UserRole.USER,
  };

  const [user, setUser] = useState<User>(emptyUser);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const user = await getProfileService();
        setUser(user);
        setError("");
        setLoading(false);
      } catch (err: unknown) {
        getErrorMessage(err, setError);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const changeUser = async () => {
    try {
      await changeUserService(user.firstname, user.lastname, user.phone);
      setError("");
      return true;
    } catch (err: unknown) {
      getErrorMessage(err, setError);
      return false;
    }
  };

  const deleteUser = async () => {
    try {
      await deleteUserService();
      setError("");
    } catch (err: unknown) {
      getErrorMessage(err, setError);
    }
  };

  return {
    user,
    isEditing,
    loading,
    setUser,
    setIsEditing,
    changeUser,
    deleteUser,
    error,
  };
}
