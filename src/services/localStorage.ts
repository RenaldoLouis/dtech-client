import LS_KEYS from "../constants/localStorageKeys";

const serviceGenerator = (lsKey: string) => ({
  get: () => localStorage.getItem(lsKey),
  set: (value: string) => {
    localStorage.setItem(lsKey, value);
  },
  delete: () => localStorage.removeItem(lsKey),
});

export const localStorageAuthToken = serviceGenerator(LS_KEYS.AUTH_TOKEN);

export const localStorageSiteLang = serviceGenerator(LS_KEYS.SITE_LANGUAGE);
