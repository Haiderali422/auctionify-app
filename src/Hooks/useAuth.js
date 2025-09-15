import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthChange } from '../lib/firebase';
import { SET_TOKENS, CLEAR_AUTH } from '../features/auctionSlice';
import { setUser, Logout } from '../features/userSlice';
import { getUser } from '../api/auctionApi';
export const useAuth = () => {
  const dispatch = useDispatch();
  const { tokens } = useSelector((state) => state.auction);
  const [loading, setLoading] = useState(true);

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
          console.log('res from auth', response);

          dispatch(
            setUser({
              email: response.data.email,
              displayName: response.data.name,
              photo: response.data.photoUrl,
              firebase_uid: response.data.firebaseUid,
              created_at: response.data.createdAt,
            })
          );
        } catch (error) {
          console.error('Error saving user profile:', error);
        }
      } else {
        dispatch(CLEAR_AUTH());
        dispatch(Logout());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  return { tokens, loading };
};
