import Modal from 'react-modal'

// Form
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { customStylesModalCenter } from '../../../styles/custom/modals'
import { X } from 'lucide-react'
import { CustomInput } from '../../input/InputLabel'
import { useEffect, useState } from 'react'
import { NewsInterface } from '../../../interfaces/news'
import { showToast, showToastRight } from '../../../utils/toasts'
import { NewsViewModel } from '../../../viewModel/newsViewModel'
import { UploadViewModel } from '../../../viewModel/UploadViewModel'
import { TextAreaLabel } from '../../textarea/TextAreaLabel'
import { SelectCustomZod } from '../../selects/SelectCustomZod'
import { AuthorViewModel } from '../../../viewModel/authorViewModel'
import { CategoryViewModel } from '../../../viewModel/CategoryViewModel'
import { OptionType } from '../../../types/option'
import { CategoryInterface } from '../../../interfaces/category'
import { AuthorInterface } from '../../../interfaces/author'

type modalType = {
  baseInfo: NewsInterface
  modalEditRowIsOpen: boolean
  handleUpdateListing: () => void
  setModalEditRowIsOpen: (e: boolean) => void
}

const formSchema = z.object({
  title: z
    .string()
    .nonempty('O titulo é obrigatório!')
    .min(6, 'O titulo tem de ter no mínimo 6 caracteres')
    .refine(value => value, {
      message: 'Por favor, preencha este campo'
    }),
  resume: z
    .string()
    .nonempty('O resumo é obrigatório!')
    .min(6, 'O resumo tem de ter no mínimo 6 caracteres')
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
  epigraph: z
    .string()
    .nonempty('A epigrafe é obrigatório!')
    .min(6, 'A epigrafe tem de ter no mínimo 6 caracteres')
    .refine(value => value, {
      message: 'Por favor, preencha este campo'
    }),
  author_epigraph: z
    .string()
    .nonempty('O autor da epigrafe é obrigatório!')
    .min(6, 'O autor da epigrafe tem de ter no mínimo 6 caracteres')
    .refine(value => value, {
      message: 'Por favor, preencha este campo'
    }),
  reading_time: z
    .string()
    .nonempty('O tempo de leitura é obrigatório!')
    .refine(value => value, {
      message: 'Por favor, preencha este campo'
    }),
  publicity: z.string().refine(
    value => {
      return value === 'yes' || value === 'no'
    },
    {
      message: "Por favor, selecione uma opção válida: 'Sim' ou 'Não'"
    }
  ),
  choose_editors: z.string().refine(
    value => {
      return value === 'yes' || value === 'no'
    },
    {
      message: "Por favor, selecione uma opção válida: 'Sim' ou 'Não'"
    }
  ),
  emphasis: z.string().refine(
    value => {
      return value === 'yes' || value === 'no'
    },
    {
      message: "Por favor, selecione uma opção válida: 'Sim' ou 'Não'"
    }
  ),
  relevant: z.string().refine(
    value => {
      return value === 'yes' || value === 'no'
    },
    {
      message: "Por favor, selecione uma opção válida: 'Sim' ou 'Não'"
    }
  )
})

type formType = z.infer<typeof formSchema>

