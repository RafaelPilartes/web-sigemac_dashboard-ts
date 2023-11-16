import React, { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import { FiEdit } from 'react-icons/fi'
import { AiFillDelete } from 'react-icons/ai'
import { BadgeAction } from '../badge/BadgeAction'
import { BadgeSimple } from '../badge/BadgeSimple'
import { OpinionInterface } from '../../interfaces/opinion'
import { showToastRight } from '../../utils/toasts'
import { AuthorViewModel } from '../../viewModel/authorViewModel'
import { AuthorInterface } from '../../interfaces/author'
import { CategoryInterface } from '../../interfaces/category'
import { CategoryViewModel } from '../../viewModel/CategoryViewModel'

interface TableRowProps {
  rowItem: OpinionInterface
  openModalSeeRow: (action: any) => void
  handleDeleteRow: (action: any) => void
  openModalEditRow: (action: any) => void
}

export const TableRow: React.FC<TableRowProps> = ({
  rowItem,
  openModalSeeRow,
  openModalEditRow,
  handleDeleteRow
}) => {
  const [rowsAuthorData, setRowsAuthorData] = useState<AuthorInterface | null>(
    null
  )
  const [rowsCategoryData, setRowsCategoryData] =
    useState<CategoryInterface | null>(null)
  const authorViewModel = new AuthorViewModel()
  const categoryViewModel = new CategoryViewModel()

  // Get author data
  function fetchAuthorData() {
    // Clear
    setRowsAuthorData(null)

    // Get
    authorViewModel
      .getAuthorData(rowItem.author_id as string)
      .then(response => {
        if (response.data.error) {
          showToastRight('error', response.data.msg as string)
        } else {
          const arrayData = response.data as unknown as AuthorInterface

          const listData = arrayData

          setRowsAuthorData(listData as AuthorInterface)
        }
      })
  }

  // Get Category data
  function fetchCategoryData() {
    // Clear
    setRowsCategoryData(null)

    // Get
    categoryViewModel
      .getCategoryData(rowItem.category_id as string)
      .then(response => {
        console.log('response ->', response)
        if (response.data.error) {
          showToastRight('error', response.data.msg as string)
        } else {
          const arrayData = response.data as unknown as CategoryInterface

          const listData = arrayData

          setRowsCategoryData(listData as CategoryInterface)
        }
      })
  }

  useEffect(() => {
    fetchAuthorData()
    fetchCategoryData()
  }, [])
  return (
    <tr className="border-b dark:border-gray-700 hover:bg-gray-100/40 dark:hover:bg-gray-700/40 transition-all duration-300 cursor-pointer">
      <td className="px-3 py-3 min-w-[7rem]">
        <p className="flex flex-row justify-start items-center">{rowItem.id}</p>
      </td>
      <td className="px-3 py-3 min-w-[7rem]">
        <div className="relative w-12 h-12 overflow-hidden">
          <img
            className="w-full h-full object-cover rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
            src={rowItem.cover}
            alt="Rafael"
          />
        </div>
      </td>
      <td className="px-3 py-3 min-w-[7rem]">
        <p className="max-w-[18rem] line-clamp-2 ">{rowItem.title}</p>
      </td>
      <td className="px-3 py-3 min-w-[7rem]">
        <p className="max-w-[18rem] line-clamp-2 ">{rowItem.description}</p>
      </td>
      <td className="px-3 py-3 min-w-[7rem]">
        <p className="flex flex-row justify-start items-center">
          {rowsAuthorData?.name}
        </p>
      </td>
      <td className="px-3 py-3 min-w-[7rem]">
        <div className="flex">
          <BadgeSimple
            color="black"
            bg={rowsCategoryData?.color}
            label={rowsCategoryData?.category as string}
          />
        </div>
      </td>
      <td className="px-3 py-3 min-w-[7rem]">
        <p className="flex flex-row justify-start items-center">
          {rowItem.date_update ? rowItem.date_update : rowItem.date_create}
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
            onclickBtn={() => openModalSeeRow(rowItem)}
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
