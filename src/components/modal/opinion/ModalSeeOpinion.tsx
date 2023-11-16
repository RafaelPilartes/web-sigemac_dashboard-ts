import Modal from 'react-modal'

// Form
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { customStylesModalCenter } from '../../../styles/custom/modals'
import { X } from 'lucide-react'
import { CustomInput } from '../../input/InputLabel'
import { useEffect, useState } from 'react'
import { OpinionInterface } from '../../../interfaces/opinion'
import { showToast, showToastRight } from '../../../utils/toasts'
import { OpinionViewModel } from '../../../viewModel/opinionViewModel'
import { UploadViewModel } from '../../../viewModel/UploadViewModel'
import { TextAreaLabel } from '../../textarea/TextAreaLabel'
import { SelectCustomZod } from '../../selects/SelectCustomZod'
import { AuthorViewModel } from '../../../viewModel/authorViewModel'
import { CategoryViewModel } from '../../../viewModel/CategoryViewModel'
import { OptionType } from '../../../types/option'
import { CategoryInterface } from '../../../interfaces/category'
import { AuthorInterface } from '../../../interfaces/author'

type modalType = {
  baseInfo: OpinionInterface
  modalSeeRowIsOpen: boolean
  handleUpdateListing: () => void
  setModalSeeRowIsOpen: (e: boolean) => void
}

const formSchema = z.object({
  title: z
    .string()
    .nonempty('O titulo é obrigatório!')
    .min(6, 'O titulo tem de ter no mínimo 6 caracteres')
    .refine(value => value, {
      message: 'Por favor, preencha este campo'
    }),
  author_id: z
    .string()
    .nonempty('O autor é obrigatório!')
    .refine(value => value, {
      message: 'Por favor, preencha este campo'
    }),
  category_id: z
    .string()
    .nonempty('A categoria é obrigatório!')
    .refine(value => value, {
      message: 'Por favor, preencha este campo'
    }),
  description: z
    .string()
    .nonempty('A descrição é obrigatório!')
    .min(6, 'A descrição tem de ter no mínimo 6 caracteres')
    .refine(value => value, {
      message: 'Por favor, preencha este campo'
    }),
  reading_time: z
    .string()
    .nonempty('O tempo de leitura é obrigatório!')
    .refine(value => value, {
      message: 'Por favor, preencha este campo'
    })
})

type formType = z.infer<typeof formSchema>

export function ModalSeeOpinion({
  baseInfo,
  modalSeeRowIsOpen,
  handleUpdateListing,
  setModalSeeRowIsOpen
}: modalType) {
  const initialValues = {
    title: baseInfo.title,
    author_id: baseInfo.author_id,
    category_id: baseInfo.category_id,
    description: baseInfo.description,
    reading_time: baseInfo.reading_time
  }

  const [rowsAuthorData, setRowsAuthorData] = useState<OptionType[] | null>(
    null
  )
  const [rowsCategoryData, setRowsCategoryData] = useState<OptionType[] | null>(
    null
  )

  const authorViewModel = new AuthorViewModel()
  const categoryViewModel = new CategoryViewModel()

  const {
    control,
    formState: { errors }
  } = useForm<formType>({
    defaultValues: initialValues,
    resolver: zodResolver(formSchema)
  })

  // Close modal
  function closeModal() {
    setModalSeeRowIsOpen(false)
  }
  // After close modal
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  // Get author data
  function fetchAuthorData() {
    // Clear
    setRowsAuthorData(null)

    // Get
    authorViewModel.getAllAuthorData().then(response => {
      if (response.data.error) {
        showToastRight('error', response.data.msg as string)
      } else {
        const arrayData = response.data.data as AuthorInterface[]

        const listData = arrayData

        const authorOptions: OptionType[] = listData?.map(obj => ({
          value: obj.id as string,
          label: obj.name as string
        }))

        console.log(authorOptions)

        setRowsAuthorData(authorOptions)
      }
    })
  }

  // Get Category data
  function fetchCategoryData() {
    // Clear
    setRowsCategoryData(null)

    // Get
    categoryViewModel.getAllCategoryData().then(response => {
      if (response.data.error) {
        showToastRight('error', response.data.msg as string)
      } else {
        const arrayData = response.data.data as CategoryInterface[]

        const listData = arrayData

        const categoryOptions: OptionType[] = listData?.map(obj => ({
          value: obj.id as string,
          label: obj.category as string
        }))

        setRowsCategoryData(categoryOptions)
      }
    })
  }

  useEffect(() => {
    fetchAuthorData()
    fetchCategoryData()
  }, [])

  return (
    <>
      <Modal
        isOpen={modalSeeRowIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStylesModalCenter}
        contentLabel="Example Modal"
      >
        <div className="w-full h-full flex items-center justify-center ">
          <div className="w-full h-auto max-h-[90%] max-w-3xl flex flex-col items-center p-0  rounded-md overflow-y-auto bg-dark overflow-x-hidden scroll-smooth">
            <div className="w-full py-4 px-5 flex flex-row justify-between items-center border-b-[1px] border-gray-600 ">
              <p className="text-xl font-medium text-light">
                Visualizar opinião
              </p>

              <button
                onClick={closeModal}
                className="py-2 px-2 rounded-lg text-light hover:bg-gray-300/20 dark:hover:bg-gray-500/20 active:bg-gray-300 active:text-dark flex flex-row items-center justify-center gap-4 transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>

            <form className="w-full p-6 flex flex-col justify-center items-center gap-6">
              <div className="w-full flex flex-col items-start justify-start">
                <label className="block mb-2 text-sm font-medium text-light">
                  Imagens do opinion
                </label>

                <div className="w-full max-w-[14rem] flex items-start justify-start ">
                  <label
                    htmlFor="dropzone-file"
                    className="w-full h-64 p-3 flex flex-row items-center justify-center gap-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-70 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-all duration-300 relative"
                  >
                    {baseInfo.cover && (
                      <div
                        // onClick={() => alert('rrr')}
                        className="w-full max-w-xs h-full flex flex-col items-center justify-center rounded-lg cursor-pointer bg-gray-70 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-all duration-300 relative overflow-hidden"
                      >
                        <img
                          className=" w-full h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
                          src={baseInfo.cover}
                          alt="Rafael Pilartes"
                        />
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="w-full">
                <CustomInput
                  type="text"
                  htmlFor="title"
                  label="Titulo"
                  placeholder="Ex.: Titulo do opinion"
                  control={control}
                  error={errors.title}
                />
              </div>

              <div className="w-full grid gap-6 md:grid-cols-1">
                <TextAreaLabel
                  isDisabled={true}
                  htmlFor="description"
                  label="Descrição"
                  placeholder="Ex.: Descrição do opinion"
                  control={control}
                  error={errors.description}
                />
              </div>

              <div className="w-full grid gap-6 md:grid-cols-2">
                <SelectCustomZod
                  isDisabled={true}
                  name="author_id"
                  label="Autor"
                  control={control}
                  error={errors.author_id}
                  options={rowsAuthorData as OptionType[]}
                  onOptionChange={() => null}
                />
                <SelectCustomZod
                  isDisabled={true}
                  name="category_id"
                  label="Categoria"
                  control={control}
                  error={errors.category_id}
                  options={rowsCategoryData as OptionType[]}
                  onOptionChange={() => null}
                />
              </div>

              <div className="w-full grid gap-6 md:grid-cols-1">
                <CustomInput
                  isDisabled={true}
                  type="number"
                  htmlFor="reading_time"
                  label="Tempo de leitura"
                  placeholder="Ex.: 5 min"
                  control={control}
                  error={errors.reading_time}
                />
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  )
}
