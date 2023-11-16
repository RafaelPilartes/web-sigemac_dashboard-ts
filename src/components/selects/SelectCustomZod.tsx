import { Controller } from 'react-hook-form'
import { OptionType } from '../../types/option'

interface SelectCustomZodProps {
  control?: any // Controlador do react-hook-form
  error?: any // Erros do react-hook-form
  isDisabled?: boolean // Erros do react-hook-form
  name: string
  label?: string
  options: OptionType[]
  onOptionChange: (gender: string) => void
}

export function SelectCustomZod({
  control,
  error,
  isDisabled = false,
  name,
  label,
  options,
  onOptionChange,
  ...inputProps
}: SelectCustomZodProps) {
  return (
    <>
      <div className="w-full">
        {label && (
          <label
            htmlFor={name}
            className="block mb-2 text-sm font-medium text-light"
          >
            {label}
          </label>
        )}

        <Controller
          name={name}
          disabled={isDisabled}
          control={control}
          defaultValue=""
          rules={{ required: 'Por favor, preencha este campo!' }}
          render={({ field }) => (
            <select
              {...field}
              {...inputProps}
              id="countries"
              className={`p-2.5 text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-300`}
            >
              <option value="">Selecione uma opção</option>
              {options?.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        />

        {error && (
          <span className="errorMessage py-1 text-red-600 text-xs">
            {error.message}
          </span>
        )}
      </div>
    </>
  )
}
