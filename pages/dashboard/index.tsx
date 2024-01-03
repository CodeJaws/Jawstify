import useRedirectByLogin from '@/hooks/useRedirectByLogin';

function DashBoard() {
  useRedirectByLogin();
  return <div>DashBoard page</div>;
}

export default DashBoard;
