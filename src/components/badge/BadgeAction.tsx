import { ElementType } from 'react'

interface BadgeActionProps {
  onclickBtn?: () => void
  icon?: ElementType
  label?: string
  color: 'red' | 'blue' | 'green' | 'gray'
}

export function BadgeAction({
  icon: Icon,
  onclickBtn,
  label,
  color
}: BadgeActionProps) {
  let colorBadge

  switch (color) {
    case 'red':
      colorBadge = 'bg-red-200 text-red-600 hover:bg-red-400 active:bg-red-400'
      break
    case 'blue':
      colorBadge =
        'bg-blue-200 text-blue-600 hover:bg-blue-400 active:bg-blue-400'
      break
    case 'green':
      colorBadge =
        'bg-green-200 text-green-600 hover:bg-green-400 active:bg-green-400'
      break
    case 'gray':
      colorBadge =
        'bg-gray-200 text-gray-600 hover:bg-gray-400 active:bg-gray-400'
      break

    default:
      break
  }

  return (
    <button
      onClick={onclickBtn}
      className={`flex flex-row justify-center items-center py-2 px-2 text-xs font-medium rounded-md ${colorBadge} transition-all duration-300`}
    >
      {Icon && <Icon size={18} />}
      {label && label}
    </button>
  )
}
