import { Button } from "@chakra-ui/react";

interface DayButtonProps {
  day: string;
  isSelected?: boolean;
  onSelect?: (day: string) => void;
}

const DayButton = ({ day, isSelected = false, onSelect }: DayButtonProps) => {
  return (
    <Button
      onClick={() => onSelect?.(day)}
      variant={isSelected ? "solid" : "outline"}
      colorScheme={isSelected ? "blue" : undefined}
      aria-pressed={isSelected}
      size="md"
      minW="100px"
      _focus={{ boxShadow: "outline" }}
    >
      {day}
    </Button>
  );
};

export default DayButton;
