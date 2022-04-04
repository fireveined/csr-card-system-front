import { AccessControl } from "accesscontrol";

export enum AppRoles {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  DUMMY = "DUMMY"
}

export const ac = new AccessControl();
ac
    .grant(AppRoles.DUMMY)
    .read("sales")
  // editor
  .grant(AppRoles.EDITOR)
  .read(["persons", "sales"])
  .create("sales")
  .update("sales")
  // admin
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.EDITOR)
  .create(["persons"])
  .update(["persons"])
  .delete(["persons", "sales"]);
