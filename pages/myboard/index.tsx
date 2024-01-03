import useRedriectByLogin from '@/hooks/useRedriectByLogin';

function MyBoard() {
  useRedriectByLogin();
  return <div>MyBoard page</div>;
}

export default MyBoard;
