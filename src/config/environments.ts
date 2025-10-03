import 'dotenv/config';

export const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 4000,
  dbUrl: process.env.DATABASE_URL,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  smtpUsername: process.env.SMTP_USERNAME,
  smtpPassword: process.env.SMTP_PASSWORD,
  urlFront: process.env.URL_FRONT,
  url: process.env.URL,
  emailFrom: process.env.EMAIL_FROM,
  jwtSecret: process.env.JWT_SECRET,
  jwtUserSecret: process.env.JWT_USER_SECRET,
  jwtRecoverySecret: process.env.JWT_RECOVERY_SECRET,
  jwtVerificationExpiration: process.env.JWT_VERIFICATION_EXPIRATION_MINUTES,
  domainFront: process.env.DOMAIN_FRONT,
  awsAccessKey: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccess: process.env.AWS_SECRET_ACCESS,
  awsRegion: process.env.AWS_REGION,
  awsBucketName: process.env.AWS_BUCKET_NAME,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
  facebookClientId: process.env.FACEBOOK_CLIENT_ID,
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  facebookCallbackUrl: process.env.FACEBOOK_CALLBACK_URL,
  freePlanId: process.env.FREE_PLAN_ID,
  gmailApiClientId: process.env.GMAIL_API_CLIENT_ID,
  gmailApiClientSecret: process.env.GMAIL_API_CLIENT_SECRET,
  gmailApiRedirectUri: process.env.GMAIL_API_REDIRECT_URI,
  gmailApiRefreshToken: process.env.GMAIL_API_REFRESH_TOKEN,
  argHolidaysApi: process.env.ARG_HOLIDAYS_API,

};

module.exports = { config };
