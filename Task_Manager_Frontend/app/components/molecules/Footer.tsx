import Text from "../atoms/Text";

type FooterProps = {
  leftText?: string;
  centerText?: string;
};

export default function Footer({
  leftText = "© 2026 TaskBoard",
  centerText = "Built with Next.js + Nest.js",
}: FooterProps) {
  return (
    <footer className="w-full h-[60px] bg-gray-100 border-t border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center">
        <Text variant="description" className="text-gray-500">
          {leftText}
        </Text>
      </div>

      <div className="flex items-center">
        <Text variant="description" className="text-gray-500">
          {centerText}
        </Text>
      </div>
    </footer>
  );
}
