import * as Dialog from '@radix-ui/react-dialog';
import { X, Mail, Shield } from 'lucide-react';
import { useState } from 'react';
import { useTeamStore } from '../store/teamStore';
import { useToastStore } from '../store/toastStore';

interface TeamInviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TeamInviteDialog({ open, onOpenChange }: TeamInviteDialogProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'analyst' | 'viewer'>('viewer');
  const inviteTeamMember = useTeamStore(state => state.inviteTeamMember);
  const showToast = useToastStore(state => state.showToast);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await inviteTeamMember(email, role);
      showToast('Invitation sent successfully!', 'success');
      setEmail('');
      setRole('viewer');
      onOpenChange(false);
    } catch (error) {
      showToast('Error sending invitation', 'error');
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-xl">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Invite Team Member
          </Dialog.Title>
          
          <form onSubmit={handleInvite} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand"
                  placeholder="colleague@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'admin' | 'analyst' | 'viewer')}
                  className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand"
                >
                  <option value="admin">Admin</option>
                  <option value="analyst">Analyst</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {role === 'admin' 
                  ? 'Full access to all features and team management'
                  : role === 'analyst'
                  ? 'Can analyze properties and create reports'
                  : 'Can view reports and analyses'}
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-600"
              >
                Send Invitation
              </button>
            </div>
          </form>

          <Dialog.Close className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}