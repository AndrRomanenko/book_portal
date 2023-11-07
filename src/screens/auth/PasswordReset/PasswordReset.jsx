import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import CircularProgress from '@material-ui/core/CircularProgress'
import AlternateEmail from '@material-ui/icons/AlternateEmail'
import LockIcon from '@material-ui/icons/Lock'

import { AuthLayout } from '../../../components/layout/AuthLayout'
import { TextField } from '../../../components/form/TextField'
import { Button } from '../../../components/Button'
import { Spinner } from '../../../components/Spinner/Spinner'

import {
  triggerResetPassword,
  registerPassword,
  validateRegistrationToken,
} from '../../../api/auth'

import { ROUTES } from '../../../constants/routes'

import { useValidations } from '../../../hooks/useValidations'
import { usePortalRouting } from '../../../hooks/usePortalRouting'
import { checkErrorText } from '../../../utils/getServerErrorCodeText'

import styles from '../styles.module.scss'

export const PasswordReset = () => {
  const { t, i18n } = useTranslation('passwordReset')
  const { portalRedirect, getPortalRoute } = usePortalRouting()
  const portalAbbr = useSelector((state) => state.application.portalAbbr)
  const validations = useValidations()
  const { token } = useParams()
  const { control, handleSubmit } = useForm()

  const [errorMesage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [tokenValidation, setTokenValidation] = useState(false)

  const [userName, setUserName] = useState('')

  const vlidateToken = async () => {
    setTokenValidation(true)
    try {
      const response = await validateRegistrationToken(token, portalAbbr)
      setUserName(response.data.userName)
      setTokenValidation(false)
    } catch (error) {
      portalRedirect(ROUTES.PORTAL.AUTH.LOGIN)
      toast.error(checkErrorText(error.response.data.code))
    }
  }

  useEffect(() => {
    if (token) {
      vlidateToken()
    }
  }, [])

  const onResetTrigger = async (data) => {
    setErrorMessage(null)
    setIsLoading(true)
    try {
      await triggerResetPassword(data, portalAbbr)
      setShowSuccessMessage(true)
    } catch (e) {
      setErrorMessage(checkErrorText(e.response.data.code))
    } finally {
      setIsLoading(false)
    }
  }

  const onReset = async (data) => {
    const { password, passwordCheck } = data

    if (password !== passwordCheck) {
      setErrorMessage(validations.passwordEqualMessage)
      return
    }
    setErrorMessage(null)
    setIsLoading(true)
    try {
      await registerPassword(
        {
          userName,
          password,
          registrationToken: token,
        },
        portalAbbr,
      )
      toast.success(i18n.t('notifications:passwordReset'), {
        autoClose: 3000,
      })
      setTimeout(() => portalRedirect(ROUTES.PORTAL.AUTH.LOGIN), 3000)
    } catch (e) {
      setErrorMessage(checkErrorText(e.response.data.code))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <span className={styles.title}>{t('title')}</span>

      {tokenValidation && <Spinner />}

      {!tokenValidation && showSuccessMessage && (
        <span className={styles.message}>{t('successMessage')}</span>
      )}

      {!tokenValidation && !showSuccessMessage && (
        <form
          className={styles.authForm}
          onSubmit={handleSubmit(token ? onReset : onResetTrigger)}
        >
          {token ? (
            <>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    placeholder={t('password')}
                    icon={<LockIcon />}
                    value={value}
                    type="password"
                    onChange={onChange}
                    error={!!error || errorMesage}
                    helperText={error?.message}
                  />
                )}
                rules={validations.passwordValidation}
              />
              <Controller
                name="passwordCheck"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    placeholder={t('passwordCheck')}
                    icon={<LockIcon />}
                    value={value}
                    type="password"
                    onChange={onChange}
                    error={!!error || errorMesage}
                    helperText={error?.message}
                  />
                )}
                rules={validations.passwordValidation}
              />
            </>
          ) : (
            <Controller
              name="userName"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  placeholder={t('username')}
                  icon={<AlternateEmail />}
                  value={value}
                  onChange={onChange}
                  error={!!error || errorMesage}
                  helperText={error?.message}
                />
              )}
              rules={validations.emailValidation}
            />
          )}
          <Button
            variant="contained"
            disableElevation
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={25} /> : t('button')}
          </Button>
        </form>
      )}
      {errorMesage && (
        <span className={styles.errorMessage}>{errorMesage}</span>
      )}
      <Link
        to={getPortalRoute(ROUTES.PORTAL.AUTH.LOGIN)}
        className={styles.link}
      >
        {t('loginLink')}
      </Link>
    </AuthLayout>
  )
}
