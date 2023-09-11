import { ui, defaultLang, showDefaultLang } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    const pathParts = path.split("/");
    if (pathParts.length > 1 && pathParts[1] in ui) {
      //  '/es/ranking'  ->  '/ranking' or '/it/ranking'
      if (l !== defaultLang) pathParts[1] = l;
      else pathParts.splice(1, 1);
      return pathParts.join("/");
    } else if (pathParts.length === 2 && l !== defaultLang) {
      //  '/ranking'  ->  '/es/ranking'
      pathParts.splice(1, 0, l);
      return pathParts.join("/");
    } else {
      return path;
    }
  };
}
