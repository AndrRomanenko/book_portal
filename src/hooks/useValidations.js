import { useTranslation } from 'react-i18next'

export const useValidations = () => {
  const { t } = useTranslation('validations')

  const passwordEqualMessage = t('equalPasswords')

  const requiredField = {
    required: t('required'),
    pattern: {
      value: /(.|\s)*\S(.|\s)*/,
      message: t('required'),
    },
  }

  const emailValidation = {
    required: t('required'),
    pattern: {
      value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
      message: t('auth.email'),
    },
  }

  const passwordValidation = {
    required: t('required'),
    minLength: {
      value: 10,
      message: t('auth.password.minLength'),
    },
    validate: {
      includeNumber: (v) =>
        new RegExp(/^(?=\S*[0-9])/).test(v) || t('auth.password.includeNumber'),
      includeLowercase: (v) =>
        new RegExp(/^(?=\S*[a-z])/).test(v) ||
        t('auth.password.includeLowercase'),
      includeUppercase: (v) =>
        new RegExp(/^(?=\S*[A-Z])/).test(v) ||
        t('auth.password.includeUppercase'),
      includeSpecialCharacter: (v) =>
        new RegExp(/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/).test(v) ||
        t('auth.password.includeSpecialCharacter'),
    },
  }

  return {
    requiredField,
    emailValidation,
    passwordValidation,
    passwordEqualMessage,
  }
}
