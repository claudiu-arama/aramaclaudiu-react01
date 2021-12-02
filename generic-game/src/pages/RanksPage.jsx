import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers } from '../actions/creators/auth';

export const RanksPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return 'ranks';
};

export default RanksPage;
