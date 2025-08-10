import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import {
  inviteTeamMember as apiInviteTeamMember,
  acceptInvitation as apiAcceptInvitation,
  removeTeamMember as apiRemoveTeamMember,
  updateTeamMemberRole as apiUpdateTeamMemberRole,
} from '../api/team';

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
          const response = await apiInviteTeamMember(email, role);
          console.log('Invitation URL:', response.inviteUrl);

          set((state) => ({
            members: [
              ...state.members,
              {
                id: nanoid(),
                email,
                role,
                status: 'pending',
                invitedAt: new Date(),
              },
            ],
          }));
        } catch (error) {
          console.error('Error inviting team member:', error);
          throw error;
        }
      },
      acceptInvitation: async (email) => {
        try {
          await apiAcceptInvitation(email);

          set((state) => ({
            members: state.members.map((member) =>
              member.email === email
                ? { ...member, status: 'active', acceptedAt: new Date() }
                : member
            ),
          }));
        } catch (error) {
          console.error('Error accepting invitation:', error);
          throw error;
        }
      },
      removeTeamMember: async (id) => {
        try {
          await apiRemoveTeamMember(id);

          set((state) => ({
            members: state.members.filter((member) => member.id !== id),
          }));
        } catch (error) {
          console.error('Error removing team member:', error);
          throw error;
        }
      },
      updateTeamMemberRole: async (id, role) => {
        try {
          await apiUpdateTeamMemberRole(id, role);

          set((state) => ({
            members: state.members.map((member) =>
              member.id === id ? { ...member, role } : member
            ),
          }));
        } catch (error) {
          console.error('Error updating role:', error);
          throw error;
        }
      },
    }),
    {
      name: 'team-storage',
    }
  )
);
