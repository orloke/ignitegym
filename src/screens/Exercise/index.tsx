import BodySvg from '@assets/body.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import SerieSvg from '@assets/series.svg'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'
import { ExercisesDTO } from '@dtos/ExerciseDTO'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base'
import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'

type RoutePramsProps = {
  exerciseId: number
}

export function Exercise() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercise, setExercise] = useState<ExercisesDTO>({} as ExercisesDTO)

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const route = useRoute()

  const toast = useToast()

  const { exerciseId } = route.params as RoutePramsProps

  const handleGoBack = () => {
    navigation.goBack()
  }

  const fetchExerciseDetails = async (id: number) => {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/exercises/${id}`)

      setExercise(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar o exercício.'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchExerciseDetails(exerciseId)
  }, [exerciseId])

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" size={6} color="green.500" />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading
            flexShrink={1}
            color="gray.100"
            fontSize="lg"
            fontFamily="heading"
          >
            {exercise.name}
          </Heading>

          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <VStack p={8}>
            <Box mb={3} rounded="lg" overflow="hidden">
              <Image
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                w="full"
                h={80}
                rounded="lg"
                resizeMode="cover"
                alt={exercise.name}
              />
            </Box>

            <Box bg="gray.600" rounded="md" pb={4} px={4}>
              <HStack
                alignItems="center"
                justifyContent="space-around"
                mb={6}
                mt={5}
              >
                <HStack>
                  <SerieSvg />
                  <Text color="gray.200" ml={2}>
                    {exercise.series} séries
                  </Text>
                </HStack>
                <HStack>
                  <RepetitionsSvg />
                  <Text color="gray.200" ml={2}>
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>
              <Button title="Marcar como realizado" />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  )
}
