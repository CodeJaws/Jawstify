import { useQueryClient } from '@tanstack/react-query';

/** 기존 쿼리의 캐시된 데이터를 가져오는 데 사용할 수 있는 동기 함수 - 전역에서 사용 가능
 * @param key Query key 값
 */
function useGetQueryData(key: any[]) {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(key);
}
export default useGetQueryData;
