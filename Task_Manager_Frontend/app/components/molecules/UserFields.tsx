"use client";

import { User } from "../../types/UserType";
import Input from "../atoms/Input";
import Label from "../atoms/Label";

type Props = {
  user: User;
  isEditing: boolean;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export default function UserFields({ user, isEditing, setUser }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label>First Name</Label>
        <Input
          type="text"
          placeholder="Firstname"
          value={user.firstname}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, firstname: e.target.value }))
          }
          disabled={!isEditing}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label>Last Name</Label>
        <Input
          type="text"
          placeholder="Lastname"
          value={user.lastname}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, lastname: e.target.value }))
          }
          disabled={!isEditing}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label>Phone</Label>
        <Input
          type="text"
          placeholder="+381x xxxx xxx"
          value={user.phone}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, phone: e.target.value }))
          }
          disabled={!isEditing}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="example@gmail.com"
          value={user.email}
          onChange={() => {}}
          disabled
        />
      </div>
    </div>
  );
}
