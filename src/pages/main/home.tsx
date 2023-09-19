import { useEffect, useState } from 'react'

import {
  Users,
  CarTaxiFront,
  MessagesSquare,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import { TableRowCandidacyLittle } from '../../components/table/TableRowCandidacyLittle'
import { TableRowMessageLittle } from '../../components/table/TableRowMessageLittle'
import { BsBookmarkPlus, BsJournalMedical } from 'react-icons/bs'
import { GiMedicalDrip } from 'react-icons/gi'
import { routsNameMain } from '../../data/routsName'
import { Breadcrumbs } from '../../components/Breadcrumbs'

function Home() {
  const [rowsDataUser, setRowsDataUser] = useState<any[] | null>(null)
  const [rowsDataCandidacy, setRowsDataCandidacy] = useState<any[] | null>(null)
  const [rowsDataMessage, setRowsDataMessage] = useState<any[] | null>(null)

  const itemsBreadcrumbs = [
    { label: 'Painel', to: routsNameMain.home },
    { label: 'Painel de administração' }
  ]

  const rowsTableCandidacy = rowsDataCandidacy?.map((item, index) => {
    return (
      <TableRowCandidacyLittle
        key={index}
        rowItem={item}
        openModalSeeRow={() => null} // Substitua pelo seu código real
        openModalEditRow={() => null} // Substitua pelo seu código real
        handleDeleteRow={() => null} // Substitua pelo seu código real
      />
    )
  })
  const rowsTableMessage = rowsDataMessage?.map((item, index) => {
    return (
      <TableRowMessageLittle
        key={index}
        rowItem={item}
        openModalSeeRow={() => null} // Substitua pelo seu código real
        openModalEditRow={() => null} // Substitua pelo seu código real
        handleDeleteRow={() => null} // Substitua pelo seu código real
      />
    )
  })

  function fetchDataUser(limit: string) {
    // Clear
    setRowsDataUser(null)

    // Get
  }
  function fetchDataCandidacy(limit: string) {
    // Clear
    setRowsDataCandidacy(null)

    // Get
  }
  function fetchDataMessage(limit: string) {
    // Clear
    setRowsDataMessage(null)

    // Get
  }

  useEffect(() => {
    fetchDataUser('6')
    fetchDataCandidacy('6')
    fetchDataMessage('6')
  }, [])

  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-6 overflow-x-hidden ">
      <Breadcrumbs items={itemsBreadcrumbs} />
      {/* Pacientes */}
      <div className="relative w-full flex flex-row justify-between items-start rounded-md bg-light dark:bg-dark shadow-3xl  ">
        <div className="w-full my-14 mx-6 flex flex-col justify-start items-start gap-2">
          <span className="text-2xl font-semibold ">
            Bom dia,{' '}
            <span className="text-primary-200 ">Sr. Rafael Pilartes</span>
          </span>
          <span className="font-normal text-base ">
            Tenha um bom dia no trabalho
          </span>
        </div>

        <div className="w-full h-full relative z-[1] max-w-s-840:hidden ">
          <img
            src="/illustration/morning-img-01.png"
            alt=""
            className="absolute bottom-0 right-40 z-[1] max-w-s-960:right-10 "
          />
        </div>

        <img
          src="/background/bg-home.png"
          alt=""
          className="absolute bottom-0 right-0 h-full "
        />
      </div>

      <div className="w-full grid grid-cols-3 gap-6">
        {/* Pacientes */}
        <div className="w-full p-6 flex flex-col justify-start items-start gap-3 rounded-md bg-light dark:bg-dark shadow-3xl ">
          <span className="text-blue-600 ">
            <GiMedicalDrip size={36} />
          </span>
          <span className="font-normal text-base ">Total de pacientes</span>
          <span className="text-3xl font-semibold ">
            {' 126 '}
            {rowsDataUser?.length}{' '}
          </span>
          <span className="text-xs flex flex-row items-center justify-center gap-[6px] ">
            <span className="text-green-500 font-medium flex flex-row items-center justify-center gap-1 ">
              <TrendingUp size={16} /> +2,5%
            </span>
            do que na semana passada
          </span>
        </div>

        {/* Marcações */}
        <div className="w-full p-6 flex flex-col justify-start items-start gap-3 rounded-md bg-light dark:bg-dark shadow-3xl ">
          <span className="text-green-500 ">
            <BsBookmarkPlus size={36} />
          </span>
          <span className="font-normal text-base ">Total de marcações</span>
          <span className="text-3xl font-semibold ">
            {' 46 '}
            {rowsDataCandidacy?.length}{' '}
          </span>
          <span className="text-xs flex flex-row items-center justify-center gap-[6px] ">
            <span className="text-red-400 font-medium flex flex-row items-center justify-center gap-1 ">
              <TrendingDown size={16} /> -1,4%
            </span>
            do que na semana passada
          </span>
        </div>

        {/* Consultas */}
        <div className="w-full p-6 flex flex-col justify-start items-start gap-3 rounded-md bg-light dark:bg-dark shadow-3xl ">
          <span className="text-yellow-400 ">
            <BsJournalMedical size={36} />
          </span>
          <span className="font-normal text-base ">Total de consultas</span>
          <span className="text-3xl font-semibold ">
            {' 17 '}
            {rowsDataMessage?.length}
          </span>
          <span className="text-xs flex flex-row items-center justify-center gap-[6px] ">
            <span className="text-green-500 font-medium flex flex-row items-center justify-center gap-1 ">
              <TrendingUp size={16} /> +2,8%
            </span>
            do que na semana passada
          </span>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-6">
        <div className="w-full p-6 flex flex-col justify-start items-start gap-6 rounded-md bg-light dark:bg-dark">
          <h1 className="text-xl font-bold text-dark dark:text-light ">
            Listagem marcações recentes
          </h1>

          <div className="relative w-full overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-sm font-thin bg-gray-300/40 dark:bg-gray-500/40 ">
                <tr className="border-b dark:border-gray-700">
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Nome
                  </th>
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Número
                  </th>
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Província
                  </th>
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Tipo de candidatura
                  </th>
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Data
                  </th>
                </tr>
              </thead>

              <tbody>{rowsTableCandidacy}</tbody>
            </table>
          </div>
        </div>

        <div className="w-full p-6 flex flex-col justify-start items-start gap-6 rounded-md bg-light dark:bg-dark">
          <h1 className="text-xl font-bold text-dark dark:text-light ">
            Proximas consultas
          </h1>

          <div className="relative w-full overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-sm font-thin bg-gray-300/40 dark:bg-gray-500/40 ">
                <tr className="border-b dark:border-gray-700">
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Nome
                  </th>

                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Assunto
                  </th>
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Data
                  </th>
                </tr>
              </thead>

              <tbody>{rowsTableMessage}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
