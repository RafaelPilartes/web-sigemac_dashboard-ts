import React from 'react'
import { Eye } from 'lucide-react'
import { FiEdit } from 'react-icons/fi'
import { AiFillDelete } from 'react-icons/ai'
import { BadgeAction } from '../badge/BadgeAction'
import { BadgeSimple } from '../badge/BadgeSimple'

interface TableRowProps {
  rowItem: {
    id: string
    name_permission: string
    code_permission: string
  }
  handleDeleteRow: (action: string) => void
  openModalEditRow: (action: any) => void
}

export const TableRow: React.FC<TableRowProps> = ({
  rowItem,
  openModalEditRow,
  handleDeleteRow
}) => {
  return (
    <tr className="border-b dark:border-gray-700 hover:bg-gray-100/40 dark:hover:bg-gray-700/40 transition-all duration-300 cursor-pointer">
      <td className="px-3 py-3 min-w-[6rem]">
        <p className="flex flex-row justify-start items-center">#10</p>
      </td>

      <td className="px-3 py-3 min-w-[6rem]">
        <p className="flex flex-row justify-start items-center">
          {rowItem.name_permission}
        </p>
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <div className="flex">
          <BadgeSimple color="blue" label={rowItem.code_permission} />
        </div>
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <div className="flex flex-row justify-start items-center gap-4">
          <BadgeAction
            color="green"
            icon={FiEdit}
            onclickBtn={() => openModalEditRow(rowItem)}
          />

          <BadgeAction
            color="red"
            icon={AiFillDelete}
            onclickBtn={() => handleDeleteRow(rowItem.id)}
          />
        </div>
      </td>
    </tr>
  )
}
