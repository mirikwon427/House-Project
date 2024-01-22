export default function CInput({
  value,
  onChange,
  placeholder,
  type,
  children,
}) {
  return (
    <div className="w-full h-10 flex gap-2 rounded-md border border-gray-400 px-4">
      <input
        className="flex-1 h-full border-none text-sm focus:outline-none"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <div className="w-6 h-full flex flex-col justify-center">{children}</div>
    </div>
  );
}
