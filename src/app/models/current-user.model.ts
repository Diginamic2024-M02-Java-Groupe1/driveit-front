import {CurrentUserRole} from "@models/current-user-role.model";

export interface CurrentUser {

  id: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  authorities?: CurrentUserRole[];
}
