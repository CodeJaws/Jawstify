import useRedriectByLogin from '@/hooks/useRedriectByLogin';

function DashBoard() {
  useRedriectByLogin();
  return <div>DashBoard page</div>;
}

export default DashBoard;
