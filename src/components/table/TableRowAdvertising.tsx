import React from 'react'
import { Eye } from 'lucide-react'
import { FiEdit } from 'react-icons/fi'
import { AiFillDelete } from 'react-icons/ai'
import { BadgeAction } from '../badge/BadgeAction'
import { IAdvertising } from '../../interfaces/publicity'

interface TableRowProps {
  rowItem: IAdvertising
  handleDeleteRow: (action: any) => void
  openModalEditRow: (action: any) => void
}

export const TableRow: React.FC<TableRowProps> = ({
  rowItem,
  openModalEditRow,
  handleDeleteRow
}) => {
  return (
    <tr className="border-b dark:border-gray-700 hover:bg-gray-100/40 dark:hover:bg-gray-700/40 transition-all duration-300 cursor-pointer">
      <td className="px-3 py-3 min-w-[7rem]">
        <p className="flex flex-row justify-start items-center">{rowItem.id}</p>
      </td>
      <td className="px-3 py-3 min-w-[7rem]">
        <div className="relative w-12 h-12 overflow-hidden">
          <img
            className="w-full h-full object-cover rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
            src={rowItem.image_publicity}
            alt="Rafael"
          />
        </div>
      </td>
      <td className="px-3 py-3 min-w-[7rem]">
        <p className="max-w-[18rem] line-clamp-2 ">
          {rowItem.description_publicity}
        </p>
      </td>
      <td className="px-3 py-3 min-w-[7rem]">
        <p className="max-w-[18rem] line-clamp-2 ">{rowItem.link_publicity}</p>
      </td>
      <td className="px-3 py-3 min-w-[7rem]">
        <p className="flex flex-row justify-start items-center">
          {rowItem.local_publicity}
        </p>
      </td>
      <td className="px-3 py-3 min-w-[7rem]">
        <p className="flex flex-row justify-start items-center">
          {rowItem.date_create}
        </p>
      </td>
      <td className="px-3 py-3 min-w-[7rem]">
        <p className="flex flex-row justify-start items-center">
          {rowItem.date_expire}
        </p>
      </td>
      <td className="px-3 py-3 min-w-[7rem]">
        <div className="flex flex-row justify-start items-center gap-4">
          <BadgeAction
            color="green"
            icon={FiEdit}
            onclickBtn={() => openModalEditRow(rowItem)}
          />
          <BadgeAction
            color="blue"
            icon={Eye}
            onclickBtn={() => handleDeleteRow(rowItem.id)}
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
