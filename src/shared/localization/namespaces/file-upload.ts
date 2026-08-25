import type { TranslationDict } from "@/packages/smart-localization";

export const fileUploadTranslations = {
  title: {
    ar: "رفع المرفقات",
    en: "Upload attachments",
    fr: "Télécharger des pièces jointes",
  },
  uploadedFile: {
    ar: "ملف مرفوع",
    en: "Uploaded file",
    fr: "Fichier téléchargé",
  },
  sizeInKb: {
    ar: "{{size}} كيلوبايت",
    en: "{{size}} KB",
    fr: "{{size}} Ko",
  },
  subtitle: {
    ar: "الحد الأقصى لحجم الملف المسموح به هو {{maxSizeMB}} ميجابايت، وتشمل الصيغ المدعومة {{accepted}}",
    en: "Max file size {{maxSizeMB}}MB. Supported formats: {{accepted}}",
    fr: "Taille maximale du fichier {{maxSizeMB}}Mo. Formats pris en charge: {{accepted}}",
  },
  browseButton: {
    ar: "تصفح الملفات",
    en: "Browse files",
    fr: "Parcourir les fichiers",
  },
  addMoreButton: {
    ar: "إضافة ملفات أخرى",
    en: "Add more files",
    fr: "Ajouter d'autres fichiers",
  },
  removeAria: {
    ar: "إزالة الملف",
    en: "Remove file",
    fr: "Supprimer le fichier",
  },
  retryLabel: {
    ar: "إعادة المحاولة",
    en: "Retry",
    fr: "Réessayer",
  },
  errorTooLarge: {
    ar: "حجم الملف أكبر من {{maxSizeMB}} ميجابايت",
    en: "File is larger than {{maxSizeMB}}MB",
    fr: "Le fichier est plus grand que {{maxSizeMB}}Mo",
  },
  errorInvalidType: {
    ar: "صيغة الملف غير مدعومة",
    en: "File type is not supported",
    fr: "Le type de fichier n'est pas pris en charge",
  },
  errorMaxFiles: {
    ar: "لا يمكن رفع أكثر من {{max}} ملفات",
    en: "You can't upload more than {{max}} files",
    fr: "Vous ne pouvez pas télécharger plus de {{max}} fichiers",
  },
  errorRequired: {
    ar: "هذا الحقل مطلوب، الرجاء رفع ملف واحد على الأقل",
    en: "This field is required, please upload at least one file",
    fr: "Ce champ est requis, veuillez télécharger au moins un fichier",
  },
  errorUploadFailed: {
    ar: "فشل رفع الملف، حاول مرة أخرى",
    en: "Upload failed, please try again",
    fr: "Le téléchargement a échoué, veuillez réessayer",
  },
  errorFilesInvalid: {
    ar: "الملف المرفوع غير صالح، يرجى مراجعة الخطأ الموضح أدناه وإصلاحه",
    en: "The uploaded file isn't valid, please check the error shown below and fix it",
    fr: "Le fichier téléchargé n'est pas valide, veuillez vérifier l'erreur affichée ci-dessous et la corriger",
  },
} satisfies TranslationDict;
