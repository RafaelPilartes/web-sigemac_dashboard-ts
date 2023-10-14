// LIBS
import swal from 'sweetalert'

import { routsNameMain } from '../../data/routsName'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { InputWithButton } from '../../components/input/InputWithButton'
import { IoSearchSharp } from 'react-icons/io5'
import { FileDown, Plus } from 'lucide-react'
import { useState } from 'react'
import { ModalEditAdmin } from '../../components/modal/admin/ModalEditAdmin'
import { TableRow } from '../../components/table/TableRowNews'
import { SelectCustom } from '../../components/selects/SelectCustom'
import { ModalEditNews } from '../../components/modal/news/ModalEditNews'
import { ModalCreateNews } from '../../components/modal/news/ModalCreateNews'

function News() {
  const [modalEditRowIsOpen, setModalEditRowIsOpen] = useState<boolean>(false)
  const [modalCreateRowIsOpen, setModalCreateRowIsOpen] =
    useState<boolean>(false)
  const [rowSelect, setRowSelect] = useState<any | null>(null)
  const [selectedValue, setSelectedValue] = useState('8')

  const itemsBreadcrumbs = [
    { label: 'Inicio', to: routsNameMain.home },
    { label: 'Noticias', to: routsNameMain.admins },
    { label: 'Listagem' }
  ]
  const tableData = [
    {
      id: 1,
      title_news:
        'Mia Khalifa perde emprego após comemorar ataques contra Israel',
      resume_news:
        'A ex-atriz de “panô”, Mia Khalifa foi demitida do cargo de consultora da empresa Red Light Holanda, responsável pela comercialização de cogumelos alucinógenos, após ter usado suas redes sociais, no fim-de-semana anterior para comemorar os ataques realizados pelo grupo extremista Hamas no território israelense.',
      author_id: 'Autor 1',
      category_id: 'Categoria 1',
      description_news: 'Descrição da Notícia 1',
      epigraph_news: 'Epígrafe da Notícia 1',
      author_epigraph_news: 'Autor da Epígrafe 1',
      image_news: [
        'https://portalxaa.com/wp-content/uploads/2023/10/Captura-de-ecra-2023-10-11-as-10.55.55-1024x591.png',
        'imagem2.jpg'
      ],
      description_image_news: 'Descrição das Imagens da Notícia 1',
      photography_news: 'Fotógrafo da Notícia 1',
      reading_time_news: '5 minutos',
      publicity_news: 'Publicidade da Notícia 1',
      choose_editors_news: 'Editor da Notícia 1',
      emphasis_news: 'Ênfase da Notícia 1',
      relevant_news: 'Sim',
      views_news: 1000,
      date_create: '2023-10-13',
      date_update: '2023-10-13'
    },
    {
      id: 2,
      title_news:
        'Cristiano Ronaldo na ‘mira’ da Justiça iraniana, e pode arriscar-se a levar 100 “chicotadas”',
      resume_news:
        'Segundo informações avançadas, hoje, 12 de outubro, pelo programa televisivo italiano “TgLa7”, o futebolista português Cristiano Ronaldo incorre no crime de adultério, que, no país do Golfo Pérsico, é castigado por uma pena de até “100 chicotadas”.',
      author_id: 'Autor 2',
      category_id: 'Categoria 2',
      description_news: 'Descrição da Notícia 2',
      epigraph_news: 'Epígrafe da Notícia 2',
      author_epigraph_news: 'Autor da Epígrafe 2',
      image_news: [
        'https://portalxaa.com/wp-content/uploads/2023/10/652840f839c1d.jpg',
        'imagem4.jpg'
      ],
      description_image_news: 'Descrição das Imagens da Notícia 2',
      photography_news: 'Fotógrafo da Notícia 2',
      reading_time_news: '7 minutos',
      publicity_news: 'Publicidade da Notícia 2',
      choose_editors_news: 'Editor da Notícia 2',
      emphasis_news: 'Ênfase da Notícia 2',
      relevant_news: 'Sim',
      views_news: 1500,
      date_create: '2023-10-14',
      date_update: '2023-10-14'
    }
    // Adicione mais objetos aqui com os dados das outras linhas da tabela
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

  const rowsTable = tableData.map((item, index) => {
    return (
      <TableRow
        key={index}
        rowItem={item}
        openModalEditRow={openModalEditRow}
        handleDeleteRow={handleDeleteRow}
      />
    )
  })
  const fetchData = () => {
    // fetchData()
  }
  function openModalEditRow(item: any) {
    setRowSelect(item)
    setModalEditRowIsOpen(true)
  }
  function openModalCreateRow(item: any) {
    setModalCreateRowIsOpen(true)
  }
  function handleDeleteRow(id: string) {
    alert(id)
    swal({
      title: 'Tem certeza?',
      text: 'Uma vez excluído, você não poderá recuperar este usuario!',
      buttons: ['Cancelar', 'Confirmar'],
      icon: 'warning',
      dangerMode: true
    }).then(async willDelete => {
      if (willDelete) {
        try {
          // const response = await deleteEmployees(documentId)

          swal('Deletado com sucesso', {
            icon: 'success'
          })
        } catch (error) {
          swal(`Erro ao deletar registo: ${error}`, {
            icon: 'error'
          })
          console.error('', error)
        }
      } else {
        swal('O administrador está seguro!', {
          icon: 'error'
        })
      }
    })
  }
  const handleUpdateListing = () => {
    fetchData()
  }
  const handleSelectChange = (value: string) => {
    setSelectedValue(value)
  }

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
            <button className="py-2 px-4 rounded-lg border-[1px] border-gray-200 dark:border-gray-600 hover:bg-gray-300/20 dark:hover:bg-gray-500/20 active:bg-gray-200 flex flex-row items-center justify-center gap-4 transition-all duration-300">
              <FileDown />
              Exportar
            </button>
          </div>

          <div className="w-full max-w-sm">
            <InputWithButton
              placeholder="Digite algo"
              // buttonText="Enviar"
              icon={<IoSearchSharp size={20} />}
              onButtonClick={() => {
                // Lógica a ser executada quando o botão é clicado
              }}
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
                1
              </strong>
              a
              <strong className="text-dark dark:text-light font-semibold">
                8
              </strong>
              de
              <strong className="text-dark dark:text-light font-semibold">
                21
              </strong>
              Noticias
            </p>

            <div className="flex flex-row justify-center items-center gap-4 ">
              <div className="flex flex-row justify-center items-center gap-4 ">
                <span>Registos por página: </span>
                <SelectCustom
                  options={optionsRowPerPage}
                  selectedValue={selectedValue}
                  onChange={handleSelectChange}
                />
              </div>

              <button
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
    </div>
  )
}

export default News
