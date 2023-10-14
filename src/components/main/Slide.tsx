import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiNews } from 'react-icons/bi'
import {
  Download,
  Layers,
  LayoutDashboard,
  Lock,
  LucideFileVideo2,
  MailWarning,
  Mailbox,
  MessageSquare,
  Newspaper,
  Podcast,
  Tag,
  User
} from 'lucide-react'
import AccordionSidBar from '../accordion/AccordionSidBar'
import { routsNameMain } from '../../data/routsName'
import { AppContext } from '../../provider/AppProvider'
import { LiaAdversal } from 'react-icons/lia'
import { PiFolderUserBold } from 'react-icons/pi'

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
      label: 'Admin',
      icon: <Lock className="text-xs" size={18} />,
      to: routsNameMain.admins,

      subMenus: [
        {
          label: 'Administradores',
          icon: <LayoutDashboard size={18} />,
          to: routsNameMain.admins,
          notification: 0
        },
        {
          label: 'Permissões',
          icon: <LayoutDashboard size={18} />,
          to: routsNameMain.permissions,
          notification: 0
        }
      ],

      notification: 0,
      accordion: true
    },
    {
      label: 'Usuários',
      icon: <User className="text-xs" size={18} />,
      to: routsNameMain.users,

      notification: 0,
      accordion: false
    },
    {
      label: 'Noticias',
      icon: <BiNews className="text-xs" size={18} />,
      to: routsNameMain.news,

      notification: 0,
      accordion: false
    },
    {
      label: 'Categorias',
      icon: <Layers className="text-xs" size={18} />,
      to: routsNameMain.categories,

      notification: 0,
      accordion: false
    },
    {
      label: 'Tags',
      icon: <Tag className="text-xs" size={18} />,
      to: routsNameMain.tags,

      notification: 0,
      accordion: false
    },
    {
      label: 'Autores',
      icon: <PiFolderUserBold className="text-xs" size={18} />,
      to: routsNameMain.authors,

      notification: 0,
      accordion: false
    },
    {
      label: 'Publicidades',
      icon: <LiaAdversal className="text-xs" size={18} />,
      to: routsNameMain.advertising,

      notification: 0,
      accordion: false
    },
    {
      label: 'Videos',
      icon: <LucideFileVideo2 className="text-xs" size={18} />,
      to: routsNameMain.videos,

      notification: 0,
      accordion: false
    },
    {
      label: 'Podcast',
      icon: <Podcast className="text-xs" size={18} />,
      to: routsNameMain.podcast,

      notification: 0,
      accordion: false
    },
    {
      label: 'Jornais',
      icon: <Newspaper className="text-xs" size={18} />,
      to: routsNameMain.newspapers,

      notification: 0,
      accordion: false
    },
    {
      label: 'Comentários',
      icon: <MessageSquare className="text-xs" size={18} />,
      to: routsNameMain.comments,

      notification: 0,
      accordion: false
    },
    {
      label: 'Mensagens',
      icon: <Mailbox className="text-xs" size={18} />,
      to: routsNameMain.messages,

      notification: 0,
      accordion: false
    },
    {
      label: 'Newsletter',
      icon: <MailWarning className="text-xs" size={18} />,
      to: routsNameMain.newsletter,

      notification: 0,
      accordion: false
    },
    {
      label: 'Permissão de download',
      icon: <Download className="text-xs" size={18} />,
      to: routsNameMain.download_permissions,

      notification: 0,
      accordion: false
    }
  ]

  const mapLinks = dash.map((item, index) => {
    return (
      <>
        {item.accordion && <AccordionSidBar items={item} />}
        {!item.accordion && (
          <Link
            to={item.to}
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
          </Link>
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
