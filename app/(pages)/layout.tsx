import { NextPage } from 'next';
import Header from '../components/Header';
import getCurrentUser from '../actions/getCurrentUser';

interface Props {
  children: React.ReactNode;
}

const Layout: NextPage<Props> = async ({ children }) => {
  const loggedInUser = await getCurrentUser();

  const user = {
    name: loggedInUser?.name,
    email: loggedInUser?.email,
    role: loggedInUser?.role,
  };

  return (
    <main>
      <Header user={user} />
      {children}
    </main>
  );
};

export default Layout;
