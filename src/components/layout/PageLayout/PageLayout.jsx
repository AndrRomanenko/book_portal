import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import cx from 'classnames'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'

import MenuIcon from '@material-ui/icons/Menu'
import ExitIcon from '@material-ui/icons/ExitToApp'
import PersonIcon from '@material-ui/icons/Person'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'

import { SideBar } from './components/SideBar'

import { ROUTES } from '../../../constants/routes'
import { useLocalization } from '../../../hooks/useLocalization'
import { usePortalRouting } from '../../../hooks/usePortalRouting'

import styles from './styles.module.scss'

const timeFormat = 'DD MMM YYYY | HH:mm'

export const PageLayout = ({ children }) => {
  const { t, i18n } = useTranslation('pageLayout')
  const dispatch = useDispatch()
  const { portalRedirect } = usePortalRouting()
  const { setAppLanguage, getCurrentLanguage, saveAppLanguage } =
    useLocalization()

  const { version } = useSelector((state) => state.application)
  const { portalConfig } = useSelector((state) => state.application)

  const { mainColor, headerBackgroundUrl, logoSmallUrl, headerContentColor } =
    portalConfig

  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(moment().format(timeFormat))

  const [langAnchorEl, setLangAnchorEl] = React.useState(null)
  const [userAnchorEl, setUserAnchorEl] = React.useState(null)
  const langOpen = Boolean(langAnchorEl)
  const userOpen = Boolean(userAnchorEl)

  const clockHandler = setInterval(() => {
    const time = moment().format(timeFormat)
    setCurrentTime(time)
  }, 5000)

  useEffect(() => {
    moment.locale(i18n.language)
    return () => clearInterval(clockHandler)
  }, [i18n.language])

  const handleLangClick = (event) => {
    setLangAnchorEl(event.currentTarget)
  }

  const handleUserClick = (event) => {
    setUserAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setLangAnchorEl(null)
    setUserAnchorEl(null)
  }

  const handleLanguageChange = (lang) => {
    setAppLanguage(lang)
    handleClose()
  }

  const handleLogout = () => {
    const currentLanguage = getCurrentLanguage()
    localStorage.clear()
    saveAppLanguage(currentLanguage)
    dispatch({ type: 'RESET_STORE' })
    portalRedirect(ROUTES.PORTAL.AUTH.LOGIN)
  }

  const handleMenuIsOpen = () => setMenuIsOpen((prevIsOpen) => !prevIsOpen)

  return (
    <div className={styles.container}>
      <nav
        className={styles.navBar}
        style={{ backgroundColor: mainColor, color: headerContentColor }}
      >
        <button
          className={styles.barButton}
          onClick={handleMenuIsOpen}
          type="button"
        >
          <MenuIcon style={{ color: headerContentColor }} />
        </button>
        <div className={styles.appInfo}>
          {logoSmallUrl && (
            <img src={logoSmallUrl} alt="logo" className={styles.logo} />
          )}

          <div className={styles.portalInfo}>
            <span className={styles.name}>Portal</span>
            <span className={styles.version}>{version}</span>
          </div>
        </div>
        <div
          className={styles.mainBarSection}
          style={{
            backgroundImage: `url(${headerBackgroundUrl})`,
          }}
        >
          <span className={styles.time} style={{ color: headerContentColor }}>
            {`${currentTime} ${t('timeLabel')}`}
          </span>
        </div>
        <button
          className={cx(styles.barButton, styles.langButton)}
          style={{ color: headerContentColor }}
          type="button"
          onClick={handleLangClick}
        >
          {getCurrentLanguage()}
        </button>
        <Menu
          id="fade-menu"
          anchorEl={langAnchorEl}
          keepMounted
          open={langOpen}
          onClose={handleClose}
          TransitionComponent={Fade}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
          }}
        >
          <MenuItem onClick={() => handleLanguageChange('en')}>
            English
          </MenuItem>
          <MenuItem onClick={() => handleLanguageChange('de')}>
            Deutsch
          </MenuItem>
        </Menu>
        <button
          className={styles.barButton}
          type="button"
          onClick={handleUserClick}
        >
          <PersonIcon style={{ color: headerContentColor }} />
        </button>
        <Menu
          id="fade-menu"
          anchorEl={userAnchorEl}
          keepMounted
          open={userOpen}
          onClose={handleClose}
          TransitionComponent={Fade}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
          }}
        >
          <MenuItem onClick={handleLogout}>
            <ExitIcon className={styles.exitIcon} />
            {t('logout')}
          </MenuItem>
        </Menu>
      </nav>
      <section className={styles.content}>{children}</section>
      <SideBar isOpen={menuIsOpen} onClose={() => setMenuIsOpen(false)} />
    </div>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
