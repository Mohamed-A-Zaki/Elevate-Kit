import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import {
  FaDiscord,
  FaFacebook,
  FaFolder,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaReddit,
  FaRegCopyright,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward, IoIosCode } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";
import { LuLoaderCircle } from "react-icons/lu";
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
import { SlDislike, SlLike } from "react-icons/sl";

export const Icons = {
  // ── Social ──────────────────────────────────────────────
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

  // ── Contact ─────────────────────────────────────────────
  email: MdEmail,
  phone: MdPhone,
  location: MdLocationOn,

  // ── Navigation ──────────────────────────────────────────
  menu: MdMenu,
  close: MdClose,
  search: MdSearch,
  home: MdHome,

  // ── Auth ────────────────────────────────────────────────
  user: MdPerson,
  login: MdLogin,
  logout: MdLogout,
  settings: MdSettings,

  // ── Actions ─────────────────────────────────────────────
  add: AiOutlinePlus,
  remove: AiOutlineMinus,
  edit: MdEdit,
  delete: MdDelete,
  check: MdCheck,
  clear: MdClear,
  refresh: MdRefresh,
  copy: IoCopyOutline,

  // ── Arrows ──────────────────────────────────────────────
  arrowBack: MdArrowBack,
  arrowForward: MdArrowForward,
  arrowUp: MdArrowUpward,
  arrowDown: MdArrowDownward,
  rightArrow: IoIosArrowForward,
  leftArrow: IoIosArrowBack,

  // ── Status ──────────────────────────────────────────────
  success: AiOutlineCheckCircle,
  error: AiOutlineCloseCircle,
  errorOutline: MdError,
  info: MdInfo,
  warning: MdWarning,

  // ── UI Helpers ──────────────────────────────────────────
  showPassword: AiOutlineEye,
  hidePassword: AiOutlineEyeInvisible,
  loading: AiOutlineLoading3Quarters,
  loader: LuLoaderCircle,
  like: SlLike,
  disLike: SlDislike,
  code: IoIosCode,

  // ── Time ────────────────────────────────────────────────
  calendar: MdCalendarToday,
  clock: MdAccessTime,

  // ── Files ───────────────────────────────────────────────
  download: MdFileDownload,
  upload: MdFileUpload,
  folder: FaFolder,

  // ── Misc ────────────────────────────────────────────────
  notifications: MdNotifications,
  copyright: FaRegCopyright,
  cart: MdShoppingCart,
  favorite: MdFavorite,
} as const;

export type IconName = keyof typeof Icons;
export type IconComponent = (typeof Icons)[IconName];
