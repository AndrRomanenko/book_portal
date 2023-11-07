import moment from 'moment'

// format, map and combine raw data from BE
export const formatReceiptsData = (data, language) =>
  data.map((receipt) => {
    const {
      amount,
      city,
      createdDate,
      country,
      currency,
      firstName,
      lastName,
      zipCode,
      ...rest
    } = receipt

    return {
      partner: `${lastName || ''} ${firstName || ''}, ${zipCode || ''} ${
        city || ''
      }, ${country || ''}`,
      amount: `${new Intl.NumberFormat(language, {
        minimumFractionDigits: 2,
      }).format(amount)} ${currency}`,
      createdDate: moment(createdDate).format('DD.MM.YYYY'),
      ...rest,
    }
  })

// function for getting custom pagination label
export const getPaginationLabel = ({ from, to, count }, separatorLabel) =>
  `${from}-${to} ${separatorLabel} ${count}`
