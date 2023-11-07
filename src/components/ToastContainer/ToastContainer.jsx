import React from 'react'
import { ToastContainer as ToastContainerBase } from 'react-toastify'

import styles from './styles.module.scss'
import 'react-toastify/dist/ReactToastify.css'

export const ToastContainer = () => (
  <ToastContainerBase
    className={styles.container}
    position="top-right"
    autoClose={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
  />
)
