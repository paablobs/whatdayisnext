import { Button } from "@chakra-ui/react";

interface DayButtonProps<Day extends string> {
  day: Day;
  isSelected?: boolean;
  onSelect?: (day: Day) => void;
  disabled?: boolean;
}

const DayButton = <Day extends string>({
  day,
  isSelected = false,
  onSelect,
  disabled = false,
}: DayButtonProps<Day>) => {
  return (
    <Button
      onClick={() => onSelect?.(day)}
      variant={isSelected ? "solid" : "outline"}
      colorPalette={isSelected ? "blue" : undefined}
      aria-pressed={isSelected}
      disabled={disabled}
      size="md"
      minH="44px"
      _focus={{ boxShadow: "outline" }}
    >
      {day}
    </Button>
  );
};

export default DayButton;
