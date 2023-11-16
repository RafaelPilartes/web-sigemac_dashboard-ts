import Modal from 'react-modal'

// Form
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { customStylesModalCenter } from '../../../styles/custom/modals'
import { X } from 'lucide-react'
import { CustomInput } from '../../input/InputLabel'
import { useEffect, useState } from 'react'
import { VideoInterface } from '../../../interfaces/video'
import { showToast, showToastRight } from '../../../utils/toasts'
import { VideoViewModel } from '../../../viewModel/videoViewModel'
import { UploadViewModel } from '../../../viewModel/UploadViewModel'
import { TextAreaLabel } from '../../textarea/TextAreaLabel'
import { SelectCustomZod } from '../../selects/SelectCustomZod'
import { AuthorViewModel } from '../../../viewModel/authorViewModel'
import { CategoryViewModel } from '../../../viewModel/CategoryViewModel'
import { OptionType } from '../../../types/option'
import { CategoryInterface } from '../../../interfaces/category'
import { AuthorInterface } from '../../../interfaces/author'
import { ToastContainer } from 'react-toastify'

type modalType = {
  baseInfo: VideoInterface
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
  link: z
    .string()
    .nonempty('O tempo de leitura é obrigatório!')
    .refine(value => value, {
      message: 'Por favor, preencha este campo'
    })
})

type formType = z.infer<typeof formSchema>

export function ModalEditVideo({
  baseInfo,
  modalEditRowIsOpen,
  handleUpdateListing,
  setModalEditRowIsOpen
}: modalType) {
  const initialValues = {
    title: baseInfo.title,
    author_id: baseInfo.author_id,
    category_id: baseInfo.category_id,
    description: baseInfo.description,
    link: baseInfo.link
  }

  const [isSend, setIsSend] = useState<boolean>(false)

  // Image
  const [fileImageSelect, setFileImageSelect] = useState<string>('')
  const [imagesSelect, setImagesSelect] = useState<string>(
    baseInfo.cover as string
  )

  const [rowsAuthorData, setRowsAuthorData] = useState<OptionType[] | null>(
    null
  )
  const [rowsCategoryData, setRowsCategoryData] = useState<OptionType[] | null>(
    null
  )

  const videoViewModel = new VideoViewModel()
  const uploadViewModel = new UploadViewModel()

  const authorViewModel = new AuthorViewModel()
  const categoryViewModel = new CategoryViewModel()

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

  const onImageChange = (e: any) => {
    const [file] = e.target.files
    const image = e.target.files[0]
    setFileImageSelect(image)
    setImagesSelect(URL.createObjectURL(file))
  }

  async function handleSubmitForm(dataForm: any) {
    setIsSend(true)

    let imageUrl: string | undefined = ''

    if (fileImageSelect) {
      const imageData = new FormData()
      imageData.append('imageVideo', fileImageSelect)

      const responseUpload = await uploadViewModel.uploadImageVideo(imageData)

      if (responseUpload.error) {
        showToast('error', responseUpload.msg as string)
        setIsSend(false)
        return
      }

      imageUrl = responseUpload.imageUrl ? responseUpload.imageUrl : ''
    }

    const dataToSave = {
      ...dataForm,
      cover: imageUrl
    }

    console.log(dataToSave)

    const response = await videoViewModel.updateVideoData(
      baseInfo.id as string,
      dataToSave
    )

    console.log(response.data)

    if (response.data.error) {
      showToast('error', response.data.msg as string)
    } else {
      showToast('success', response.data.msg as string)
      setIsSend(false)

      setTimeout(() => {
        closeModal()
      }, 4000)

      handleUpdateListing()
    }
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
              <p className="text-xl font-medium text-light">Editar video</p>

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

                <div className="w-full max-w-[14rem] flex items-start justify-start ">
                  <label
                    htmlFor="dropzone-file"
                    className="w-full h-40 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-70 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-all duration-300 relative overflow-hidden"
                  >
                    {!imagesSelect && (
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
                          <span className="font-semibold">Click to upload</span>{' '}
                          {/* or drag and drop */}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG or JPEG (MAX. 3Mb)
                        </p>
                      </div>
                    )}

                    {imagesSelect && (
                      <img
                        className=" w-full h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
                        src={imagesSelect}
                        alt="Rafael Pilartes"
                      />
                    )}
                    <input
                      id="dropzone-file"
                      type="file"
                      accept="image/jpeg, image/png, image/jpg"
                      className="hidden"
                      onChange={onImageChange}
                    />
                  </label>
                </div>
              </div>

              <div className="w-full">
                <CustomInput
                  type="text"
                  htmlFor="title"
                  label="Titulo"
                  placeholder="Ex.: Titulo do video"
                  control={control}
                  error={errors.title}
                />
              </div>

              <div className="w-full grid gap-6 md:grid-cols-1">
                <TextAreaLabel
                  // isDisabled={true}
                  htmlFor="description"
                  label="Descrição"
                  placeholder="Ex.: Descrição do video"
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
                <CustomInput
                  type="text"
                  htmlFor="link"
                  label="Link do video"
                  placeholder="Ex.: https://www.youtube.com/@jasei"
                  control={control}
                  error={errors.link}
                />
              </div>

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
