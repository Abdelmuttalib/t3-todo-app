import type { TodoFormActionEnum } from "@/utils/enums";

export type FormActionType =
  | TodoFormActionEnum.CREATE
  | TodoFormActionEnum.EDIT;
