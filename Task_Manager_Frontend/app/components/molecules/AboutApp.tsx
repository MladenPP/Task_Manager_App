import Box from "../atoms/Box";
import Text from "../atoms/Text";

export default function AboutApp() {
  return (
    <div className="flex justify-start items-center min-h-[60vh]">
      <div className="max-w-md ml-10">
        <Box className="mb-4 text-gray-900">
          <Text variant="title">About TaskBoard App</Text>
        </Box>

        <Box>
          <Text variant="description" className="leading-relaxed space-y-2">
            TaskBoard App is a simple and intuitive productivity tool designed
            to help you organize your daily tasks with ease. It allows you to
            create, track, and manage tasks in a clean and distraction-free
            interface. The goal of the app is to reduce complexity and help you
            focus on what truly matters. You can track task status, mark them as
            completed, and keep a clear overview of your progress. The interface
            is built with simplicity in mind, avoiding unnecessary clutter or
            overwhelming options. Everything is designed to be fast, responsive,
            and easy to use on any device.
          </Text>
        </Box>
      </div>
    </div>
  );
}
