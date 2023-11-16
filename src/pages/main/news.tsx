// LIBS
import swal from 'sweetalert'

import { routsNameMain } from '../../data/routsName'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { InputWithButton } from '../../components/input/InputWithButton'
import { IoSearchSharp } from 'react-icons/io5'
import { FileDown, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { TableRow } from '../../components/table/TableRowNews'
import { SelectCustom } from '../../components/selects/SelectCustom'
import { ModalEditNews } from '../../components/modal/news/ModalEditNews'
import { ModalCreateNews } from '../../components/modal/news/ModalCreateNews'
import { NewsInterface } from '../../interfaces/news'
import { NewsViewModel } from '../../viewModel/newsViewModel'
import ExportToExcel from '../../components/ExportToExcel'
import { showToastRight } from '../../utils/toasts'
import { ModalSeeNews } from '../../components/modal/news/ModalSeeNews'

function News() {
  const [rowsData, setRowsData] = useState<NewsInterface[] | null>(null)

  const [dataToExport, setDataToExport] = useState<any[]>([])

  const [modalSeeRowIsOpen, setModalSeeRowIsOpen] = useState<boolean>(false)
  const [modalEditRowIsOpen, setModalEditRowIsOpen] = useState<boolean>(false)
  const [modalCreateRowIsOpen, setModalCreateRowIsOpen] =
    useState<boolean>(false)
  const [rowSelect, setRowSelect] = useState<any | null>(null)

  // Search
  const [termForSearch, setTermForSearch] = useState<string>('')

  const [docsPerPage, setDocsPerPage] = useState<string>('8')
  const [totalDocs, setTotalDocs] = useState<number>(0)

  const newsViewModel = new NewsViewModel()

  const itemsBreadcrumbs = [
    { label: 'Inicio', to: routsNameMain.home },
    { label: 'Noticias', to: routsNameMain.admins },
    { label: 'Listagem' }
  ]

  const optionsRowPerPage = [
    { value: '8', label: '8' },
    { value: '14', label: '14' },
    { value: '18', label: '18' },
    { value: '22', label: '22' },
    { value: '26', label: '26' },
    { value: '30', label: '30' },
    { value: 'Todos', label: 'Todos' }
  ]

  const rowsTable = rowsData?.map((item, index) => {
    return (
      <TableRow
        key={index}
        rowItem={item}
        openModalSeeRow={openModalSeeRow}
        openModalEditRow={openModalEditRow}
        handleDeleteRow={handleDeleteRow}
      />
    )
  })

  // Get data
  function fetchData(limit: string) {
    // Clear
    setRowsData(null)

    // Get
    newsViewModel.getAllNewsData().then(response => {
      if (response.data.error) {
        showToastRight('error', response.data.msg as string)
      } else {
        const arrayData = response.data.data as unknown as NewsInterface[]
        setTotalDocs(arrayData.length)
        console.log(arrayData)

        const listData = arrayData.slice(0, Number(limit))

        setRowsData(listData as NewsInterface[])
      }
    })
  }

  // Get more data
  function fetchMoreData() {
    // setDocsPerPage(docsPerPage + selectedValue)
    fetchData(docsPerPage + docsPerPage)
  }

  // Search cata
  async function searchDocs() {
    if (termForSearch == '') {
      fetchData(docsPerPage)
    } else {
      newsViewModel.getAllNewsByTermData(termForSearch).then(response => {
        console.log(response)

        setRowsData(response.data.data as unknown as NewsInterface[])
        console.log(response)
      })
    }
  }

  // Update Listing
  const handleUpdateListing = () => {
    fetchData(docsPerPage)
  }

  // Delete row
  function handleDeleteRow(id: string) {
    swal({
      title: 'Tem certeza?',
      text: 'Uma vez excluído, você não poderá recuperar está news!',
      buttons: ['Cancelar', 'Confirmar'],
      icon: 'warning',
      dangerMode: true
    }).then(async willDelete => {
      if (willDelete) {
        await newsViewModel.deleteNewsData(id).then(response => {
          console.log(response)

          if (response.data.error) {
            swal(`Erro ao deletar registo: ${response.data.msg}`, {
              icon: 'error'
            })
            console.error('', response.data.msg)
          } else {
            swal('Deletado com sucesso', {
              icon: 'success'
            })

            fetchData(docsPerPage)
          }
        })
      } else {
        swal('A news está seguro!', {
          icon: 'error'
        })
      }
    })
  }

  // Change rows per page
  const handleSelectChange = (value: string) => {
    setDocsPerPage(value)
    fetchData(value)
  }

  // Open modal see
  function openModalSeeRow(item: any) {
    setRowSelect(item)
    setModalSeeRowIsOpen(true)
  }

  // Open modal edit
  function openModalEditRow(item: any) {
    setRowSelect(item)
    setModalEditRowIsOpen(true)
  }

  // Open modal create
  function openModalCreateRow() {
    setModalCreateRowIsOpen(true)
  }

  useEffect(() => {
    fetchData(docsPerPage)
  }, [])

  useEffect(() => {
    const newData = rowsData?.map(doc => ({
      Id: `${doc.id}`,
      Titulo: doc.title,
      Resumo: doc.resume,
      Descricao: doc.description,
      Visualizacoes: doc.views,
      Data_de_criacao: doc.date_create,
      Ultima_atualização: doc.date_update
    }))

    setDataToExport(newData as any)
  }, [rowsData])

  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-6">
      <div className="w-full p-6 flex flex-col justify-start items-start gap-6 rounded-md bg-light dark:bg-dark">
        <Breadcrumbs items={itemsBreadcrumbs} />

        <h1 className="text-2xl font-bold text-dark dark:text-light ">
          Noticias
        </h1>

        <div className="w-full flex flex-row items-center justify-between gap-2 ">
          <div className="flex flex-row items-center justify-between gap-4">
            <button
              onClick={openModalCreateRow}
              className="py-2 px-4 rounded-lg bg-primary-200 text-white hover:bg-primary-500 active:bg-primary-700 flex flex-row items-center justify-center gap-4 transition-all duration-300 "
            >
              <Plus />
              Adicionar noticia
            </button>
            <ExportToExcel
              data={dataToExport}
              filename="news_data"
              sheetName="News"
              titlePage="Lista de categorias"
              imageSrc="http://localhost:5173/logo.png"
              orientation="landscape"
              scale={0.8}
            />
          </div>

          <div className="w-full max-w-sm">
            <InputWithButton
              onChange={e => setTermForSearch(e.target.value)}
              placeholder="Digite algo"
              // buttonText="Enviar"
              icon={<IoSearchSharp size={20} />}
              onButtonClick={searchDocs}
            />
          </div>
        </div>
      </div>

      <div className="w-full p-6 flex flex-col justify-start items-start gap-6 rounded-md bg-light dark:bg-dark">
        <h1 className="text-xl font-bold text-dark dark:text-light ">
          Listagem Noticias
        </h1>

        <div className="relative w-full overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-sm font-thin bg-gray-300/40 dark:bg-gray-500/40 ">
              <tr className="border-b dark:border-gray-700">
                <th scope="col" className="px-3 py-3 w-[0rem] ">
                  Id
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                  Capa
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                  Titulo
                </th>

                <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                  Resumo
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                  Autor
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                  Categoria
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                  Data
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                  Ação
                </th>
              </tr>
            </thead>

            <tbody>{rowsTable}</tbody>
          </table>

          <div className="pt-4 flex flex-row justify-between items-center gap-1">
            <p className="text-xs flex flex-row justify-start items-center gap-1">
              Mostrando
              <strong className="text-dark dark:text-light font-semibold">
                {rowsData?.length !== undefined ? '1' : '0'}
              </strong>
              a
              <strong className="text-dark dark:text-light font-semibold">
                {rowsData?.length !== undefined ? rowsData?.length : '0'}
              </strong>
              de
              <strong className="text-dark dark:text-light font-semibold">
                {totalDocs}
              </strong>
              Notícias
            </p>

            <div className="flex flex-row justify-center items-center gap-4 ">
              <div className="flex flex-row justify-center items-center gap-4 ">
                <span>Registos por página: </span>
                <SelectCustom
                  options={optionsRowPerPage}
                  selectedValue={docsPerPage}
                  onChange={handleSelectChange}
                />
              </div>

              <button
                onClick={fetchMoreData}
                type="submit"
                className="sm:w-auto text-xs font-medium text-dark px-5 py-2.5 text-center flex flex-row justify-center items-center gap-2 bg-gray-50 rounded-lg  border border-gray-300 focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-light dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <Plus size={16} /> Listar mais registos
              </button>
            </div>
          </div>
        </div>
      </div>

      {modalCreateRowIsOpen && (
        <ModalCreateNews
          handleUpdateListing={handleUpdateListing}
          modalCreateRowIsOpen={modalCreateRowIsOpen}
          setModalCreateRowIsOpen={setModalCreateRowIsOpen}
        />
      )}
      {modalEditRowIsOpen && (
        <ModalEditNews
          baseInfo={rowSelect}
          handleUpdateListing={handleUpdateListing}
          modalEditRowIsOpen={modalEditRowIsOpen}
          setModalEditRowIsOpen={setModalEditRowIsOpen}
        />
      )}
      {modalSeeRowIsOpen && (
        <ModalSeeNews
          baseInfo={rowSelect}
          handleUpdateListing={handleUpdateListing}
          modalSeeRowIsOpen={modalSeeRowIsOpen}
          setModalSeeRowIsOpen={setModalSeeRowIsOpen}
        />
      )}
    </div>
  )
}

export default News
