import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaReddit,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

import {
  MdAccessTime,
  MdArrowBack,
  MdArrowDownward,
  MdArrowForward,
  MdArrowUpward,
  MdCalendarToday,
  MdCheck,
  MdClear,
  MdClose,
  MdDelete,
  MdEdit,
  MdEmail,
  MdError,
  MdFavorite,
  MdFileDownload,
  MdFileUpload,
  MdHome,
  MdInfo,
  MdLocationOn,
  MdLogin,
  MdLogout,
  MdMenu,
  MdNotifications,
  MdPerson,
  MdPhone,
  MdRefresh,
  MdSearch,
  MdSettings,
  MdShoppingCart,
  MdWarning,
} from "react-icons/md";

import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";

export const Icons = {
  // Social
  facebook: FaFacebook,
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  github: FaGithub,
  youtube: FaYoutube,
  discord: FaDiscord,
  reddit: FaReddit,
  telegram: FaTelegram,
  whatsapp: FaWhatsapp,

  // Contact
  email: MdEmail,
  phone: MdPhone,
  location: MdLocationOn,

  // Navigation / Layout
  menu: MdMenu,
  close: MdClose,
  search: MdSearch,
  home: MdHome,

  // User / Auth
  user: MdPerson,
  login: MdLogin,
  logout: MdLogout,
  settings: MdSettings,

  // Actions
  add: AiOutlinePlus,
  remove: AiOutlineMinus,
  edit: MdEdit,
  delete: MdDelete,
  check: MdCheck,
  clear: MdClear,
  refresh: MdRefresh,

  // Arrows
  arrowBack: MdArrowBack,
  arrowForward: MdArrowForward,
  arrowUp: MdArrowUpward,
  arrowDown: MdArrowDownward,

  // E-commerce
  cart: MdShoppingCart,
  favorite: MdFavorite,

  // UI Helpers
  showPassword: AiOutlineEye,
  hidePassword: AiOutlineEyeInvisible,
  loading: AiOutlineLoading3Quarters,

  // Status
  success: AiOutlineCheckCircle,
  error: AiOutlineCloseCircle,
  info: MdInfo,
  warning: MdWarning,
  errorOutline: MdError,

  // Time
  calendar: MdCalendarToday,
  clock: MdAccessTime,

  // Files
  download: MdFileDownload,
  upload: MdFileUpload,

  // Notifications
  notifications: MdNotifications,
};
