
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AnimatedTransition from "@/components/AnimatedTransition";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users } from "lucide-react";
import { toast } from "sonner";

const VideoCall = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isInCall, setIsInCall] = useState(false);
  const [participants, setParticipants] = useState(0);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Simulate participants joining after a delay
    if (isInCall) {
      const timer = setTimeout(() => {
        setParticipants(Math.floor(Math.random() * 3) + 1);
        toast.success("New participant joined the call");
      }, 3000);
      
      return () => clearTimeout(timer);
    } else {
      setParticipants(0);
    }
  }, [isInCall]);
  
  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      setIsInCall(true);
      toast.success("Video call started");
    } catch (err) {
      console.error("Error accessing media devices:", err);
      toast.error("Could not access camera or microphone");
    }
  };
  
  const endCall = () => {
    if (localVideoRef.current?.srcObject) {
      const tracks = (localVideoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      localVideoRef.current.srcObject = null;
    }
    
    setIsInCall(false);
    toast.info("Call ended");
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast.info(isMuted ? "Microphone unmuted" : "Microphone muted");
  };
  
  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    
    if (localVideoRef.current?.srcObject) {
      const videoTracks = (localVideoRef.current.srcObject as MediaStream)
        .getVideoTracks();
      
      videoTracks.forEach(track => {
        track.enabled = !isVideoOn;
      });
    }
    
    toast.info(isVideoOn ? "Camera turned off" : "Camera turned on");
  };

  return (
    <AnimatedTransition className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Video Call</h1>
        <p className="text-muted-foreground">
          Connect with your healthcare providers through secure video calls
        </p>
      </div>
      
      <Card className="p-6 mb-6">
        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative mb-4">
          {isInCall ? (
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className={`w-full h-full object-cover ${!isVideoOn ? 'hidden' : ''}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-white text-lg">Your video will appear here</p>
            </div>
          )}
          
          {isInCall && !isVideoOn && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-3xl font-semibold text-primary">You</span>
              </div>
            </div>
          )}
          
          {isInCall && (
            <div className="absolute top-4 right-4 bg-black/50 rounded-md px-3 py-1 text-white flex items-center">
              <Users size={16} className="mr-2" />
              <span>{participants + 1} participants</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-center gap-4">
          {isInCall ? (
            <>
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full ${isMuted ? 'bg-red-100 text-red-500 hover:bg-red-200' : ''}`}
                onClick={toggleMute}
              >
                {isMuted ? <MicOff /> : <Mic />}
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full ${!isVideoOn ? 'bg-red-100 text-red-500 hover:bg-red-200' : ''}`}
                onClick={toggleVideo}
              >
                {isVideoOn ? <Video /> : <VideoOff />}
              </Button>
              
              <Button
                variant="destructive"
                size="icon"
                className="rounded-full"
                onClick={endCall}
              >
                <PhoneOff />
              </Button>
            </>
          ) : (
            <Button onClick={startCall} className="px-8">
              <Video size={16} className="mr-2" /> Start Call
            </Button>
          )}
        </div>
      </Card>
      
      <div className="text-xs text-muted-foreground text-center mt-8">
        Made by codeblooded
      </div>
    </AnimatedTransition>
  );
};

export default VideoCall;
