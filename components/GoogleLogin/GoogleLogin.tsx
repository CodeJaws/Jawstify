import useAuth, { SignUpFormValue } from '@/hooks/Auth/useAuth';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const GoogleLoginButton = () => {
  const { handleLogin, handleSignUp } = useAuth();

  const handleGoogleLogin = async (googleUserInfo: { email: string; sub: string; name: string; picture: string }) => {
    const googleLoginEmail = googleUserInfo.email;
    const googleLoginPwd = googleUserInfo.sub; // 유저별 개인 코드
    const googleUserName = googleUserInfo.name;
    const googleProfileImg = googleUserInfo.picture;
    const googleSignUpValues: SignUpFormValue = {
      email: googleLoginEmail,
      password: googleLoginPwd,
      nickname: googleUserName,
    };
    try {
      await handleSignUp(googleSignUpValues);
    } catch (e) {
      // 이미 회원가입 완료된 구글 아이디 => 회원가입 건너뛰기
    } finally {
      await handleLogin(googleLoginEmail, googleLoginPwd);
    }

    // handleProfileImgUpload(googleProfileImg);
  };

  const toDataURL = (url: string) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          }),
      );

  function dataURLtoFile(dataUrl: any, filename: any) {
    var arr = dataUrl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const handleProfileImgUpload = (url: string) => {
    let fileData: File;
    toDataURL(url).then(async (dataUrl) => {
      fileData = dataURLtoFile(dataUrl, 'imageName.jpg');

      const formData = new FormData();
      formData.append('image', fileData);
      const response = await axios.post(`https://sp-taskify-api.vercel.app/1-4/users/me/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          withCredentials: true,
        },
      });
      const { imageUrl } = response.data;
    });
  };

  return (
    <>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}>
        <GoogleLogin
          width={230}
          onSuccess={(credentialResponse) => {
            const decodedUserInfo: { email: string; sub: string; name: string; picture: string } = jwtDecode(
              credentialResponse.credential ?? '',
            );
            handleGoogleLogin(decodedUserInfo);
          }}
          onError={() => {
            alert('구글 로그인 중 에러가 발생했습니다. 이메일로 다시 로그인 해주세요');
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleLoginButton;
