import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  VStack,
  Container,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import DayButton from "../DayButton/DayButton";
import { daysOfWeek, getNextDay } from "../helpers/days";

const MainView = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [nextDay, setNextDay] = useState<string | null>(null);

  const handleCompute = () => {
    if (!selectedDay) return;
    const result = getNextDay(selectedDay);
    setNextDay(result);
  };

  return (
    <Container maxW="container.md" py={8} h="100dvh">
      <VStack w="100%" align="stretch">
        <Box>
          <Heading as="h1" size="xl" mb={2}>
            What day is next?
          </Heading>
          <Text fontSize="lg">Select what day is today:</Text>
        </Box>

        <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 7 }} w="100%">
          {daysOfWeek.map((day) => (
            <DayButton
              key={day}
              day={day}
              isSelected={selectedDay === day}
              onSelect={(d) => setSelectedDay(d)}
            />
          ))}
        </SimpleGrid>

        <Box>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={handleCompute}
            aria-disabled={!selectedDay}
          >
            Compute next day
          </Button>
        </Box>

        {nextDay && <Text fontSize="lg">Next day is {nextDay}</Text>}
      </VStack>
    </Container>
  );
};

export default MainView;
