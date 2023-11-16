import Modal from 'react-modal'

// Form
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { customStylesModalCenter } from '../../../styles/custom/modals'
import { X } from 'lucide-react'
import { CustomInput } from '../../input/InputLabel'
import { TagInterface } from '../../../interfaces/tag'
import { transformedText } from '../../../utils/formattedString'
import { TagViewModel } from '../../../viewModel/TagViewModel'
import { useState } from 'react'
import { showToast } from '../../../utils/toasts'
import { ToastContainer } from 'react-toastify'

type modalType = {
  baseInfo: TagInterface
  modalEditRowIsOpen: boolean
  handleUpdateListing: () => void
  setModalEditRowIsOpen: (e: boolean) => void
}

const formSchema = z.object({
  tag: z
    .string()
    .nonempty('O nome da tag é obrigatório!')
    .refine(value => value, {
      message: 'Por favor, preencha este campo'
    })
})

type formType = z.infer<typeof formSchema>

// interface InitialValuesInterface extends TagInterface {
//   id?: string
// }

export function ModalEditTag({
  baseInfo,
  modalEditRowIsOpen,
  handleUpdateListing,
  setModalEditRowIsOpen
}: modalType) {
  const initialValues: TagInterface = {
    tag: baseInfo.tag,
    code: baseInfo.code
  }

  const [isSend, setIsSend] = useState<boolean>(false)

  const tagViewModel = new TagViewModel()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    defaultValues: initialValues,
    resolver: zodResolver(formSchema)
  })

  function closeModal() {
    setModalEditRowIsOpen(false)
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  async function handleSubmitData(dataForm: any) {
    setIsSend(true)

    try {
      const dataToSave = {
        ...dataForm,
        code: transformedText(dataForm.tag)
      }

      const response = await tagViewModel.updateTagData(
        baseInfo.id as string,
        dataToSave
      )

      console.log(response)

      if (response.data.error) {
        showToast('error', response.data.msg as string)
      } else {
        showToast('success', response.data.msg as string)

        setTimeout(() => {
          setIsSend(false)
          closeModal()
        }, 4000)

        handleUpdateListing()
      }
    } catch (error) {
      console.log(error)
      setIsSend(false)

      showToast('error', String(error) as string)
    }

    setIsSend(false)
  }

  return (
    <>
      <Modal
        isOpen={modalEditRowIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStylesModalCenter}
        contentLabel="Example Modal"
      >
        <div className="w-full h-full flex items-center justify-center ">
          <ToastContainer />

          <div className="w-full h-auto max-h-[90%] max-w-3xl flex flex-col items-center p-0  rounded-md overflow-y-auto bg-dark overflow-x-hidden scroll-smooth">
            <div className="w-full py-4 px-5 flex flex-row justify-between items-center border-b-[1px] border-gray-600 ">
              <p className="text-xl font-medium text-light">Editar tag</p>

              <button
                onClick={closeModal}
                className="py-2 px-2 rounded-lg text-light hover:bg-gray-300/20 dark:hover:bg-gray-500/20 active:bg-gray-300 active:text-dark flex flex-row items-center justify-center gap-4 transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(handleSubmitData)}
              className="w-full p-6 flex flex-col justify-center items-center gap-6"
            >
              <CustomInput
                type="text"
                htmlFor="tag"
                label="Nome da tag"
                placeholder="Ex.: Tecnologia"
                control={control}
                error={errors.tag}
              />

              <div className="w-full pt-4 flex flex-row justify-between items-center border-t-[1px] border-gray-600 ">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Salvar alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  )
}
