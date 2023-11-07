export const getArticleFilterOptions = (data) =>
  data.map((article) => {
    const { articleAlternativeNumber, articleNumber, articleTitle } = article
    return {
      title: [articleAlternativeNumber, articleNumber, articleTitle]
        .filter((x) => x)
        .join(', '),
      value: article,
    }
  })

export const getContractPartnerFilterOptions = (data) =>
  data.map((partner) => {
    const { city, country, firstName, lastName, zipCode } = partner
    return {
      title: `${lastName}, ${firstName}, ${zipCode || ''} ${city || ''}, ${
        country || ''
      }`,
      value: partner,
    }
  })

export const getReceiptTypeFilterOptions = (data) =>
  data.map((receiptType) => ({
    title: receiptType,
    value: receiptType,
  }))
