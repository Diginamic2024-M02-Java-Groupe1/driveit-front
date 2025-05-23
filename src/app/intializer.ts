import {AuthService} from "./core/services/auth.service";

export function initializeApp(authService: AuthService) {
  return () => authService.checkSession();
}
