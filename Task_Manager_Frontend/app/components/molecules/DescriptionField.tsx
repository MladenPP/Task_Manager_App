type Props = {
  description: string;
  setDescription: (val: string) => void;
  isEditing?: boolean;
};

export default function DescriptionField({
  description,
  setDescription,
  isEditing = true,
}: Props) {
  return (
    <div className="w-full max-w-[600px] bg-gray-100 border border-gray-200 rounded-lg shadow-sm p-8 flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-gray-900">Description</h2>

      {isEditing ? (
        <textarea
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
          className="
            w-full min-h-[200px]
            p-3 rounded-md
            border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-gray-900
            resize-none
            bg-white text-gray-900
          "
          placeholder="Enter task description..."
        />
      ) : (
        <div
          className="
            min-h-[200px]
            p-3 rounded-md
            border border-gray-200
            bg-gray-50
            text-gray-500
            whitespace-pre-wrap break-words
            opacity-80
          "
        >
          {description ? (
            description
          ) : (
            <span className="text-gray-400 italic">
              No description provided
            </span>
          )}
        </div>
      )}
    </div>
  );
}
