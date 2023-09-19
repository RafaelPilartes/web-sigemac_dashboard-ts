interface BadgeSimpleProps {
  color: 'red' | 'blue' | 'green' | 'gray'
  label: string
}

export function BadgeSimple({ color, label }: BadgeSimpleProps) {
  return (
    <span
      className={`flex flex-row justify-center items-center py-2 px-3 text-xs font-medium rounded-md bg-${color}-200 text-${color}-600`}
    >
      {label}
    </span>
  )
}
