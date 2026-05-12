"use client";
import { useParams } from "next/navigation";
import TaskView from "../organisms/TaskView";
import Wrapper from "../organisms/Wrapper";

export default function TaskPageTemplate() {
  const params = useParams();
  const id = params.id as string;
  return (
    <Wrapper>
      <TaskView id={id} />
    </Wrapper>
  );
}
