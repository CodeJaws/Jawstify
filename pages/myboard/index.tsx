import useRedirectByLogin from '@/hooks/useRedirectByLogin';

function MyBoard() {
  useRedirectByLogin();
  return <div>MyBoard page</div>;
}

export default MyBoard;
