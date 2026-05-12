import { Dispatch, SetStateAction } from "react";
import TaskList from "../organisms/TaskList";
import Wrapper from "../organisms/Wrapper";

type Props = {
  error: string;
  loading: boolean;
  setError: Dispatch<SetStateAction<string>>;
};

export default function ListPageTemplate({ error, loading, setError }: Props) {
  return (
    <Wrapper onMain={true}>
      <TaskList error={error} loading={loading} setError={setError} />
    </Wrapper>
  );
}
