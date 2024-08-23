import { environment } from '@/environments/environment';

export const environmentVariables = {
  supabaseUrl: environment.supabaseUrl,
  supabaseKey: environment.supabaseKey,
  redirectOAuthUrl: environment.redirectOAuthUrl,
  apiEmailSender: environment.apiEmailSender,
};
