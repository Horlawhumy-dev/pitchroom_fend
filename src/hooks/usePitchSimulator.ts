import { useState, useEffect, useRef, useCallback } from "react";

interface SimulatorState {
  isRecording: boolean;
  transcript: string[];
  aiResponses: { text: string; time: string; dimmed?: boolean }[];
  isProcessing: boolean;
  error: string | null;
}

export const usePitchSimulator = (sessionId: string | null) => {
  const [state, setState] = useState<SimulatorState>({
    isRecording: false,
    transcript: [],
    aiResponses: [],
    isProcessing: false,
    error: null,
  });

  const socketRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Initialize WebSocket
  useEffect(() => {
    if (!sessionId) return;

    const socket = new WebSocket(`ws://localhost:3000/ws?sessionId=${sessionId}`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket Connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.error) {
        setState(prev => ({ ...prev, error: data.error, isProcessing: false }));
        return;
      }

      // Handle Transcript
      if (data.transcript !== undefined) {
        setState(prev => {
          const newTranscript = [...prev.transcript];
          if (data.transcriptDone) {
            newTranscript.push(data.transcript);
            return { ...prev, transcript: newTranscript, isProcessing: true };
          } else {
            // Live update of the last (current) segment if needed, 
            // but for simplicity we'll just track completed ones
            return prev;
          }
        });
      }

      // Handle AI Answer
      if (data.answer) {
        setState(prev => {
          const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          // If it's a stream, we might want to append to the last one
          // The backend sends chunks.
          if (data.message === "Streaming response...") {
             const newResponses = [...prev.aiResponses];
             if (newResponses.length > 0 && newResponses[0].time === "Streaming...") {
                newResponses[0].text += data.answer;
             } else {
                newResponses.unshift({ text: data.answer, time: "Streaming..." });
             }
             return { ...prev, aiResponses: newResponses };
          } else if (data.message === "Final Response received") {
             const newResponses = [...prev.aiResponses];
             if (newResponses.length > 0) {
                newResponses[0].text = data.answer;
                newResponses[0].time = now;
             }
             return { ...prev, aiResponses: newResponses, isProcessing: false };
          }
          return prev;
        });
      }

      // Handle AI Voice (TTS)
      if (data.action_type === "ai_audio" && data.audio) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
        audio.play().catch(e => console.error("Audio playback failed:", e));
      }
    };

    socket.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    return () => {
      socket.close();
    };
  }, [sessionId]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0 && socketRef.current?.readyState === WebSocket.OPEN) {
          // Convert to Base64 and send
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = (reader.result as string).split(",")[1];
            socketRef.current?.send(JSON.stringify({
              action_type: "transcribe",
              audio: base64data
            }));
          };
          reader.readAsDataURL(event.data);
        }
      };

      // Start recording and send data in intervals
      mediaRecorder.start(2000); // 2 second intervals
      setState(prev => ({ ...prev, isRecording: true }));
    } catch (err) {
      setState(prev => ({ ...prev, error: "Microphone access denied." }));
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setState(prev => ({ ...prev, isRecording: false }));
      
      // Tell backend to finalize transcription
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({
          action_type: "answer",
          text: "" // Request answer for what has been said
        }));
      }
    }
  }, []);

  return {
    ...state,
    startRecording,
    stopRecording
  };
};
