import getCurrentUser from '../actions/getCurrentUser';
import HomeClient from './HomeClient';

export default async function Home() {
  const loggedInUser = await getCurrentUser();

  const user = {
    user_id: loggedInUser?.user_id,
    name: loggedInUser?.name,
    email: loggedInUser?.email,
    role: loggedInUser?.role,
  };

  return (
    <>
      <HomeClient user={user} />
    </>
  );
}