export function ModalEditNews({
  baseInfo,
  modalEditRowIsOpen,
  handleUpdateListing,
  setModalEditRowIsOpen
}: modalType) {
  const initialValues = {
    title: baseInfo.title,
    resume: baseInfo.resume,
    author_id: baseInfo.author_id,
    category_id: baseInfo.category_id,
    description: baseInfo.description,
    epigraph: baseInfo.epigraph,
    author_epigraph: baseInfo.author_epigraph,
    reading_time: baseInfo.reading_time,
    publicity: baseInfo.publicity,
    choose_editors: baseInfo.choose_editors,
    emphasis: baseInfo.emphasis,
    relevant: baseInfo.relevant
  }

  const [isSend, setIsSend] = useState<boolean>(false)

  // Image
  const [filesImagesSelect, setFilesImagesSelect] = useState<File[]>([])

  const arrayImages = baseInfo.images.split(',')
  const filesImagesDoc: string[] = arrayImages as string[]

  // Images

  const [rowsAuthorData, setRowsAuthorData] = useState<OptionType[] | null>(
    null
  )
  const [rowsCategoryData, setRowsCategoryData] = useState<OptionType[] | null>(
    null
  )

  const newsViewModel = new NewsViewModel()
  const uploadViewModel = new UploadViewModel()

  const authorViewModel = new AuthorViewModel()
  const categoryViewModel = new CategoryViewModel()

  const maxFiles = 4

  const myOptions = [
    { value: 'yes', label: 'Sim' },
    { value: 'no', label: 'Não' }
  ]

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    defaultValues: initialValues,
    resolver: zodResolver(formSchema)
  })

  // Close modal
  function closeModal() {
    setModalEditRowIsOpen(false)
  }
  // After close modal
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  // Image
  const onImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const files = event.target.files

    if (files) {
      if (files && files.length > maxFiles) {
        showToast(
          'error',
          `Você pode selecionar no máximo ${maxFiles} fotografias.`
        )

        event.target.value = '' // Limpa a seleção de arquivos
      } else {
        const selectedFiles = Array.from(files)
        setFilesImagesSelect(selectedFiles)
      }
    }
  }

  const renderImages = filesImagesSelect.map((file: any, index: number) => {
    const photo = URL.createObjectURL(file)

    return (
      <div
        // onClick={() => alert('rrr')}
        key={index}
        className="w-full max-w-xs h-full flex flex-col items-center justify-center rounded-lg cursor-pointer bg-gray-70 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-all duration-300 relative overflow-hidden"
      >
        <img
          className=" w-full h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
          src={photo}
          alt="Rafael Pilartes"
        />
      </div>
    )
  })

  const renderDefaultImages = filesImagesDoc.map(
    (image: any, index: number) => {
      return (
        <div
          // onClick={() => alert('rrr')}
          key={index}
          className="w-full max-w-xs h-full flex flex-col items-center justify-center rounded-lg cursor-pointer bg-gray-70 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-all duration-300 relative overflow-hidden"
        >
          <img
            className=" w-full h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
            src={image}
            alt="Rafael Pilartes"
          />
        </div>
      )
    }
  )

  // Upload
  async function handleUpload(): Promise<{
    urlNewsImages: string[]
  }> {
    // ImageNews
    const imageNewsData = new FormData()
    for (let i = 0; i < filesImagesSelect.length; i++) {
      imageNewsData.append('imageNews[]', filesImagesSelect[i])
    }

    const responseUploadImages = await uploadViewModel.uploadImageNews(
      imageNewsData
    )
    if (responseUploadImages.error) {
      setIsSend(false)
      throw new Error(responseUploadImages.msg as string)
    }

    const responseUploadNewsImage = responseUploadImages.imagesUrl as string[]

    const urlNewsImages = responseUploadNewsImage as string[]

    return {
      urlNewsImages
    }
  }

  async function handleSubmitForm(dataForm: any) {
    setIsSend(true)

    try {
      const result = await handleUpload()

      const { urlNewsImages } = result

      const dataToSave = {
        ...dataForm,
        images: urlNewsImages.toString()
      }

      const response = await newsViewModel.updateNewsData(
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
          // closeModal()
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

    console.log('filesImagesDoc', filesImagesDoc)
  }, [])

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
              <p className="text-xl font-medium text-light">
                Editar administrador
              </p>

              <button
                onClick={closeModal}
                className="py-2 px-2 rounded-lg text-light hover:bg-gray-300/20 dark:hover:bg-gray-500/20 active:bg-gray-300 active:text-dark flex flex-row items-center justify-center gap-4 transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(handleSubmitForm)}
              className="w-full p-6 flex flex-col justify-center items-center gap-6"
            >
              <div className="w-full flex flex-col items-start justify-start">
                <label className="block mb-2 text-sm font-medium text-light">
                  Imagens da notícia
                </label>

                <div className="w-full flex items-start justify-start ">
                  <label
                    htmlFor="dropzone-file"
                    className="w-full h-64 p-3 flex flex-row items-center justify-center gap-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-70 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-all duration-300 relative"
                  >
                    {filesImagesSelect.length <= 0 &&
                      filesImagesDoc.length <= 0 && (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{' '}
                            {/* or drag and drop */}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPG or JPEG (MAX. 3Mb)
                          </p>
                        </div>
                      )}

                    {filesImagesSelect.length >= 0 && renderImages}
                    {filesImagesSelect.length <= 0 && renderDefaultImages}
                    <input
                      id="dropzone-file"
                      type="file"
                      accept="image/jpeg, image/png, image/jpg"
                      className="hidden"
                      multiple
                      onChange={onImagesChange}
                    />
                  </label>
                </div>
              </div>

              <div className="w-full">
                <CustomInput
                  type="text"
                  htmlFor="title"
                  label="Titulo"
                  placeholder="Ex.: Rafael Pilartes"
                  control={control}
                  error={errors.title}
                />
              </div>

              <div className="w-full grid gap-6 md:grid-cols-1">
                <TextAreaLabel
                  // isDisabled={true}
                  htmlFor="resume"
                  label="Resumo"
                  placeholder="Ex.: Descrição 1"
                  control={control}
                  error={errors.resume}
                />
              </div>
              <div className="w-full grid gap-6 md:grid-cols-1">
                <TextAreaLabel
                  // isDisabled={true}
                  htmlFor="description"
                  label="Descrição"
                  placeholder="Ex.: Descrição 1"
                  control={control}
                  error={errors.description}
                />
              </div>

              <div className="w-full grid gap-6 md:grid-cols-2">
                <SelectCustomZod
                  name="author_id"
                  label="Autor"
                  control={control}
                  error={errors.author_id}
                  options={rowsAuthorData as OptionType[]}
                  onOptionChange={() => null}
                />
                <SelectCustomZod
                  name="category_id"
                  label="Categoria"
                  control={control}
                  error={errors.category_id}
                  options={rowsCategoryData as OptionType[]}
                  onOptionChange={() => null}
                />
              </div>

              <div className="w-full grid gap-6 md:grid-cols-1">
                <TextAreaLabel
                  // isDisabled={true}
                  htmlFor="epigraph"
                  label="Epigrafe"
                  placeholder="Ex.: Epigrafe 1"
                  control={control}
                  error={errors.epigraph}
                />
              </div>

              <div className="w-full grid gap-6 md:grid-cols-2">
                <CustomInput
                  type="text"
                  htmlFor="author_epigraph"
                  label="Autor da epigrafe"
                  placeholder="Ex.: Raimundo Gaspar"
                  control={control}
                  error={errors.author_epigraph}
                />
                <CustomInput
                  type="number"
                  htmlFor="reading_time"
                  label="Tempo de leitura (minutos)"
                  placeholder="Ex.: 5 min"
                  control={control}
                  error={errors.reading_time}
                />
              </div>

              <div className="w-full grid gap-6 md:grid-cols-2">
                <SelectCustomZod
                  name="publicity"
                  label="É notícia de capa?"
                  control={control}
                  error={errors.publicity}
                  options={myOptions}
                  onOptionChange={() => null}
                />
                <SelectCustomZod
                  name="choose_editors"
                  label="É escolha dos editores?"
                  control={control}
                  error={errors.choose_editors}
                  options={myOptions}
                  onOptionChange={() => null}
                />
              </div>
              <div className="w-full grid gap-6 md:grid-cols-2">
                <SelectCustomZod
                  name="emphasis"
                  label="Está em destaque?"
                  control={control}
                  error={errors.emphasis}
                  options={myOptions}
                  onOptionChange={() => null}
                />
                <SelectCustomZod
                  name="relevant"
                  label="É relevante?"
                  control={control}
                  error={errors.relevant}
                  options={myOptions}
                  onOptionChange={() => null}
                />
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  )
}
