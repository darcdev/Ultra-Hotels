export interface EmailDto {
  to: string;
  subject: string;
  message: string;
  context: Record<string, unknown>;
}
