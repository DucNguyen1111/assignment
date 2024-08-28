import { TokenKey } from '../constants/common';

class StorageService {
  set profile(profile: Record<string, string> | null) {
    if (profile) {
      localStorage.setItem(TokenKey.Profile, JSON.stringify(profile));
    } else {
      localStorage.removeItem(TokenKey.Profile);
    }
  }

  get profile() {
    if (typeof window === 'undefined') return null;
    const profile = localStorage.getItem(TokenKey.Profile);
    return profile ? JSON.parse(profile) : null;
  }

  get isAuthenticated() {
    const data = localStorage.getItem(TokenKey.Profile);
    if (data !== null) return Boolean(JSON.parse(data)?.access_token);

    return false;
  }
}

const storageService = new StorageService();
export default storageService;
