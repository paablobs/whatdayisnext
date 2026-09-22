import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  VStack,
  Container,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import DayButton from "../DayButton/DayButton";
import { daysOfWeek, getNextDay, getToday, type Day } from "../../helpers/days";
import { getRandomSarcasticPhrase } from "../../helpers/getRandomSarcasticPhrase";
import { SparkleEffect } from "../ui/SparkleEffect";

const MainView = () => {
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);
  const [nextDay, setNextDay] = useState<Day | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMode, setLoadingMode] = useState<"next" | "today">("next");
  const [phrase, setPhrase] = useState(() => getRandomSarcasticPhrase("next"));
  const [sparkleTrigger, setSparkleTrigger] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const handleCompute = () => {
    if (!selectedDay || isLoading) return;
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

    setSparkleTrigger((prev) => prev + 1);
    setLoadingMode("next");
    setPhrase(getRandomSarcasticPhrase("next"));
    setIsLoading(true);

    timeoutRef.current = setTimeout(() => {
      const result = getNextDay(selectedDay);
      setNextDay(result);
      setIsLoading(false);
      setSelectedDay(null);
      timeoutRef.current = null;
    }, 4000);
  };

  const computeToday = () => {
    if (isLoading) return;
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

    setSparkleTrigger((prev) => prev + 1);
    setLoadingMode("today");
    setPhrase(getRandomSarcasticPhrase("today"));
    setNextDay(null);
    setIsLoading(true);

    timeoutRef.current = setTimeout(() => {
      setSelectedDay(getToday());
      setIsLoading(false);
      timeoutRef.current = null;
    }, 4000);
  };

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setPhrase(getRandomSarcasticPhrase(loadingMode));
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoading, loadingMode]);

  return (
    <Container
      minH="100dvh"
      py={{ base: 4, md: 8 }}
      px={{ base: 4, md: 6 }}
      justifyContent="center"
      alignItems="center"
      display="flex"
    >
      <VStack w="100%" textAlign="center" gap={{ base: 4, md: 5 }}>
        <Box>
          <Heading
            as="h1"
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            mb={2}
          >
            What day is next?
          </Heading>
          <Text fontSize={{ base: "lg", md: "2xl" }}>
            Select what day is today:
          </Text>
        </Box>
        <SimpleGrid
          columns={{ base: 2, sm: 3, md: 4, lg: 7 }}
          gap={{ base: 2, md: 3 }}
          w="100%"
        >
          {daysOfWeek.map((day) => (
            <DayButton
              key={day}
              day={day}
              isSelected={selectedDay === day}
              disabled={isLoading}
              onSelect={(d) => {
                if (isLoading) return;
                setSelectedDay(d);
                setNextDay(null);
              }}
            />
          ))}
        </SimpleGrid>
        <Box minH={5}>
          {isLoading && (
            <Text
              role="status"
              aria-live="polite"
              aria-atomic="true"
              textStyle="sm"
            >
              {phrase}
            </Text>
          )}
        </Box>
        <Box w="100%">
          {selectedDay ? (
            <Button
              ref={buttonRef}
              colorPalette="blue"
              size="lg"
              minH="48px"
              w={{ base: "100%", sm: "auto" }}
              onClick={handleCompute}
              disabled={isLoading}
              loading={isLoading}
            >
              Compute next day
            </Button>
          ) : (
            <Button
              ref={buttonRef}
              colorPalette="blue"
              size="lg"
              minH="48px"
              w={{ base: "100%", sm: "auto" }}
              onClick={computeToday}
              disabled={isLoading}
              loading={isLoading}
            >
              What day is today?
            </Button>
          )}
        </Box>
        {nextDay && (
          <Text
            role="status"
            aria-live="polite"
            aria-atomic="true"
            textStyle="xl"
          >
            Next day is {nextDay}
          </Text>
        )}
      </VStack>
      <SparkleEffect
        trigger={sparkleTrigger}
        isLoading={isLoading}
        originRef={buttonRef}
      />
    </Container>
  );
};

export default MainView;
