import { TaskStatus } from "../../types/TaskStatus";
import Select from "../atoms/Select";

type StatusSelectProps = {
  value: TaskStatus;
  isEditing: boolean;
  onChange: (value: TaskStatus) => void;
};

export default function StatusSelect({
  value,
  isEditing,
  onChange,
}: StatusSelectProps) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as TaskStatus)}
      disabled={!isEditing}
      className={`
        w-full px-3 py-2 rounded-md
        border border-gray-300
        bg-white text-gray-900 text-sm
        shadow-sm

        focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900

        disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed

        transition
      `}
    >
      {Object.values(TaskStatus).map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </Select>
  );
}
