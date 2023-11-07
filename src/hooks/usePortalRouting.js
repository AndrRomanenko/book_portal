import { useParams } from 'react-router-dom'
import history from '../routes/history'

export const usePortalRouting = () => {
  const { portal } = useParams()

  const portalRedirect = (route, customPortal) => {
    if (typeof route === 'string') {
      history.push(route.replace(':portal', customPortal || portal))
    }
  }

  const getPortalRoute = (route) => route.replace(':portal', portal)

  return { portalRedirect, getPortalRoute }
}
