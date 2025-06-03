import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Download, Trash2, FileText } from 'lucide-react';
import { SavedScenario } from '../types';
import { format } from 'date-fns';

interface SavedScenariosDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scenarios: SavedScenario[];
  onExportPDF: (scenario: SavedScenario) => void;
  onDelete: (scenarioId: string) => void;
}

export default function SavedScenariosDialog({
  open,
  onOpenChange,
  scenarios,
  onExportPDF,
  onDelete,
}: SavedScenariosDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[150]" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-xl z-[200]">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Analysis Reports
          </Dialog.Title>
          
          <div className="overflow-auto max-h-[60vh]">
            {scenarios.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No analysis reports yet</p>
                <p className="text-sm text-gray-500 mt-2">
                  Analyze a property to generate reports and save analysis scenarios
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Property</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Analysis Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date Created</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {scenarios.map((scenario) => (
                    <tr key={scenario.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {scenario.property.address}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 capitalize">
                        {scenario.analysis.businessType}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {format(scenario.dateCreated, 'MMM d, yyyy')}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => onExportPDF(scenario)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                            title="Download PDF Report"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDelete(scenario.id)}
                            className="p-1 text-red-500 hover:text-red-700"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <Dialog.Close className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}