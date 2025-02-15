import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

export default function ExportButton({ content, type }) {
  const handleExport = async () => {
    // Implement PDF/markdown export logic
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
    >
      <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
      Export as {type}
    </button>
  );
} 