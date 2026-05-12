import Button from "../atoms/Button";

type SubscriberListProps = {
  boardUsers: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  }[];

  removingId: string;

  handleRemoveUser: (id: string) => void;
};

export default function SubscriberList({
  boardUsers,
  removingId,
  handleRemoveUser,
}: SubscriberListProps) {
  return (
    <div className="flex flex-col gap-2">
      {boardUsers.map((user) => (
        <div
          key={user.id}
          className="
            w-full bg-gray-50 border border-gray-200
            rounded-md px-4 py-3
            flex flex-col sm:flex-row
            sm:items-center sm:justify-between
            gap-3
          "
        >
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              {user.firstname} {user.lastname}
            </span>

            <span className="text-xs text-gray-500">{user.email}</span>
          </div>

          <div className="sm:ml-auto">
            <Button
              loading={removingId === user.id}
              onClick={() => handleRemoveUser(user.id)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
