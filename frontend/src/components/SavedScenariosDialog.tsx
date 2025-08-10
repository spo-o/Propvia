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
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[900px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white shadow-2xl z-[200] border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <Dialog.Title className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              Analysis Reports
            </Dialog.Title>
            <p className="text-sm text-gray-500 mt-1">Manage your property analysis reports</p>
          </div>
          
          <div className="overflow-auto max-h-[65vh] p-6">
            {scenarios.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No analysis reports yet</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  Analyze a property to generate detailed reports and save analysis scenarios for future reference
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Property</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Analysis Type</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date Created</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {scenarios.map((scenario) => (
                      <tr key={scenario.id} className="hover:bg-blue-50/30 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900 text-sm">
                            {scenario.property.address}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                            {scenario.analysis.businessType}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {format(scenario.dateCreated, 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => onExportPDF(scenario)}
                              className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700 transition-colors duration-150"
                              title="Download PDF Report"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onDelete(scenario.id)}
                              className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 transition-colors duration-150"
                              title="Delete Report"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <Dialog.Close className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-150">
            <X className="w-5 h-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}