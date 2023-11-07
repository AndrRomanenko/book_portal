import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'

import SendIcon from '@material-ui/icons/Send'
import CancelIcon from '@material-ui/icons/Cancel'

import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import { TextField } from '../../components/form/TextField'

import { sendMessageToPortalOwner } from '../../api/emails'

import styles from '../styles.module.scss'
import { useValidations } from '../../hooks/useValidations'
import { checkErrorText } from '../../utils/getServerErrorCodeText'

export const ContactUsModal = ({ onRequestClose, ...props }) => {
  const { t, i18n } = useTranslation('modals', { keyPrefix: 'contact' })
  const validations = useValidations()
  const { control, handleSubmit, reset } = useForm()
  const portalAbbr = useSelector((state) => state.application.portalAbbr)

  const onSubmit = async (data) => {
    try {
      await sendMessageToPortalOwner(data, portalAbbr)
      toast.success(i18n.t('notifications:messageSent'), {
        autoClose: 3000,
      })
    } catch (error) {
      toast.error(checkErrorText(error.response.data.code), {
        autoClose: 3000,
      })
    } finally {
      reset()
      onRequestClose()
    }
  }

  return (
    <Modal title={t('title')} {...props}>
      <form
        className={styles.contactFormContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className={styles.title}>{t('label')}</span>
        <Controller
          name="subject"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              placeholder={t('subject')}
              className={styles.input}
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error?.message}
            />
          )}
          rules={validations.requiredField}
        />
        <Controller
          name="message"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              placeholder={t('message')}
              className={styles.input}
              multiline
              rows={10}
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error?.message}
            />
          )}
          rules={validations.requiredField}
        />
        <div className={styles.controls}>
          <Button
            className={styles.controlButton}
            type="submit"
            variant="contained"
            disableElevation
            startIcon={<SendIcon />}
          >
            {t('accept')}
          </Button>
          <Button
            className={styles.controlButton}
            type="button"
            variant="contained"
            disableElevation
            secondary
            startIcon={<CancelIcon />}
            onClick={onRequestClose}
          >
            {t('cancel')}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

ContactUsModal.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
}
