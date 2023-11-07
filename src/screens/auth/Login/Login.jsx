import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'

import AlternateEmail from '@material-ui/icons/AlternateEmail'
import LockIcon from '@material-ui/icons/Lock'
import CircularProgress from '@material-ui/core/CircularProgress'

import { AuthLayout } from '../../../components/layout/AuthLayout'
import { TextField } from '../../../components/form/TextField'
import { Button } from '../../../components/Button'

import { ROUTES } from '../../../constants/routes'
import { useValidations } from '../../../hooks/useValidations'
import { usePortalRouting } from '../../../hooks/usePortalRouting'
import { setAuthData } from '../../../utils/auth'
import { checkErrorText } from '../../../utils/getServerErrorCodeText'

import { login } from '../../../api/auth'

import styles from '../styles.module.scss'

export const Login = () => {
  const { t } = useTranslation('login')
  const { getPortalRoute, portalRedirect } = usePortalRouting()
  const validations = useValidations()
  const portalAbbr = useSelector((state) => state.application.portalAbbr)
  const { control, handleSubmit } = useForm()

  const [loginError, setLoginError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const onLogin = async (data) => {
    setLoginError(null)
    setIsLoading(true)
    try {
      const response = await login(data, portalAbbr)
      setAuthData(response.data, portalAbbr)
      portalRedirect(ROUTES.PORTAL.RECEIPTS.ROOT)
    } catch (error) {
      setLoginError(checkErrorText(error.response.data.code))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <span className={styles.title}>{t('title')}</span>
      <form className={styles.authForm} onSubmit={handleSubmit(onLogin)}>
        <Controller
          name="userName"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              placeholder={t('username')}
              icon={<AlternateEmail />}
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error?.message}
            />
          )}
          rules={validations.emailValidation}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              placeholder={t('password')}
              icon={<LockIcon />}
              value={value}
              type="password"
              onChange={onChange}
              error={!!error}
              helperText={error?.message}
            />
          )}
          rules={validations.requiredField}
        />
        <Button
          type="submit"
          variant="contained"
          disableElevation
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={25} /> : t('button')}
        </Button>
      </form>
      {loginError && <span className={styles.errorMessage}>{loginError}</span>}
      <Link
        to={getPortalRoute(ROUTES.PORTAL.AUTH.REGISTRATION.ROOT)}
        className={styles.link}
      >
        {t('signUp')}
      </Link>
      <Link
        to={getPortalRoute(ROUTES.PORTAL.AUTH.RESET.ROOT)}
        className={styles.link}
      >
        {t('forgotPassword')}
      </Link>
    </AuthLayout>
  )
}
