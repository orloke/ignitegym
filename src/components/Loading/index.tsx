import { Center, Spinner } from 'native-base'
import { View } from 'react-native'

type Props = {
  /* props go here */
}

export function Loading() {
  return (
    <Center flex={1}>
      <Spinner />
    </Center>
  )
}
