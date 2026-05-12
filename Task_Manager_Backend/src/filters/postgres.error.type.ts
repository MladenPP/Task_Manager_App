export type PostgresError = {
  code?: string;
  detail?: string;
  message?: string;
  constraint?: string;
  table?: string;
  column?: string;
};
