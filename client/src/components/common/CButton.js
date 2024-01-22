export default function CButton({ title, onClick }) {
  return (
    <button
      className="bg-black text-white rounded-md px-4 py-2 hover:bg-gray-800"
      onClick={onClick}
    >
      {title}
    </button>
  );
}
