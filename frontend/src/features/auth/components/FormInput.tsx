type Props = {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
};

export default function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}: Props) {
  return (
    <div className="space-y-2 mb-5">
      {label && <label className="text-sm text-gray-300">{label}</label>}

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-5 py-4 rounded-xl bg-transparent border border-gray-600 
                   focus:outline-none focus:border-blue-500 text-white"
      />
    </div>
  );
}