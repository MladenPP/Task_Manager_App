import { usePathname } from "next/navigation";
import { useView } from "../../context/ViewContext";
import Button from "../atoms/Button";
import Link from "next/link";

export default function ViewToggleButton() {
  const { view, toggleView } = useView();

  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={toggleView}>
        Switch to {view === "board" ? "List" : "Board"} view
      </Button>

      <Link href={`${pathname}/subscribers`}>
        <Button>View Subscribers</Button>
      </Link>
    </div>
  );
}
