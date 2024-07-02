import React from 'react'

import searchIcon from '../assets/searchIcon.svg'

import { cn } from '../lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const separatePaddingClasses = (className: string | undefined) => {
  const inputClassesPrefixes = [
    'p-',
    'px-',
    'py-',
    'pl-',
    'pr-',
    'pt-',
    'pb-',
    'placeholder:',
  ]
  const bothElementsClassesPrefixes = ['bg-']

  const allClasses = className ? className.split(' ') : []

  const bothElementsClasses = allClasses.filter((currentClass) =>
    bothElementsClassesPrefixes.some((prefix) =>
      currentClass.startsWith(prefix),
    ),
  )

  const inputClasses = allClasses.filter((currentClass) =>
    inputClassesPrefixes.some((prefix) => currentClass.startsWith(prefix)),
  )

  const otherClasses = allClasses.filter(
    (currentClass) =>
      !inputClassesPrefixes.some((prefix) => currentClass.startsWith(prefix)),
  )

  return {
    inputClasses: [...inputClasses, ...bothElementsClasses].join(' '),
    otherClasses: [...otherClasses, ...bothElementsClasses].join(' '),
  }
}

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, ...props }, ref) => {
    const { inputClasses, otherClasses } = separatePaddingClasses(className)

    return (
      <div
        className={cn(
          'relative flex rounded-lg border border-input bg-transparent pr-3 text-sm text-input shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-input-placeholder focus-within:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          otherClasses,
        )}
      >
    <img src={searchIcon} className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform text-primary" />
        <input
          type="text"
          placeholder={placeholder}
          className={cn(
            'w-full rounded-bl-lg rounded-tl-lg border-0 py-2.5 pl-[50px] text-black outline-none',
            inputClasses,
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)

SearchInput.displayName = 'Search'

export { SearchInput }