import { toast } from 'react-toastify';

const config ={
  position: toast.POSITION.TOP_RIGHT
};

/**
 * Show Success Notification
 *
 * @param {String} message [message to show]
 */
export const showSuccessMsg = msg => {
  toast.success(msg, config);
}

/**
 * Show Error Notification
 *
 * @param {String} message [message to show]
 */
export const showErrorMsg = msg => {
  toast.error(msg, config);
}

/**
 * Show Warning Notification
 *
 * @param {String} message [message to show]
 */
export const showWarnMsg = msg => {
  toast.warn(msg, config);
}
