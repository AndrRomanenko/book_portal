export const ROUTES = {
  ROOT: '/',
  PORTAL: {
    ROOT: '/:portal',
    AUTH: {
      ROOT: '/:portal/login',
      LOGIN: '/:portal/login',
      REGISTRATION: {
        ROOT: '/:portal/registration',
        VALIDATION: '/:portal/registration/:token',
      },
      RESET: {
        ROOT: '/:portal/reset-password',
        TOKEN: '/:portal/reset-password/:token',
      },
    },
    RECEIPTS: {
      ROOT: '/:portal/receipts',
    },
  },
}
