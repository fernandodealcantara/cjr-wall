import React from 'react'

export default function DepartmentsRadioInput({ onChange, value }) {
  const departments = ['NDP', 'NUT', 'NAV', 'NOE', 'NIP']

  return (
    <ul className="flex flex-wrap justify-center gap-2 list-none">
      {departments.map((department) => (
        <li key={department}>
          <input
            type="radio"
            id={department}
            name="department"
            value={department}
            className="hidden peer"
            required
            onChange={onChange}
            checked={value === department}
          />
          <label
            htmlFor={department}
            className={`p-1 font-thin text-black bg-white rounded-lg  cursor-pointer hover:bg-gray-100
            dark:peer-checked:text-white dark:peer-checked:bg-gray-700
            peer-checked:text-white peer-checked:bg-gray-700
            `}
          >
            {department === 'NAV' ? 'BOPE' : department}
          </label>
        </li>
      ))}
    </ul>
  )
}