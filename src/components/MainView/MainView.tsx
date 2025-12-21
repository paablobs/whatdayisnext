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
  const [isLoading, setIsLoading] = useState(false);

  const handleCompute = () => {
    if (!selectedDay) return;
    setIsLoading(true);
    setTimeout(() => {
      const result = getNextDay(selectedDay);
      setNextDay(result);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Container
      py={8}
      h="100vh"
      justifyContent="center"
      alignItems="center"
      display="flex"
    >
      <VStack w="100%" textAlign="center" gap="40px">
        <Box>
          <Heading size="6xl" mb={2}>
            What day is next?
          </Heading>
          <Text textStyle="2xl">Select what day is today:</Text>
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
            loading={isLoading}
          >
            Compute next day
          </Button>
        </Box>
        {nextDay && <Text textStyle="xl">Next day is {nextDay}</Text>}
      </VStack>
    </Container>
  );
};

export default MainView;
