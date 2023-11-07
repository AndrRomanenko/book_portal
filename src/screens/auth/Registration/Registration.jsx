import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import cx from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import ReCAPTCHA from 'react-google-recaptcha'

import AlternateEmail from '@material-ui/icons/AlternateEmail'
import LockIcon from '@material-ui/icons/Lock'

import { AuthLayout } from '../../../components/layout/AuthLayout'
import { TextField } from '../../../components/form/TextField'
import { Button } from '../../../components/Button'
import { Spinner } from '../../../components/Spinner/Spinner'

import {
  login,
  register,
  registerPassword,
  validateRegistrationToken,
} from '../../../api/auth'
import { useValidations } from '../../../hooks/useValidations'
import { usePortalRouting } from '../../../hooks/usePortalRouting'
import { checkErrorText } from '../../../utils/getServerErrorCodeText'

import { setAuthData } from '../../../utils/auth'

import styles from '../styles.module.scss'
import { ROUTES } from '../../../constants/routes'

export const Registration = () => {
  const { t, i18n } = useTranslation('registration')
  const validations = useValidations()
  const { portalRedirect, getPortalRoute } = usePortalRouting()
  const portalAbbr = useSelector((state) => state.application.portalAbbr)

  const { token } = useParams()
  const { control, handleSubmit } = useForm()

  const [captchaSuccess, setCaptchaSuccess] = useState(false)
  const [errorMesage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [tokenValidation, setTokenValidation] = useState(false)
  const [userName, setUserName] = useState('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

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

  const onRegisterVerification = async (data) => {
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
      const response = await login({ userName, password }, portalAbbr)
      setAuthData(response.data, portalAbbr)
      portalRedirect(ROUTES.PORTAL.RECEIPTS.ROOT)
    } catch (e) {
      setErrorMessage(checkErrorText(e.response.data.code))
    } finally {
      setIsLoading(false)
    }
  }

  const onRegister = async (data) => {
    if (!captchaSuccess) {
      setErrorMessage(i18n.t('validations:recaptcha'))
      return
    }
    setErrorMessage(null)
    setIsLoading(true)
    try {
      await register(data, portalAbbr)
      setShowSuccessMessage(true)
    } catch (e) {
      setErrorMessage(checkErrorText(e.response.data.code))
    } finally {
      setIsLoading(false)
    }
  }

  const onCaptchaChange = () => setCaptchaSuccess(true)

  return (
    <AuthLayout>
      <span className={styles.title}>{t('title')}</span>
      {tokenValidation && <Spinner />}
      {showSuccessMessage && (
        <span className={styles.message}>{t('successMessage')}</span>
      )}
      {!tokenValidation && !showSuccessMessage && (
        <form
          className={cx(styles.authForm, styles.registerForm, {
            [styles.column]: token,
          })}
          onSubmit={handleSubmit(token ? onRegisterVerification : onRegister)}
        >
          {token ? (
            <>
              <TextField
                placeholder={t('username')}
                icon={<AlternateEmail />}
                value={userName}
                disabled
              />
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
            <>
              <Controller
                name="userName"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className={styles.inputEmail}
                    placeholder={t('username')}
                    value={value}
                    onChange={onChange}
                    error={!!error || errorMesage}
                    helperText={error?.message}
                  />
                )}
                rules={validations.emailValidation}
              />
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className={styles.input}
                    placeholder={t('firstName')}
                    value={value}
                    onChange={onChange}
                    error={!!error || errorMesage}
                    helperText={error?.message}
                  />
                )}
                rules={validations.requiredField}
              />
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className={styles.input}
                    placeholder={t('lastName')}
                    value={value}
                    onChange={onChange}
                    error={!!error || errorMesage}
                    helperText={error?.message}
                  />
                )}
                rules={validations.requiredField}
              />
              <Controller
                name="city"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className={styles.input}
                    placeholder={t('city')}
                    value={value}
                    onChange={onChange}
                    error={!!error || errorMesage}
                    helperText={error?.message}
                  />
                )}
                rules={validations.requiredField}
              />
              <Controller
                name="street"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className={styles.input}
                    placeholder={t('street')}
                    value={value}
                    onChange={onChange}
                    error={!!error || errorMesage}
                    helperText={error?.message}
                  />
                )}
                rules={validations.requiredField}
              />
              <Controller
                name="houseNumber"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className={styles.input}
                    placeholder={t('houseNumber')}
                    value={value}
                    onChange={onChange}
                    error={!!error || errorMesage}
                    helperText={error?.message}
                  />
                )}
                rules={validations.requiredField}
              />
              <Controller
                name="postalCode"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className={styles.input}
                    placeholder={t('postalCode')}
                    value={value}
                    onChange={onChange}
                    error={!!error || errorMesage}
                    helperText={error?.message}
                  />
                )}
                rules={validations.requiredField}
              />
              <Controller
                name="country"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className={styles.input}
                    placeholder={t('country')}
                    value={value}
                    onChange={onChange}
                    error={!!error || errorMesage}
                    helperText={error?.message}
                  />
                )}
                rules={validations.requiredField}
              />
              <Controller
                name="registrationCode"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className={styles.input}
                    placeholder={t('registrationCode')}
                    value={value}
                    onChange={onChange}
                    error={!!error || errorMesage}
                    helperText={error?.message}
                  />
                )}
                rules={validations.requiredField}
              />
            </>
          )}
          {!token && (
            <ReCAPTCHA
              className={styles.captcha}
              sitekey={process.env.REACT_APP_CAPTCHA_KEY}
              onChange={onCaptchaChange}
            />
          )}
          <div className={styles.buttonContainer}>
            <Button
              variant="contained"
              type="submit"
              disableElevation
              disabled={isLoading}
            >
              {t('button')}
            </Button>
          </div>
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
