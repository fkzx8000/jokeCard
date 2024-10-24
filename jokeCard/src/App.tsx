import { Box, Grid, GridItem, Group, HStack, Button, Skeleton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useData from "./hooks/useData";
import JokeDisplay from "./componnt/JokeDisplay";

interface Joke {
  setup: string;
  punchline: string;
  type: string;
  id: string;
}

function App() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loadingIndexes, setLoadingIndexes] = useState<number[]>([]);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const { data, isLoading, error } = useData(undefined, [triggerFetch]);

  // שימוש ב-useEffect כדי להוסיף בדיחה חדשה כאשר הנתונים מתעדכנים
  useEffect(() => {
    if (data && !isLoading && !error) {
      setJokes((prevJokes) => [data, ...prevJokes]); // הוספת הבדיחה לראש המערך
      setLoadingIndexes((prevIndexes) => prevIndexes.slice(1)); // הסרת האינדקס הראשון מכרטיסי השלד
    }
  }, [data, isLoading, error]);

  // פונקציה להפעלת הטריגר להבאת בדיחה חדשה
  const addJoke = () => {
    setTriggerFetch((prev) => !prev);
    setLoadingIndexes((prevIndexes) => [jokes.length, ...prevIndexes]); // הוספת אינדקס של כרטיס שלד חדש לראש המערך
  };

  return (
    <>
      <Grid
        templateAreas={{
          base: '"nav" "main"',
          lg: '"nav nav" "main main"' // בתצוגה של מחשב, "main" יתפוס את כל הרוחב הזמין
        }}
        templateColumns={{
          base: "1fr",
          lg: "1fr 3fr" // בגרסה של מחשב, החלוקה תהיה בין nav ל-main
        }}
        gap={4}
        padding={4}
      >
        <GridItem paddingLeft={4} gridArea="nav">
          <HStack>
            <Group paddingY={4}>
              <Button variant="outline">Home</Button>
              <Button variant="outline">About</Button>
              <Button variant="outline">Contact</Button>
            </Group>
          </HStack>
        </GridItem>
        <GridItem gridArea="main">
          <Button onClick={addJoke} mb={4} colorScheme="teal"  variant="surface">
          add A new Joke
          </Button>
          <Grid
            templateColumns={{
              base: "1fr", // תצוגת עמודה אחת בסלולר
              lg: "repeat(2, 1fr)" // תצוגת שתי עמודות במחשב
            }}
            gap={6}
          >
            {loadingIndexes.map((index) => (
              <Box key={`loading-${index}`} p={5} borderWidth={1} borderRadius="lg">
                <Skeleton height="20px" mb={4} />
                <Skeleton height="20px" mb={4} />
                <Skeleton height="20px" />
              </Box>
            ))}
            {jokes.map((joke, index) => (
              <JokeDisplay key={index} data={joke} isLoading={false} error={null} />
            ))}
          </Grid>
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
