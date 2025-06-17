import env from "../config/env.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";

const JWT_SECRET = env.JWT_SECRET;
const JWT_EXPIRES_IN = "1h";

export const kakaoRedirectLogin = async (req, res, next) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).send("인가 코드가 없습니다.");
    }
    const tokenRes = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: env.KAKAO_REST_API_KEY,
        redirect_uri: env.KAKAO_REDIRECT_URI,
        code,
      }),
    });

    const tokenData = await tokenRes.json();
    const { access_token, refresh_token } = tokenData;
    if (!access_token) {
      return res.status(401).send("카카오 로그인 실패");
    }

    const userRes = await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const userData = await userRes.json();

    const kakaoId = userData.id?.toString();
    const nickname = userData.properties?.nickname || `User_${kakaoId}`;
    const profileImage = userData.properties?.profile_image || null;

    const refreshToken = uuidv4();

    let user = await User.findOne({ kakaoId });
    if (!user) {
      user = await User.create({
        userId: uuidv4(),
        kakaoId,
        nickname,
        profileImage,
        kakaoAccessToken: access_token,
        kakaoRefreshToken: refresh_token,
        refreshToken: refreshToken,
      });
    } else {
      user.refreshToken = refreshToken;
      user.kakaoAccessToken = access_token;
      user.kakaoRefreshToken = refresh_token;
      await user.save();
    }

    const jwtAccessToken = jwt.sign(
      { userId: user.userId, kakaoId: user.kakaoId },
      JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.send(`
    <html>
      <body>
        <script>
          (function() {
            const token = ${JSON.stringify(jwtAccessToken)};
            window.opener.postMessage({ token }, "*");
            window.close();
          })();
        </script>
      </body>
    </html>
  `);
  } catch (err) {
    next(err);
  }
};
