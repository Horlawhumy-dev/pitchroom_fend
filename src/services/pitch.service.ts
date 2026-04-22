import apiV1 from "../lib/api-v1";
import type { ApiResponse } from "./api.types";

export interface PitchUploadResponse {
  message: string;
  session: string; // This is the sessionId
  isActive: boolean;
  uid: string;
  responseType: string;
  createdAt: string;
}

export interface PitchSession {
  sessionId: string;
  createdAt: string;
  isActive: boolean;
  responseType: string;
  pitchStage: string;
  duration?: string;
  score?: number;
  analysisSummary?: {
    storyClarity: number;
    marketCredibility: number;
    founderConfidence: number;
  };
}

export interface PaginatedSessions {
  sessions: PitchSession[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface PitchReport {
  sessionId: string;
  sessionTranscript: {
    logs: {
      question: string;
      answer: string;
      loggedAt: string;
    }[];
  };
  pitchIntelligence: {
    storyClarity: { score: number; feedback: string };
    marketCredibility: { score: number; feedback: string };
    founderConfidence: { score: number; feedback: string };
    investorRiskSignals: string[];
    overallSummary: string;
  } | null;
}

export interface UserStats {
  totalSessions: number;
  averageScore: number;
  pitchReadiness: number;
  lastSession: {
    sessionId: string;
    score: number;
    date: string;
  } | null;
}

export const pitchService = {
  /**
   * Upload a pitch deck and start a session
   */
  async uploadDeck(
    file: File, 
    context: string, 
    settingsType: string = "practice",
    pitchStage: string = "Seed"
  ): Promise<ApiResponse<PitchUploadResponse>> {
    const formData = new FormData();
    formData.append("deck", file);
    formData.append("context", context);
    formData.append("settingsType", settingsType);
    formData.append("pitchStage", pitchStage);

    return await apiV1.post<ApiResponse<PitchUploadResponse>>("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }) as unknown as ApiResponse<PitchUploadResponse>;
  },

  /**
   * Get all sessions for the current user (paginated)
   */
  async getSessions(page: number = 1, limit: number = 10): Promise<ApiResponse<PaginatedSessions>> {
    return await apiV1.get<ApiResponse<PaginatedSessions>>("/sessions", {
      params: { page, limit }
    }) as unknown as ApiResponse<PaginatedSessions>;
  },

  /**
   * Get a specific pitch report
   */
  async getReport(sessionId: string): Promise<ApiResponse<PitchReport>> {
    return await apiV1.get<ApiResponse<PitchReport>>(`/report/${sessionId}`) as unknown as ApiResponse<PitchReport>;
  },

  /**
   * Get user statistics
   */
  async getUserStats(): Promise<ApiResponse<UserStats>> {
    return await apiV1.get<ApiResponse<UserStats>>("/sessions/user-stats") as unknown as ApiResponse<UserStats>;
  },

  /**
   * Finish a pitch session and trigger AI analysis
   */
  async finishSession(sessionId: string): Promise<ApiResponse<any>> {
    return await apiV1.post<ApiResponse<any>>(`/finish`, { sessionId }) as unknown as ApiResponse<any>;
  }
};
