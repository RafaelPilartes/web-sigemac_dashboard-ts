interface BadgeSimpleProps {
  color: 'red' | 'blue' | 'green' | 'gray'
  label: string
}

export function BadgeSimple({ color, label }: BadgeSimpleProps) {
  let colorBadge

  switch (color) {
    case 'red':
      colorBadge = 'bg-red-200 text-red-600'
      break
    case 'blue':
      colorBadge = 'bg-blue-200 text-blue-600'
      break
    case 'green':
      colorBadge = 'bg-green-200 text-green-600'
      break
    case 'gray':
      colorBadge = 'bg-gray-200 text-gray-600'
      break

    default:
      break
  }
  return (
    <span
      className={`flex flex-row justify-center items-center py-2 px-3 text-xs font-medium rounded-md ${colorBadge}`}
    >
      {label}
    </span>
  )
}
