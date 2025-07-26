// components/ui/CopyableField.tsx
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "./button";

interface CopyableFieldProps {
  label: string;
  value: string;
  className?: string;
  valueClassName?: string;
}

export function CopyableField({ label, value, className = "", valueClassName = "" }: CopyableFieldProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={`group ${className}`}>
      <label className="text-sm font-medium text-gray-500 block mb-1">{label}</label>
      <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 group-hover:bg-gray-100 transition-colors">
        <p className={`text-gray-900 font-medium flex-1 ${valueClassName}`}>{value}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          )}
        </Button>
      </div>
    </div>
  );
}