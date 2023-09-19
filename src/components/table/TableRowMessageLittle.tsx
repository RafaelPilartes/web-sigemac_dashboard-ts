import { motion } from 'framer-motion'
import { MessageInterface } from '../../interfaces/IMessage'

interface TableRowMessageProps {
  rowItem: MessageInterface
  handleDeleteRow: (action: string) => void
  openModalSeeRow: (action: any) => void
  openModalEditRow: (action: any) => void
}

export function TableRowMessageLittle({ rowItem }: TableRowMessageProps) {
  return (
    <motion.tr
      // initial={{ opacity: 0, y: -50 }}
      // animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0, y: -50 }}
      className="border-b dark:border-gray-700 hover:bg-gray-100/40 dark:hover:bg-gray-700/40 transition-all duration-300 cursor-pointer"
    >
      <td className="px-3 py-3 min-w-[6rem]">
        <p className="flex flex-row justify-start items-center">
          {rowItem.name}
        </p>
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <p className="flex flex-row justify-start items-center">
          {rowItem.email}
        </p>
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <p className="flex flex-row justify-start items-center">
          {rowItem.subject}
        </p>
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <p className="flex flex-row justify-start items-center">
          {rowItem.date_create}
        </p>
      </td>
    </motion.tr>
  )
}
