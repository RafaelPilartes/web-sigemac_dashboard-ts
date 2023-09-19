import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MdOutlineMedicalServices,
  MdOutlineFolderSpecial
} from 'react-icons/md'
import { FaUserDoctor } from 'react-icons/fa6'
import { GiMedicalDrip } from 'react-icons/gi'
import { BsBookmarkPlus, BsJournalMedical } from 'react-icons/bs'
import { LayoutDashboard, Lock, MessageSquare, User } from 'lucide-react'
import AccordionSidBar from '../accordion/AccordionSidBar'
import { routsNameMain } from '../../data/routsName'
import { AppContext } from '../../provider/AppProvider'

export const Slide = () => {
  const navigate = useNavigate()
  const { menuIsVisible } = useContext(AppContext)

  const dash = [
    {
      label: 'Painel',
      icon: <LayoutDashboard size={18} />,
      to: routsNameMain.home,
      notification: 0,
      accordion: false
    },
    {
      label: 'Administradores',
      icon: <Lock className="text-xs" size={18} />,
      to: routsNameMain.admins,

      notification: 0,
      accordion: false
    },
    {
      label: 'Usuários',
      icon: <User className="text-xs" size={18} />,
      to: routsNameMain.users,

      notification: 0,
      accordion: false
    },
    {
      label: 'Serviços',
      icon: <MdOutlineMedicalServices className="text-xs" size={18} />,
      to: routsNameMain.services,

      // subMenus: [
      //   {
      //     label: 'statistic',
      //     icon: <LayoutDashboard size={18} />,
      //     to: routsNameMain.home,
      //     notification: 0
      //   }
      // ],

      notification: 0,
      accordion: false
    },
    {
      label: 'Especialidades',
      icon: <MdOutlineFolderSpecial className="text-xs" size={18} />,
      to: routsNameMain.specialty,

      notification: 0,
      accordion: false
    },
    {
      label: 'Especialistas',
      icon: <FaUserDoctor className="text-xs" size={18} />,
      to: routsNameMain.experts,

      notification: 0,
      accordion: false
    },
    {
      label: 'Paciente',
      icon: <GiMedicalDrip className="text-xs" size={18} />,
      to: routsNameMain.patient,

      notification: 0,
      accordion: false
    },
    {
      label: 'Marcações',
      icon: <BsBookmarkPlus className="text-xs" size={18} />,
      to: routsNameMain.markings,

      notification: 0,
      accordion: false
    },
    {
      label: 'Consultas',
      icon: <BsJournalMedical className="text-xs" size={18} />,
      to: routsNameMain.queries,

      notification: 0,
      accordion: false
    },
    {
      label: 'Mensagens',
      icon: <MessageSquare className="text-xs" size={18} />,
      to: routsNameMain.messages,

      notification: 0,
      accordion: false
    }
  ]

  const mapLinks = dash.map((item, index) => {
    return (
      <>
        {item.accordion && <AccordionSidBar items={item} />}
        {!item.accordion && (
          <a
            href={item.to}
            className="w-full py-2 px-3 flex items-center justify-between gap-2 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-md transition-all duration-200 hover:pl-3  "
          >
            <div className="flex flex-row items-center justify-start gap-3 ">
              {item.icon}
              <span
                className={`${!menuIsVisible && 'hidden'} group-hover:flex`}
              >
                {item.label}
              </span>
            </div>

            {item.notification != 0 && (
              <span className="w-6 h-6 text-black text-xs p-2 flex flex-row items-center justify-center rounded-full bg-blue-200">
                {item.notification}
              </span>
            )}
          </a>
        )}
      </>
    )
  })

  return (
    <>
      <nav
        className={`fixed z-10 left-0 h-screen group w-64 ${
          menuIsVisible ? 'w-64' : 'w-[3.6rem] '
        } overflow-auto transition-all duration-300 hover:w-64 `}
      >
        {/* Container */}
        <div
          className={`w-full h-full py-4 bg-light dark:bg-dark flex flex-col items-start justify-start gap-1 shadow-3xl border-r-[1px] border-gray-200 dark:border-gray-600 transition-all duration-300 
          ${menuIsVisible ? 'px-3' : 'px-2'}
           `}
        >
          {/* SLinkContainer */}
          {mapLinks}
        </div>
      </nav>
    </>
  )
}
