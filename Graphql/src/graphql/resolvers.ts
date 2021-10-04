import authResolvers from '@components/auth/auth.resolver';
import userResolvers from '@components/user/user.resolver';

const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...userResolvers.Query,
  },

  Mutation: {
    ...authResolvers.Mutation,
    ...userResolvers.Mutation,
  },

  Mission: {
    // The default size is 'LARGE' if not provided
    missionPatch: (mission, { size } = { size: 'LARGE' }) => {
      return size === 'SMALL' ? mission.missionPatchSmall : mission.missionPatchLarge;
    },
  },
  Launch: {
    isBooked: async (launch, _, { dataSources }) => dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
  },
  // User: {
  //   trips: async (_, __, { dataSources }) => {
  //     // get ids of launches by user
  //     const launchIds = await dataSources.userAPI.getLaunchIdsByUser();
  //     if (!launchIds.length) return [];
  //     // look up those launches by their ids
  //     return (
  //       dataSources.launchAPI.getLaunchesByIds({
  //         launchIds,
  //       }) || []
  //     );
  //   },
  // },
};

export default resolvers;
