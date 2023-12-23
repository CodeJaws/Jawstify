import {
  AbortInviteDashboardProps,
  CheckCardListItem,
  CheckCardListProps,
  CorrectCardItem,
  CorrectCardProps,
  CorrectColumnProps,
  CorrectCommentItem,
  CorrectCommentProps,
  CreateCardItem,
  CreateCardProps,
  CreateColumnItem,
  CreateColumnProps,
  CreateCommentItem,
  CreateCommentProps,
  DeleteCardProps,
  DeleteColumnProps,
  DeleteCommentProps,
  DeleteMemberInDashboardProps,
  GetCardDetailsItem,
  GetCardDetailsProps,
  GetColumnListItem,
  GetColumnListProps,
  GetCommentListItem,
  GetCommentListProps,
  GetInvitationListItem,
  GetInvitationListProps,
  GetMembersInDashboardItem,
  GetMembersInDashboardProps,
  LoadInviteDashboardItem,
  LoadInviteDashboardProps,
  ResponseInvitationItem,
  ResponseInvitationProps,
  UploadCardImageItem,
  UploadCardImageProps,
  CorrectDashboardItem,
  CorrectDashboardProps,
  DeleteDashboardProps,
  GetDashboardDetailedItem,
  GetDashboardDetailedProps,
  ChangePasswordProps,
  CorrectMyInfoItem,
  CorrectMyInfoProps,
  CreateDashboardItem,
  CreateDashboardProps,
  GetDashboardListItem,
  GetDashboardListProps,
  GetMyInfoItem,
  LoginItem,
  LoginProps,
  ProfileImgUploadItem,
  ProfileImgUploadProps,
  SignupItem,
  SignupProps,
  InviteDashboardItem,
  InviteDashboardProps,
} from '@/types/api';
import { request } from './axios';

/** AUTH
 * @param login 로그인
 * @param changePassword 비밀번호 변경
 */
const auth = {
  login: async (body: LoginProps) => await request.post<LoginItem>('auth/login', body),
  changePassword: async (body: ChangePasswordProps) => await request.put('auth/login', body),
};

/** USERS
 * @param signup 회원가입
 * @param getMyInfo 내 정보 조회
 * @param correctMyInfo 내 정보 수정
 * @param profileImgUpload 프로필 이미지 업로드
 */
const users = {
  signup: async (body: SignupProps) => await request.post<SignupItem>('users', body),
  getMyInfo: async () => await request.get<GetMyInfoItem>('users/me'),
  correctMyInfo: async (body: CorrectMyInfoProps) => await request.put<CorrectMyInfoItem>('users/me', body),
  profileImgUpload: async (body: ProfileImgUploadProps) =>
    await request.post<ProfileImgUploadItem>('users/me/image', body),
};

/** DASHBOARD
 * @param createDashboard 대시보드 생성
 * @param getDashboardList 대시보드 목록 조회
 * @param getDashboardDetailed 대시보드 상세 조회
 * @param correctDashboard 대시보드 수정
 * @param deleteDashboard 대시보드 삭제
 * @param inviteDashboard 대시보드 초대하기
 * @param loadInviteDashboard 대시보드 초대 불러오기
 * @param abortInviteDashboard 대시보드 초대 취소
 */
const dashboard = {
  createDashboard: async (body: CreateDashboardProps) => await request.post<CreateDashboardItem>('dashboards', body),
  getDashboardList: async ({ navigationMethod, cursorId, page = 1, size = 10 }: GetDashboardListProps) =>
    await request.get<GetDashboardListItem>(
      `dashboards?navigationMethod=${navigationMethod}&${cursorId && `cursorId=${cursorId}`}&page=${page}&size=${size}`,
    ),
  getDashboardDetailed: async ({ dashboardId }: GetDashboardDetailedProps) =>
    await request.get<GetDashboardDetailedItem>(`dashboards/${dashboardId}`),
  correctDashboard: async ({ dashboardId, title, color }: CorrectDashboardProps) =>
    await request.put<CorrectDashboardItem>(`dashboards/${dashboardId}`, { title, color }),
  deleteDashboard: async ({ dashboardId }: DeleteDashboardProps) => await request.delete(`dashboards/${dashboardId}`),
  inviteDashboard: async ({ dashboardId, email }: InviteDashboardProps) =>
    await request.post<InviteDashboardItem>(`dashboards/${dashboardId}/invitations`, { email }),
  loadInviteDashboard: async ({ dashboardId, page = 1, size = 10 }: LoadInviteDashboardProps) =>
    await request.get<LoadInviteDashboardItem>(`dashboards/${dashboardId}/invitations?page=${page}&size=${size}`),
  abortInviteDashboard: async ({ dashboardId, invitationId }: AbortInviteDashboardProps) =>
    await request.delete(`dashboards/${dashboardId}/invitations/${invitationId}`),
};

