import apiV1 from "../lib/api-v1";
import type { ApiResponse } from "./api.types";

export interface User {
  fullName: string;
  role: string;
  onboardingStatus: "pending" | "in_progress" | "completed";
  workEmail?: string;
}

export interface AuthResponse extends ApiResponse {}

/**
 * Utility to get a cookie by name
 */
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(';').shift() || "");
  return null;
};

export const authService = {
  /**
   * Register a new user
   */
  async register(fullName: string, workEmail: string, password: string): Promise<AuthResponse> {
    return await apiV1.post<AuthResponse>("/auth/register", {
      fullName,
      workEmail,
      password,
    }) as unknown as AuthResponse;
  },

  /**
   * Login a user
   */
  async login(workEmail: string, password: string): Promise<AuthResponse> {
    return await apiV1.post<AuthResponse>("/auth/login", {
      workEmail,
      password,
    }) as unknown as AuthResponse;
  },

  /**
   * Logout the current user
   */
  async logout(): Promise<AuthResponse> {
    const response = await apiV1.post<AuthResponse>("/auth/logout");
    localStorage.removeItem("user"); // Cleanup legacy storage if exists
    return response as unknown as AuthResponse;
  },

  /**
   * Get the current logged in user from non-HttpOnly cookie
   */
  getCurrentUser(): User | null {
    const userCookie = getCookie("user");
    if (!userCookie) {
      // Fallback to localStorage for migration/backwards compatibility if needed
      const legacyUser = localStorage.getItem("user");
      return legacyUser ? JSON.parse(legacyUser) : null;
    }

    try {
      return JSON.parse(userCookie);
    } catch (e) {
      console.error("Failed to parse user cookie", e);
      return null;
    }
  },

  /**
   * Utility to check if user is logged in
   */
  isAuthenticated(): boolean {
    return !!getCookie("user") || !!localStorage.getItem("user");
  },

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<AuthResponse> {
    return await apiV1.get<AuthResponse>(`/auth/verify/${token}`) as unknown as AuthResponse;
  },

  /**
   * Request password reset link
   */
  async forgotPassword(workEmail: string): Promise<AuthResponse> {
    return await apiV1.post<AuthResponse>("/auth/forgot-password", {
      workEmail,
    }) as unknown as AuthResponse;
  },

  /**
   * Reset password using token
   */
  async resetPassword(token: string, newPassword: string): Promise<AuthResponse> {
    return await apiV1.post<AuthResponse>("/auth/reset-password", {
      token,
      newPassword,
    }) as unknown as AuthResponse;
  },

  /**
   * Complete onboarding process
   */
  async completeOnboarding(onboardingData: any): Promise<AuthResponse> {
    return await apiV1.post<AuthResponse>("/auth/onboarding", {
      onboardingData,
    }) as unknown as AuthResponse;
  },

  /**
   * Resend verification or password reset email
   */
  async resendEmail(workEmail: string, type: "verification" | "reset-password"): Promise<AuthResponse> {
    return await apiV1.post<AuthResponse>("/auth/resend-email", {
      workEmail,
      type,
    }) as unknown as AuthResponse;
  }
};

