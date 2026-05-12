"use client";

import { useProfile } from "@/app/hooks/useProfile";
import BoardForm from "../organisms/BoardForm";
import BoardList from "../organisms/BoardList";
import Wrapper from "../organisms/Wrapper";
import { UserRole } from "../../types/UserRole";

export default function HomePageTemplate() {
  const { user } = useProfile();
  return (
    <Wrapper>
      <div className="flex flex-1 min-h-0 flex-col md:flex-row">
        <div className="flex-1 min-h-0 overflow-y-auto">
          <BoardList />
        </div>

        {user.role === UserRole.ADMIN && <BoardForm />}
      </div>
    </Wrapper>
  );
}
