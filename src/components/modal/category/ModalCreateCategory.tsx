import Modal from 'react-modal'

// Form
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { customStylesModalCenter } from '../../../styles/custom/modals'
import { Loader2, X } from 'lucide-react'
import { CustomInput } from '../../input/InputLabel'
import { useEffect, useState } from 'react'
import { CategoryViewModel } from '../../../viewModel/CategoryViewModel'
import { showToast } from '../../../utils/toasts'
import { CategoryInterface } from '../../../interfaces/category'
import { transformedText } from '../../../utils/formattedString'
import { ToastContainer } from 'react-toastify'
import { UploadViewModel } from '../../../viewModel/UploadViewModel'

type modalType = {
  handleUpdateListing: () => void
  modalCreateRowIsOpen: boolean
  setModalCreateRowIsOpen: (e: boolean) => void
}

const formSchema = z.object({
  category: z
    .string()
    .nonempty('O nome da category é obrigatório!')
    .refine(value => value, {
      message: 'Por favor, preencha este campo'
    }),
  color: z
    .string()
    .nonempty('O campo cor é obrigatório!')
    .refine(value => value, {
      message: 'Por favor, preencha este campo'
    })
})

type formType = z.infer<typeof formSchema>

export function ModalCreateCategory({
  handleUpdateListing,
  modalCreateRowIsOpen,
  setModalCreateRowIsOpen
}: modalType) {
  const [isSend, setIsSend] = useState<boolean>(false)

  // Image
  const [fileImageSelect, setFileImageSelect] = useState<string>('')
  const [imagesSelect, setImagesSelect] = useState<string>('')

  const categoryViewModel = new CategoryViewModel()
  const uploadViewModel = new UploadViewModel()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema)
  })

  function closeModal() {
    setModalCreateRowIsOpen(false)
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  const onImageChange = (e: any) => {
    const [file] = e.target.files
    const image = e.target.files[0]
    setFileImageSelect(image)
    setImagesSelect(URL.createObjectURL(file))
  }

  async function handleUpload(): Promise<{
    urlCategoryImage: string
  }> {
    // ImageCategory
    const imageCategoryData = new FormData()
    imageCategoryData.append('imageCategory', fileImageSelect)

    const responseUploadCategoryImage =
      await uploadViewModel.uploadImageCategory(imageCategoryData)
    if (responseUploadCategoryImage.error) {
      setIsSend(false)
      throw new Error(responseUploadCategoryImage.msg as string)
    }

    const urlCategoryImage = responseUploadCategoryImage.imageUrl as string

    return {
      urlCategoryImage
    }
  }

  async function handleSubmitForm(dataForm: any) {
    setIsSend(true)

    try {
      const result = await handleUpload()

      const { urlCategoryImage } = result

      const dataToSave = {
        ...dataForm,
        image: urlCategoryImage,
        code: transformedText(dataForm.category)
      }

      const response = await categoryViewModel.createCategory(dataToSave)

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

  useEffect(() => {
    setIsSend(false)
  }, [])

  return (
    <>
      <Modal
        isOpen={modalCreateRowIsOpen}
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
              <p className="text-xl font-medium text-light">Criar categoria</p>

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
                <div className="w-full max-w-[14rem] flex items-start justify-start ">
                  <label
                    htmlFor="dropzone-file"
                    className="w-full h-40 flex flex-col items-center justify-center border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-70 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-all duration-300 relative overflow-hidden"
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

              <CustomInput
                type="text"
                htmlFor="category"
                label="Nome da categoria"
                placeholder="Ex.: tecnologia"
                control={control}
                error={errors.category}
              />
              <CustomInput
                type="color"
                htmlFor="color"
                label="Cor da categoria"
                placeholder="Ex.: #ffffff"
                control={control}
                error={errors.category}
              />

              <div className="w-full pt-4 flex flex-row justify-between items-center border-t-[1px] border-gray-600 ">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {!isSend && 'Criar'}
                  {isSend && <Loader2 size={20} className="animate-spin" />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  )
}
