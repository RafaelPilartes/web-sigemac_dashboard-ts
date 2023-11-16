import React from 'react'
import { FiEdit } from 'react-icons/fi'
import { AiFillDelete } from 'react-icons/ai'
import { BadgeAction } from '../badge/BadgeAction'
import { CategoryInterface } from '../../interfaces/category'
import { BadgeSimple } from '../badge/BadgeSimple'

interface TableRowProps {
  rowItem: CategoryInterface
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
      <td className="px-3 py-3 min-w-[6rem]">
        <p className="flex flex-row justify-start items-center">{rowItem.id}</p>
      </td>

      <td className="px-3 py-3 min-w-[6rem]">
        <div className="flex flex-row justify-start items-center gap-2">
          <div className="relative w-9 h-9 overflow-hidden">
            <img
              className="w-full h-full object-cover rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
              src={rowItem.image}
              alt="Rafael"
            />
          </div>
          <div className="flex flex-col justify-center items-start">
            <span className="text-dark dark:text-light font-semibold text-sm">
              {rowItem.category}
            </span>
          </div>
        </div>
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <div className="flex">
          <BadgeSimple color="blue" label={rowItem.code} />
        </div>
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <div className="flex">
          <BadgeSimple color="black" bg={rowItem.color} label={rowItem.color} />
        </div>
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <p className="flex flex-row justify-start items-center">
          {rowItem.date_create}
        </p>
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <p className="flex flex-row justify-start items-center">
          {rowItem.date_update}
        </p>
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
