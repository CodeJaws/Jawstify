import useRedirectByLogin from '@/hooks/useRedirectByLogin';

function Boards() {
  useRedirectByLogin();
  return <div>Boards page</div>;
}

export default Boards;
