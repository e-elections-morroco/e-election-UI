import React, { useState, useEffect } from "react";
import { MdOutlineRecordVoiceOver } from "react-icons/md";

const VoiceChatIcon = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  useEffect(() => {
    if (mediaRecorder) {
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        convertBlobToBase64(audioBlob);
      };
    }
  }, [mediaRecorder]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        setIsRecording(true);
        recorder.start();
      })
      .catch((err) => {
        console.error('Impossible d\'accéder au microphone:', err);
      });
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleVoiceClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const convertBlobToBase64 = (blob: Blob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result?.toString().split(',')[1];
      console.log('Audio base64:', base64data);
      if (base64data) {
        sendData(base64data);
      } else {
        console.error('Failed to convert audio blob to base64');
      }
    };
    reader.readAsDataURL(blob);
  };

  const sendData = (base64data: string) => {
    const data = {
      base64data: base64data,
      provider: 'google',
      language: 'arabe', // Langue fixée à l'arabe
      database_ip: 'localhost' // Remplacez par votre adresse IP de base de données
    };

    fetch('http://localhost:5002/voicebot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Réponse de l\'API backend:', data);
        lireTexte(data.action);
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi des données:', error);
      });
  };

  const lireTexte = (texte: string) => {
    // Utilisation de ResponsiveVoice pour la synthèse vocale
    (window as any).responsiveVoice.speak(texte, "Arabic Female", { rate: 0.9 });
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: isRecording ? "#FF0000" : "#007BFF",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
      }}
      onClick={handleVoiceClick}
    >
      <MdOutlineRecordVoiceOver size={30} color="white" />
    </div>
  );
};

export default VoiceChatIcon;
