export default function UrlInput({ Icon, name, labelText, placeholder, onChange, value, ...props }) {
  return (
    <div className="mb-1 max-w-[15rem]">
      <label
        htmlFor={name}
        className="mb-1 text-gray-300 flex items-center gap-1"
      >
       {Icon && <Icon />} {labelText}
      </label>
      <input
        onChange={onChange}
        value={value}
        type="url"
        className="
            block
            w-full
            px-3
            py-1.5
            text-base
            font-light
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id={name}
        name={name}
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
}