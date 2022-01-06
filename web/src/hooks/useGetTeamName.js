import { useTeams } from './useTeams';

export const useGetTeamName = (teamId) => {
  const teamsQuery = useTeams();
  if (!teamsQuery.isLoading) {
    const team = teamsQuery.data.find((t) => teamId.includes(t.id));
    return team.name;
  }
};
