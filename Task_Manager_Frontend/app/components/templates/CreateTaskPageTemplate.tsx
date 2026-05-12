"use client";
import { useParams } from "next/navigation";
import TaskForm from "../organisms/TaskForm";

import Wrapper from "../organisms/Wrapper";

export default function CreateTaskPageTemplate() {
  const params = useParams();
  const id = params.id as string;
  return (
    <Wrapper>
      <TaskForm id={id} />
    </Wrapper>
  );
}
