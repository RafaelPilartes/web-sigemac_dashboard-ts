// LIBS
import swal from 'sweetalert'

import { routsNameMain } from '../../data/routsName'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { InputWithButton } from '../../components/input/InputWithButton'
import { IoSearchSharp } from 'react-icons/io5'
import { FileDown, Plus } from 'lucide-react'
import { useState } from 'react'
import { ModalEditAdmin } from '../../components/modal/admin/ModalEditAdmin'
import { TableRow } from '../../components/table/TableRowUser'
import { SelectCustom } from '../../components/selects/SelectCustom'
import { ModalCreateAdmin } from '../../components/modal/admin/ModalCreateAdmin'

function Users() {
  const [modalEditRowIsOpen, setModalEditRowIsOpen] = useState<boolean>(false)
  const [modalCreateRowIsOpen, setModalCreateRowIsOpen] =
    useState<boolean>(false)
  const [rowSelect, setRowSelect] = useState<any | null>(null)
  const [selectedValue, setSelectedValue] = useState('8')

  const itemsBreadcrumbs = [
    { label: 'Inicio', to: routsNameMain.home },
    { label: 'Usuario', to: routsNameMain.admins },
    { label: 'Listagem' }
  ]
  const tableData = [
    {
      id: '1',
      photo:
        'https://veja.abril.com.br/wp-content/uploads/2016/06/alx_michael-b-jordan_original.gif?w=620&h=349&crop=1',
      first_name: 'Rafael de Lima',
      last_name: 'Pilartes da Silva',
      email: 'rafaelpilartes.rlps@gmail.com',
      phone: '923414621',
      permission: 'admin',
      status: 'Suspensa',
      date: '12/09/2023'
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
          Usuários
        </h1>

        <div className="w-full flex flex-row items-center justify-between gap-2 ">
          <div className="flex flex-row items-center justify-between gap-4">
            <button
              onClick={openModalCreateRow}
              className="py-2 px-4 rounded-lg bg-primary-200 text-white hover:bg-primary-500 active:bg-primary-700 flex flex-row items-center justify-center gap-4 transition-all duration-300 "
            >
              <Plus />
              Adicionar usuário
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
          Listagem Usuários
        </h1>

        <div className="relative w-full overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-sm font-thin bg-gray-300/40 dark:bg-gray-500/40 ">
              <tr className="border-b dark:border-gray-700">
                <th scope="col" className="px-3 py-3 w-[0rem] ">
                  Id
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                  Nome
                </th>

                <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                  Número
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                  Conta
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                  Registo
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
              Usuários
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
        <ModalCreateAdmin
          handleUpdateListing={handleUpdateListing}
          modalCreateRowIsOpen={modalCreateRowIsOpen}
          setModalCreateRowIsOpen={setModalCreateRowIsOpen}
        />
      )}
      {modalEditRowIsOpen && (
        <ModalEditAdmin
          baseInfo={rowSelect}
          handleUpdateListing={handleUpdateListing}
          modalEditRowIsOpen={modalEditRowIsOpen}
          setModalEditRowIsOpen={setModalEditRowIsOpen}
        />
      )}
    </div>
  )
}

export default Users
