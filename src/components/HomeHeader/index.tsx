import { HStack, Heading, Text, VStack } from 'native-base'

type Props = {
  /* props go here */
}

export function HomeHeader() {
  return (
    <HStack>
      <VStack>
        <Text color='gray.100'>Olá,</Text>
        <Heading color='gray.100'>Júnior Dering</Heading>
      </VStack>
    </HStack>
  )
}
