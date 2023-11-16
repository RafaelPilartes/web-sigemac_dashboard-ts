import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ToastContainer } from 'react-toastify'

import { InputFloatingLabelZod } from '../../components/input/InputFloatingLabelZod'
import { Mail, Lock, Loader2 } from 'lucide-react'
import { BaseButton } from '../../components/buttons/baseButton'
import { showToast } from '../../utils/toasts'
import { LoginViewModel } from '../../viewModel/LoginViewModel'
import { useAdminStore } from '../../stores/adminStore'
import { AdminInterface } from '../../interfaces/admin'

const formSchema = z.object({
  email: z
    .string()
    .nonempty('O email é obrigatório!')
    .email('Formato de email invalido')
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .nonempty('A palavra-passe é obrigatório!')
    .min(6, 'A palavra-passe tem de no mínimo 6 caracteres')
    .trim()
    .refine(value => value, {
      message: 'Por favor, preencha este campo.'
    })
})

type loginEmployeeType = z.infer<typeof formSchema>

function Login() {
  const { addAdmin } = useAdminStore()

  const [isSend, setIsSend] = useState<boolean>(false)

  const loginViewModel = new LoginViewModel()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<loginEmployeeType>({
    resolver: zodResolver(formSchema)
  })

  async function handleLogin(dataForm: loginEmployeeType) {
    alert('qwer')
    console.log(dataForm)

    const { data } = await loginViewModel.signInWithEmail(
      dataForm.email,
      dataForm.password
    )

    if (data.error) {
      showToast('error', data.msg as string)

      setIsSend(false)
    } else {
      showToast('success', data.msg as string)

      setIsSend(false)

      // const dataStringify = JSON.stringify(data.adminInfo)
      // localStorage.setItem('adminInfo', dataStringify)

      addAdmin(data.adminInfo as AdminInterface)
    }
  }

  return (
    <>
      <div className="relative w-screen h-screen flex flex-row justify-center items-center gap-0 bg-slate-100/50 ">
        <ToastContainer />

        <div className="relative p-8 w-auto h-auto bg-white rounded-2xl flex flex-col justify-center items-start gap-5 max-w-3xl shadow-lg ">
          {/* Logo */}
          <div className="max-w-[12rem] ">
            <img
              src="/logo.png"
              alt="Logo CCI"
              className="w-full max-w-s-xs min-w-[8rem] "
            />
          </div>

          <h1 className="text-2xl font-bold max-w-s-520:text-3xl max-w-s-900:text-4xl">
            Vamos começar!
          </h1>

          <p className="relative py-2 text-[0.85rem] text-start font-normal max-w-md max-w-s-420:text-base">
            Insira seu endereço de e-mail válido e senha para acessar a sua
            conta
          </p>

          <form
            onSubmit={handleSubmit(handleLogin)}
            className="relative w-full flex flex-col justify-center items-start gap-5 "
          >
            <InputFloatingLabelZod
              type="email"
              label="Email"
              name="email"
              control={control}
              error={errors.email}
              icon={Mail}
              id="emailId"
            />

            <InputFloatingLabelZod
              type="password"
              label="Senha"
              name="password"
              control={control}
              id="passId"
              icon={Lock}
              error={errors.password}
            />

            {isSend && <Loader2 size={20} className="animate-spin" />}
            <BaseButton
              typeButton="submit"
              title="Acessar o painel"
              styleBtn="CircleHover"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
