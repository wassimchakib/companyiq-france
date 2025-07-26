import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import type { ExportField } from "../constants/ExportFields";

export type ExportModalProps = {
  isOpen: boolean;
  onClose: () => void;
  company: Record<string, any>;
  /** tous les champs disponibles pour l’export */
  fields: ExportField[];
  /**
   * callback quand on confirme l’export :
   * @param selectedKeys liste des clés cochées
   * @param format "csv" ou "json"
   */
  onConfirm: (selectedKeys: string[], format: "csv" | "json") => void;
};

export function ExportModal({
  isOpen,
  onClose,
  company,
  fields,
  onConfirm,
}: ExportModalProps) {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(fields.map((f) => f.key))
  );

  const toggle = (key: string) => {
    const next = new Set(selected);
    next.has(key) ? next.delete(key) : next.add(key);
    setSelected(next);
  };

  const handleDownload = (format: "csv" | "json") => {
    onConfirm(Array.from(selected), format);
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-200 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-150 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <Dialog.Title className="text-lg font-medium">
                Exporter les champs
              </Dialog.Title>

              <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                {fields.map((f) => (
                  <label key={f.key} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selected.has(f.key)}
                      onChange={() => toggle(f.key)}
                    />
                    <span>{f.label}</span>
                  </label>
                ))}
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleDownload("csv")}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Télécharger CSV
                </button>
                <button
                  onClick={() => handleDownload("json")}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Télécharger JSON
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
