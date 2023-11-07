import download from 'downloadjs'

export const initiateDownload = (response) => {
  const disposition = response.request.getResponseHeader('Content-Disposition')
  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
  const matches = filenameRegex.exec(disposition)
  const filename = matches[1].replace(/['"]/g, '')
  download(response.data, filename, 'application/octet-stream')
}
