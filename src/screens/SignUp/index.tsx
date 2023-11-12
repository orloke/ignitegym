import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'
import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type FormDataProps = {
  name: string
  email: string
  password: string
  password_confirm: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o email.').email('Email invalido.'),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(6, 'A senha deve ter pelo menos 6 digitos.'),
  password_confirm: yup
    .string()
    .required('Confirme a senha.')
    .oneOf([yup.ref('password')], 'As senhas são diferentes.'),
})

export function SignUp() {
  const navigation = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  })

  const handleSignUp = async ({
    name,
    email,
    password,
    password_confirm,
  }: FormDataProps) => {
    console.log({ name, email, password, password_confirm })
  }

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                placeholder="Nome"
                onChangeText={field.onChange}
                value={field.value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={field.onChange}
                value={field.value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={field.onChange}
                value={field.value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field }) => (
              <Input
                placeholder="Confirmar senha"
                secureTextEntry
                onChangeText={field.onChange}
                value={field.value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Button
          title="Voltar para o login"
          variant="outline"
          mt={24}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  )
}
