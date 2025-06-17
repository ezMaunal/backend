export const MESSAGES = {
  SUCCESS: {
    MANUAL_DELETE: "해당 매뉴얼이 삭제되었습니다.",
    MANUAL_GET: "매뉴얼을 조회했습니다.",
    AUTH_LOGIN: "로그인 성공 및 회원가입이 완료되었습니다.",
    AUTH_LOGOUT: "성공적으로 로그아웃되었습니다.",
    AUTH_DELETE: "회원 탈퇴가 완료되었습니다.",
    IMAGE_UPLOAD: "이미지 업로드가 완료되었습니다.",
  },
  ERROR: {
    FILE_REQUIRED: "파일이 업로드되지 않았습니다.",
    STEP_TEXT_REQUIRED: "단계별 안내 텍스트가 비어 있습니다.",
    MANUAL_NOT_FOUND: "해당 manualId에 대한 매뉴얼이 존재하지 않습니다.",
    MANUAL_NAME_REQUIRED: "수정할 제목이 없습니다.",
    STEP_TEXT_INVALID: "수정할 텍스트가 유효하지 않습니다.",
    STEP_IMAGE_NOT_FOUND: "해당 imageId에 대한 이미지가 존재하지 않습니다.",
    AUTH_KAKAO_CODE_MISSING: "카카오 인가 코드가 없습니다.",
    AUTH_KAKAO_FAILED: "카카오 로그인 인증에 실패했습니다.",
    AUTH_TOKEN_INVALID: "유효하지 않거나 만료된 토큰입니다.",
    AUTH_UNAUTHORIZED: "인증 정보가 유효하지 않습니다.",
    USER_NOT_FOUND: "사용자 정보를 찾을 수 없습니다.",
    USER_HIGHLIGHT_COLOR_INVALID: "강조 색상 값이 유효하지 않습니다.",
    INTERNAL_SERVER_ERROR: "서버 오류가 발생했습니다.",
  }
};
