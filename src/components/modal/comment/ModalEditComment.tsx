import Modal from 'react-modal'

// Form
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { X } from 'lucide-react'
import { customStylesModalCenter } from '../../../styles/custom/modals'
import { CustomInput } from '../../input/InputLabel'
import { IComment } from '../../../interfaces/comment'

type modalType = {
  baseInfo: IComment
  modalEditRowIsOpen: boolean
  handleUpdateListing: () => void
  setModalEditRowIsOpen: (e: boolean) => void
}

const formSchema = z.object({
  user_id: z
    .string()
    .nonempty('O usuario é obrigatório!')
    .refine(value => value, {
      message: 'Por favor, preencha este campo'
    }),
  news_id: z
    .string()
    .nonempty('O noticia é obrigatório!')
    .refine(value => value, {
      message: 'Por favor, preencha este campo'
    }),
  comment: z
    .string()
    .nonempty('O comentario é obrigatório!')
    .refine(value => value, {
      message: 'Por favor, preencha este campo'
    }),
  is_approved: z
    .string()
    .nonempty('O estado é obrigatório!')
    .refine(value => value, {
      message: 'Por favor, preencha este campo'
    })
})

type formType = z.infer<typeof formSchema>

export function ModalEditComment({
  baseInfo,
  modalEditRowIsOpen,
  handleUpdateListing,
  setModalEditRowIsOpen
}: modalType) {
  const initialValues = {
    user_id: baseInfo.user_id,
    news_id: baseInfo.news_id,
    comment: baseInfo.comment,
    is_approved: baseInfo.is_approved
  }

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
    alert('sss')
    console.log(dataForm)
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
          <div className="w-full h-auto max-h-[90%] max-w-3xl flex flex-col items-center p-0  rounded-md overflow-y-auto bg-dark overflow-x-hidden scroll-smooth">
            <div className="w-full py-4 px-5 flex flex-row justify-between items-center border-b-[1px] border-gray-600 ">
              <p className="text-xl font-medium text-light">Editar permissão</p>

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
                htmlFor="user_id"
                label="Selecione o usuario"
                placeholder="Ex.: Rafael Pilartes"
                control={control}
                error={errors.user_id}
              />
              <CustomInput
                type="text"
                htmlFor="news_id"
                label="Selecione a noticia"
                placeholder="Ex.:Noticia 1"
                control={control}
                error={errors.news_id}
              />
              <CustomInput
                type="text"
                htmlFor="comment"
                label="Escreva o comentario"
                placeholder="Ex.: Loren, no to me, for he..."
                control={control}
                error={errors.comment}
              />
              <CustomInput
                type="text"
                htmlFor="is_approved"
                label="Selecione o estado"
                placeholder="Ex.: ...."
                control={control}
                error={errors.is_approved}
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
