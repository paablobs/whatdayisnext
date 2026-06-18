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
import { daysOfWeek, getNextDay } from "../../helpers/days";
import { getRandomSarcasticPhrase } from "../../helpers/getRandomSarcasticPhrase";
import { SparkleEffect } from "../ui/SparkleEffect";

const MainView = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [nextDay, setNextDay] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMode, setLoadingMode] = useState<"next" | "today">("next");
  const [phrase, setPhrase] = useState(getRandomSarcasticPhrase("next"));
  const [sparkleTrigger, setSparkleTrigger] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleCompute = () => {
    if (!selectedDay) return;
    setSparkleTrigger(prev => prev + 1);
    setLoadingMode("next");
    setIsLoading(true);
    setTimeout(() => {
      const result = getNextDay(selectedDay);
      setNextDay(result);
      setIsLoading(false);
      setSelectedDay(null);
    }, 4000);
  };

  const computeToday = () => {
    setSparkleTrigger(prev => prev + 1);
    setLoadingMode("today");
    setIsLoading(true);
    setTimeout(() => {
      const jsDay = new Date().getDay();
      const index = (jsDay + 6) % daysOfWeek.length; // map JS 0=Sun..6=Sat to daysOfWeek starting with Monday
      const todayName = daysOfWeek[index];
      setSelectedDay(todayName);
      setNextDay(null);
      setIsLoading(false);
    }, 4000);
  };

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setPhrase(getRandomSarcasticPhrase(loadingMode));
    }, 2000);

    // set an initial phrase immediately when loading starts
    setPhrase(getRandomSarcasticPhrase(loadingMode));

    return () => clearInterval(interval);
  }, [isLoading, loadingMode]);

  return (
    <Container
      py={8}
      h="100dvh"
      justifyContent="center"
      alignItems="center"
      display="flex"
    >
      <VStack w="100%" textAlign="center" gap={5}>
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
              onSelect={(d) => {
                setSelectedDay(d);
                setNextDay(null);
              }}
            />
          ))}
        </SimpleGrid>
        <Text textStyle="sm" minH={5}>
          {isLoading ? phrase : ""}
        </Text>
        <Box>
          {selectedDay ? (
            <Button
              ref={buttonRef}
              colorScheme="blue"
              size="lg"
              onClick={handleCompute}
              aria-disabled={isLoading}
              loading={isLoading}
            >
              Compute next day
            </Button>
          ) : (
            <Button
              ref={buttonRef}
              colorScheme="blue"
              size="lg"
              onClick={computeToday}
              aria-disabled={isLoading}
              loading={isLoading}
            >
              What day is today?
            </Button>
          )}
        </Box>
        {
          <>
            <Text textStyle="xl" visibility={nextDay ? "visible" : "hidden"}>
              Next day is {nextDay}
            </Text>
          </>
        }
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
