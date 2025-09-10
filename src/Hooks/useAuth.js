import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthChange } from '../lib/firebase';
import { SET_TOKENS, CLEAR_AUTH } from '../features/auctionSlice';
import { setUser, clearUser } from '../features/userSlice';
import { getUser } from '../api/auctionApi';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { tokens } = useSelector((state) => state.auction);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();

          dispatch(
            SET_TOKENS({
              accessToken: idToken,
              refreshToken: firebaseUser.refreshToken,
            })
          );
          const response = await getUser();
          dispatch(
            setUser({
              id: response.user.id,
              email: response.user.email,
              displayName: response.user.name,
              photo: response.user.photoURL,
            })
          );
        } catch (error) {
          console.error('Error saving user profile:', error);
        }
      } else {
        dispatch(CLEAR_AUTH());
        dispatch(clearUser());
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return { tokens };
};
