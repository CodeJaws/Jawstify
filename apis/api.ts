import * as T from '@/types/api';
import { request } from './axios';
/** AUTH
 * @param login 로그인
 * @param changePassword 비밀번호 변경
 */
const auth = {
  login: async (body: T.LoginProps) => await request.post<T.LoginItem>('auth/login', body),
  changePassword: async (body: T.ChangePasswordProps) => await request.put('auth/login', body),
};

/** USERS
 * @param signup 회원가입
 * @param getMyInfo 내 정보 조회
 * @param correctMyInfo 내 정보 수정
 * @param profileImgUpload 프로필 이미지 업로드
 */
const users = {
  signup: async (body: T.SignupProps) => await request.post<T.SignupItem>('users', body),
  getMyInfo: async () => await request.get<T.GetMyInfoItem>('users/me'),
  correctMyInfo: async (body: T.CorrectMyInfoProps) => await request.put<T.CorrectMyInfoItem>('users/me', body),
  profileImgUpload: async (body: T.ProfileImgUploadProps) =>
    await request.post<T.ProfileImgUploadItem>('users/me/image', body),
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
  createDashboard: async (body: T.CreateDashboardProps) =>
    await request.post<T.CreateDashboardItem>('dashboards', body),
  getDashboardList: async ({ navigationMethod, cursorId, page = 1, size = 10 }: T.GetDashboardListProps) =>
    await request.get<T.GetDashboardListItem>(
      `dashboards?navigationMethod=${navigationMethod}&${cursorId && `cursorId=${cursorId}`}&page=${page}&size=${size}`,
    ),
  getDashboardDetailed: async ({ dashboardId }: T.GetDashboardDetailedProps) =>
    await request.get<T.GetDashboardDetailedItem>(`dashboards/${dashboardId}`),
  correctDashboard: async ({ dashboardId, title, color }: T.CorrectDashboardProps) =>
    await request.put<T.CorrectDashboardItem>(`dashboards/${dashboardId}`, { title, color }),
  deleteDashboard: async ({ dashboardId }: T.DeleteDashboardProps) => await request.delete(`dashboards/${dashboardId}`),
  inviteDashboard: async ({ dashboardId, email }: T.InviteDashboardProps) =>
    await request.post<T.InviteDashboardItem>(`dashboards/${dashboardId}/invitations`, { email }),
  loadInviteDashboard: async ({ dashboardId, page = 1, size = 10 }: T.LoadInviteDashboardProps) =>
    await request.get<T.LoadInviteDashboardItem>(`dashboards/${dashboardId}/invitations?page=${page}&size=${size}`),
  abortInviteDashboard: async ({ dashboardId, invitationId }: T.AbortInviteDashboardProps) =>
    await request.delete(`dashboards/${dashboardId}/invitations/${invitationId}`),
};

/** MEMBERS
 * @param getMembersInDashboard 대시보드 멤버 목록 조회
 * @param deleteMemberInDashboard 대시보드 멤버 삭제
 */
const members = {
  getMembersInDashboard: async ({ size = 20, page = 1, dashboardId }: T.GetMembersInDashboardProps) =>
    await request.get<T.GetMembersInDashboardItem>(`members?dashboardId=${dashboardId}&page=${page}&size=${size}`),
  deleteMemberInDashboard: async ({ memberId }: T.DeleteMemberInDashboardProps) =>
    await request.delete(`members/${memberId}`),
};

/** INVITATIONS
 * @param getInvitationList 내가 받은 초대 목록
 * @param responseInvitation 초대 응답
 */
const invitations = {
  getInvitationList: async ({ size = 7, cursorId }: T.GetInvitationListProps) =>
    await request.get<T.GetInvitationListItem>(`invitations?size=${size}${cursorId ? `&cursorId=${cursorId}` : ''}`),
  // getInvitationFirstList: async ({ size = 6 }: T.GetInvitationListProps) =>
  //   await request.get<T.GetInvitationListItem>(`invitations?size=${size}`),
  responseInvitation: async ({ invitationId, inviteAccepted = true }: T.ResponseInvitationProps) =>
    await request.put<T.ResponseInvitationItem>(`invitations/${invitationId}`, { inviteAccepted }),
};

/** COLUMN
 * @param createColumn 컬럼 생성
 * @param getColumnList 컬럼 목록 조회
 * @param correctColumn 컬럼 수정
 * @param deleteColumn 컬럼 삭제
 * @param uploadCardImage 카드 이미지 업로드
 */
const columns = {
  createColumn: async (body: T.CreateColumnProps) => await request.post<T.CreateColumnItem>('columns', body),
  getColumnList: async ({ dashboardId }: T.GetColumnListProps) =>
    await request.get<T.GetColumnListItem>(`columns?dashboardId=${dashboardId}`),
  correctColumn: async ({ columnId, title }: T.CorrectColumnProps) =>
    await request.put(`columns/${columnId}`, { title }),
  deleteColumn: async ({ columnId }: T.DeleteColumnProps) => await request.delete(`columns/${columnId}`),
  uploadCardImage: async ({ columnId, image }: T.UploadCardImageProps) =>
    await request.post<T.UploadCardImageItem>(`columns/${columnId}/card-image`, { image }),
};

/** CARDS
 * @param createCard 카드 생성
 * @param checkCardList 카드 목록 조회
 * @param correctCard 카드 수정
 * @param getCardDetails 카드 상세 조회
 */
const cards = {
  createCard: async (body: T.CreateCardProps) => await request.post<T.CreateCardItem>('cards', body),
  checkCardList: async ({ size = 10, cursorId = 0, columnId }: T.CheckCardListProps) =>
    await request.get<T.CheckCardListItem>(`cards?size=${size}&cursorId=${cursorId}&columnId=${columnId}`),
  correctCard: async ({ cardId, assigneeUserId, title, description, dueDate, tags, imageUrl }: T.CorrectCardProps) =>
    await request.put<T.CorrectCardItem>(`cards/${cardId}`, {
      assigneeUserId,
      title,
      description,
      dueDate,
      tags,
      imageUrl,
    }),
  getCardDetails: async ({ cardId }: T.GetCardDetailsProps) =>
    await request.get<T.GetCardDetailsItem>(`cards/${cardId}`),
  deleteCard: async ({ cardId }: T.DeleteCardProps) => await request.delete(`cards/${cardId}`),
};

/** COMMENTS
 * @param createComment 댓글 생성
 * @param getCommentList 댓글 목록 조회
 * @param correctComment 댓글 수정
 * @param deleteComment 댓글 삭제
 */
const comments = {
  createComment: async (body: T.CreateCommentProps) => await request.post<T.CreateCommentItem>('comments', body),
  getCommentList: async ({ size = 10, cursorId = 0, cardId }: T.GetCommentListProps) =>
    await request.get<T.GetCommentListItem>(`comments?cardId=${cardId}&size=${size}&cursorId=${cursorId}`),
  correctComment: async ({ commentId, content }: T.CorrectCommentProps) =>
    await request.put<T.CorrectCommentItem>(`comments/${commentId}`, { content }),
  deleteComment: async ({ commentId }: T.DeleteCommentProps) => await request.delete(`comments/${commentId}`),
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
