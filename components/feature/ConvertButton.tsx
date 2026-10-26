interface ConvertButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
}

export default function ConvertButton({
  onClick,
  disabled = false,
  label = "Convert",
}: ConvertButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 bg-black text-white text-sm hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {label}
    </button>
  );
}
