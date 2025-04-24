export interface GoogleLoginResponse {
  credential?: string; // Made optional to match CredentialResponse
  clientId: string;
}

export interface GoogleLoginErrorResponse {
  error: string;
  error_description?: string; // Optional — not always provided
  error_uri?: string; // Optional — not always provided
}
