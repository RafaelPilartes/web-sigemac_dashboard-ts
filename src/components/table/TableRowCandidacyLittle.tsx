import { motion } from 'framer-motion'

interface TableRowProps {
  rowItem: any
  handleDeleteRow: (action: string) => void
  openModalSeeRow: (action: any) => void
  openModalEditRow: (action: any) => void
}

export function TableRowCandidacyLittle({ rowItem }: TableRowProps) {
  return (
    <motion.tr
      // initial={{ opacity: 0, y: -50 }}
      // animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0, y: -50 }}
      className="border-b dark:border-gray-700 hover:bg-gray-100/40 dark:hover:bg-gray-700/40 transition-all duration-300 cursor-pointer"
    >
      <td className="px-3 py-3 min-w-[6rem]">
        <div className="flex flex-row justify-start items-center gap-2">
          <div className="relative w-9 h-9 overflow-hidden">
            <img
              className="w-full h-full object-cover rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
              src={rowItem.photo}
              alt="Rafael"
            />
          </div>
          <div className="flex flex-col justify-center items-start">
            <span className="text-dark dark:text-light font-semibold text-sm">
              {rowItem.first_name + ' ' + rowItem.last_name}
            </span>
            <span className="text-xs">{rowItem.email}</span>
          </div>
        </div>
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <p className="flex flex-row justify-start items-center">
          {rowItem.phone}
        </p>
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <p className="flex flex-row justify-start items-center">
          {rowItem.province}
        </p>
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <p className="flex flex-row justify-start items-center">
          {rowItem.type_candidacy}
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
