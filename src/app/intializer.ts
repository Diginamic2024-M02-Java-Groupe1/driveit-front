import {AuthService} from "@services/auth.service";
import {firstValueFrom} from "rxjs";

export function initializeApp(authService: AuthService) {
  return async () => {
    if (authService.isLoggedIn()) {
      try {
        return await firstValueFrom(authService.refreshToken());
      } catch {
        authService.logout();
      }
    }
    return Promise.resolve();
  };
}
