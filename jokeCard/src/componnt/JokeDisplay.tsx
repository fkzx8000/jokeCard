import React from 'react';
import { Spinner, Box, Text, Badge, Flex } from '@chakra-ui/react';

interface Joke {
    setup: string;
    punchline: string;
    type: string;
    id: string;
}

interface JokeDisplayProps {
    data: Joke | null;
    isLoading: boolean;
    error: string | null;
}

const JokeDisplay: React.FC<JokeDisplayProps> = ({ data, isLoading, error }) => {
    if (isLoading) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (error) {
        return <Text color="red.500">Error: {error}</Text>;
    }

    if (!data) {
        return <Text>No data available</Text>;
    }

    return (
        <Box p={5} borderWidth={1} borderRadius="lg" overflow="hidden" position="relative">
            <Text fontSize="sm" position="absolute" top={2} right={2} color="gray.500">
                ID: {data.id}
            </Text>
            <Flex alignItems="center" mb={3}>
                <Text fontSize="xl" fontWeight="bold" mr={2}>Joke</Text>
                <Badge colorScheme="green">{data.type}</Badge>
            </Flex>
            <Text mt={3}><strong>Setup:</strong> {data.setup}</Text>
            <Text mt={2}><strong>Punchline:</strong> {data.punchline}</Text>
        </Box>
    );
}

export default JokeDisplay;
