import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { Loading } from '@components/Loading'
import { ExercisesDTO } from '@dtos/ExerciseDTO'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { VStack, Text, HStack, FlatList, Heading, useToast } from 'native-base'
import { useCallback, useEffect, useState } from 'react'

export function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>()
  const [exercises, setExercises] = useState<ExercisesDTO[]>([])
  const [groupSelected, setGroupSelected] = useState('')

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const toast = useToast()

  const handleOpenExerciseDetails = (exerciseId: number) => {
    navigation.navigate('exercise', { exerciseId })
  }

  const fetchGroups = async () => {
    try {
      const { data } = await api.get('/groups')
      setGroups(data)
      setGroupSelected(data[0])
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os grupos musculares.'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  const fetchExercisesByGroup = async () => {
    try {
      setIsLoading(true)

      const { data } = await api.get(`/exercises/bygroup/${groupSelected}`)
      // console.log(JSON.stringify(data, null, 2))

      setExercises(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os exercícios.'
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
    fetchGroups()
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup()
    }, [groupSelected])
  )

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        horizontal
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              groupSelected.toLocaleUpperCase() == item.toLocaleUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={8}>
          <HStack justifyContent="space-between" mb={5}>
            <Heading color="gray.200" fontSize="md" fontFamily="heading">
              Exercícios
            </Heading>
            <Text color="gray.200">{exercises.length}</Text>
          </HStack>
          <FlatList
            data={exercises}
            renderItem={({ item }) => (
              <ExerciseCard
                exercise={item}
                onPress={() => handleOpenExerciseDetails(item.id)}
              />
            )}
            keyExtractor={(item) => `${item.id}`}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
          />
        </VStack>
      )}
    </VStack>
  )
}
