import useRedriectByLogin from '@/hooks/useRedriectByLogin';

function Boards() {
  useRedriectByLogin();
  return <div>Boards page</div>;
}

export default Boards;
