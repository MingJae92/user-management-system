export interface GoogleLoginResponse {
  credential?: string; 
  clientId: string;
}

export interface GoogleLoginErrorResponse {
  error: string;
  error_description?: string; 
  error_uri?: string;
}
