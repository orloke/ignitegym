import { Center, Heading } from 'native-base'
import { View } from 'react-native'

type Props = {
  title: string
}

export function ScreenHeader({ title }: Props) {
  return (
    <Center bg="gray.600" pb={6} pt={16}>
      <Heading color="gray.100" fontSize="xl">
        {title}
      </Heading>
    </Center>
  )
}