/** MEMBERS
 * @param getMembersInDashboard 대시보드 멤버 목록 조회
 * @param deleteMemberInDashboard 대시보드 멤버 삭제
 */
const members = {
  getMembersInDashboard: async ({ size = 20, page = 1, dashboardId }: GetMembersInDashboardProps) =>
    await request.get<GetMembersInDashboardItem>(`members?dashboardId=${dashboardId}&page=${page}&size=${size}`),
  deleteMemberInDashboard: async ({ memberId }: DeleteMemberInDashboardProps) =>
    await request.delete(`members/${memberId}`),
};

/** INVITATIONS
 * @param getInvitationList 내가 받은 초대 목록
 * @param responseInvitation 초대 응답
 */
const invitations = {
  getInvitationList: async ({ size = 10, cursorId = 0, title }: GetInvitationListProps) =>
    await request.get<GetInvitationListItem>(`invitations?size=${size}&cursorId=${cursorId}&title=${title}`),
  responseInvitation: async ({ invitationId, inviteAccepted = true }: ResponseInvitationProps) =>
    await request.put<ResponseInvitationItem>(`invitations/${invitationId}`, { inviteAccepted }),
};

/** COLUMN
 * @param createColumn 컬럼 생성
 * @param getColumnList 컬럼 목록 조회
 * @param correctColumn 컬럼 수정
 * @param deleteColumn 컬럼 삭제
 * @param uploadCardImage 카드 이미지 업로드
 */
const columns = {
  createColumn: async (body: CreateColumnProps) => await request.post<CreateColumnItem>('columns', body),
  getColumnList: async ({ dashboardId }: GetColumnListProps) =>
    await request.get<GetColumnListItem>(`columns?dashboardId=${dashboardId}`),
  correctColumn: async ({ columnId, title }: CorrectColumnProps) => await request.put(`columns/${columnId}`, { title }),
  deleteColumn: async ({ columnId }: DeleteColumnProps) => await request.delete(`columns/${columnId}`),
  uploadCardImage: async ({ columnId, image }: UploadCardImageProps) =>
    await request.post<UploadCardImageItem>(`columns/${columnId}/card-image`, { image }),
};

/** CARDS
 * @param createCard 카드 생성
 * @param checkCardList 카드 목록 조회
 * @param correctCard 카드 수정
 * @param getCardDetails 카드 상세 조회
 */
const cards = {
  createCard: async (body: CreateCardProps) => await request.post<CreateCardItem>('cards', body),
  checkCardList: async ({ size = 10, cursorId = 0, columnId }: CheckCardListProps) =>
    await request.get<CheckCardListItem>(`cards?size=${size}&cursorId=${cursorId}&columnId=${columnId}`),
  correctCard: async ({ cardId, assigneeUserId, title, description, dueDate, tags, imageUrl }: CorrectCardProps) =>
    await request.put<CorrectCardItem>(`cards/${cardId}`, {
      assigneeUserId,
      title,
      description,
      dueDate,
      tags,
      imageUrl,
    }),
  getCardDetails: async ({ cardId }: GetCardDetailsProps) => await request.get<GetCardDetailsItem>(`cards/${cardId}`),
  deleteCard: async ({ cardId }: DeleteCardProps) => await request.delete(`cards/${cardId}`),
};

/** COMMENTS
 * @param createComment 댓글 생성
 * @param getCommentList 댓글 목록 조회
 * @param correctComment 댓글 수정
 * @param deleteComment 댓글 삭제
 */
const comments = {
  createComment: async (body: CreateCommentProps) => await request.post<CreateCommentItem>('comments', body),
  getCommentList: async ({ size = 10, cursorId = 0, cardId }: GetCommentListProps) =>
    await request.get<GetCommentListItem>(`comments?cardId=${cardId}&size=${size}&cursorId=${cursorId}`),
  correctComment: async ({ commentId, content }: CorrectCommentProps) =>
    await request.put<CorrectCommentItem>(`comments/${commentId}`, { content }),
  deleteComment: async ({ commentId }: DeleteCommentProps) => await request.delete(`comments/${commentId}`),
};

/** @description 사용법: API.auth.login({}) */
const API = {
  auth,
  users,
  dashboard,
  members,
  invitations,
  columns,
  cards,
  comments,
};

export default API;
