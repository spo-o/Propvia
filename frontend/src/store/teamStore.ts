import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface TeamMember {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'analyst' | 'viewer';
  status: 'pending' | 'active';
  invitedAt: Date;
  acceptedAt?: Date;
}

interface TeamState {
  members: TeamMember[];
  inviteTeamMember: (email: string, role: TeamMember['role']) => Promise<void>;
  acceptInvitation: (email: string) => Promise<void>;
  removeTeamMember: (id: string) => Promise<void>;
  updateTeamMemberRole: (id: string, role: TeamMember['role']) => Promise<void>;
}

export const useTeamStore = create<TeamState>()(
  persist(
    (set) => ({
      members: [],
      inviteTeamMember: async (email, role) => {
        try {
          // Generate a unique token for the invitation
          const token = nanoid();
          
          // Store invitation in Supabase
          const { error } = await supabase // Backend Logic Found: NEEDS TO BE REFACTORED
            .from('invitations')
            .insert({
              email,
              role,
              token,
              expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
            });

          if (error) throw error;

          // Send invitation email (in a real app, this would be handled by a server)
          const inviteUrl = `${window.location.origin}/signup?token=${token}`; // Backend Logic Found: NEEDS TO BE REFACTORED
          console.log('Invitation URL:', inviteUrl);

          // Update local state
          set((state) => ({
            members: [...state.members, {
              id: nanoid(),
              email,
              role,
              status: 'pending',
              invitedAt: new Date()
            }]
          }));
        } catch (error) {
          console.error('Error inviting team member:', error);
          throw error;
        }
      },
      acceptInvitation: async (email) => {
        try {
          // Update member status in Supabase
          const { error } = await supabase // Backend Logic Found: NEEDS TO BE REFACTORED
            .from('team_members')
            .update({ status: 'active', accepted_at: new Date() })
            .eq('email', email);

          if (error) throw error;

          // Update local state
          set((state) => ({
            members: state.members.map(member =>
              member.email === email
                ? { ...member, status: 'active', acceptedAt: new Date() }
                : member
            )
          }));
        } catch (error) {
          console.error('Error accepting invitation:', error);
          throw error;
        }
      },
      removeTeamMember: async (id) => {
        try {
          // Remove member from Supabase
          const { error } = await supabase // Backend Logic Found: NEEDS TO BE REFACTORED
            .from('team_members')
            .delete()
            .eq('id', id);

          if (error) throw error;

          // Update local state
          set((state) => ({
            members: state.members.filter(member => member.id !== id)
          }));
        } catch (error) {
          console.error('Error removing team member:', error);
          throw error;
        }
      },
      updateTeamMemberRole: async (id, role) => {
        try {
          // Update role in Supabase
          const { error } = await supabase // Backend Logic Found: NEEDS TO BE REFACTORED
            .from('team_members')
            .update({ role })
            .eq('id', id);

          if (error) throw error;

          // Update local state
          set((state) => ({
            members: state.members.map(member =>
              member.id === id ? { ...member, role } : member
            )
          }));
        } catch (error) {
          console.error('Error updating team member role:', error);
          throw error;
        }
      }
    }),
    {
      name: 'team-storage'
    }
  )
);