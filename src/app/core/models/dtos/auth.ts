export interface LoginUserRequestDTO {
  email: string;
  password: string;
}

export interface RegisterUserRequestDTO {
  email: string;
  password: string;
  full_name: string;
}
