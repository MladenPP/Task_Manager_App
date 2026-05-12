"use client";

import { useParams } from "next/navigation";
import Subscribers from "../organisms/Subsribers";
import Wrapper from "../organisms/Wrapper";

export default function SubscribersPageTemplate() {
  const params = useParams();
  const id = params.id as string;
  return (
    <Wrapper>
      <Subscribers boardId={id} />
    </Wrapper>
  );
}
