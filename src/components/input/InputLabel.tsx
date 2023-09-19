import React from 'react'
import { useForm, Controller } from 'react-hook-form'

interface CustomInputProps {
  control?: any // Controlador do react-hook-form
  error?: any // Erros do react-hook-form
  type: string
  htmlFor: string
  label: string
  placeholder: string
  required?: boolean
}

export function CustomInput({
  control,
  error,
  type,
  htmlFor,
  label,
  placeholder,
  required
}: CustomInputProps) {
  return (
    <>
      <div className="w-full">
        <label
          htmlFor={htmlFor}
          className="block mb-2 text-sm font-medium text-light"
        >
          {label}
        </label>
        <Controller
          name={htmlFor}
          control={control}
          rules={{ required: 'Por favor, preencha este campo!' }}
          render={({ field }) => (
            <input
              type={type}
              id={htmlFor}
              {...field}
              className={`w-full p-2.5 bg-gray-700/60 border border-gray-500/60 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block`}
              placeholder={placeholder}
              required={required}
            />
          )}
        />

        {error && (
          <span className="errorMessage py-1 text-red-600 text-xs font-medium ">
            {error.message}
          </span>
        )}
      </div>
    </>
  )
}
