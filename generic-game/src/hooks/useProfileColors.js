import { useSelector } from 'react-redux';

export const useProfileColors = () => {
  const creature = useSelector(({ profile }) => {
    return profile.creature;
  });
  return creature;
};

// selector functions are momized in state slices in modern redux
