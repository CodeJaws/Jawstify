import Image from 'next/image';
import styled from 'styled-components';

/** Page 작성 시 맞는 Type으로 수정해야 하는 부분입니다. */
interface DashboardGroupProps {
  group: {
    id: number;
    name: string;
    color: string;
    createdByMe: boolean;
  }[];
}

function DashboardGroup({ group }: DashboardGroupProps) {
  // Button Component Merge시 추가할 내용
  return <></>;
}

export default DashboardGroup;
