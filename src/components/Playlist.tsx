'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface Track {
  title: string;
  artist: string;
}

const TRACKS: Track[] = [
  { title: 'Studio Drone (Meditation I)', artist: 'Synthesized Ambient' },
  { title: 'Music for Airports (Selection)', artist: 'Brian Eno' },
  { title: 'In a Silent Way', artist: 'Miles Davis' },
  { title: 'Water No Get Enemy (Ambient Edit)', artist: 'Fela Kuti' },
  { title: 'Selected Ambient Works', artist: 'Aphex Twin' }
];

export function Playlist() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Web Audio Nodes
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const currentTrack = TRACKS[trackIndex];

  // Rotate tracks every 45 seconds for visualization
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTrackIndex((prev) => (prev + 1) % TRACKS.length);
    }, 45000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const initAudio = () => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Base synth drone (warm low end)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.value = 55; // A1 note (deep hum)

    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = 55.4; // Slightly detuned for chorus beating

    // High cut filter to make it warm, muffled and dark
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 180; // filter out harsh frequencies
    filter.Q.value = 3;

    // Gain node (volume controls)
    const gainNode = ctx.createGain();
    gainNode.gain.value = 0.08; // very subtle background volume

    // LFO to create breathing motion in the filter cutoff
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.15; // 0.15 Hz, very slow movement
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 40; // modulate filter cutoff by 40Hz

    // Connections
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Save references
    osc1Ref.current = osc1;
    osc2Ref.current = osc2;
    filterRef.current = filter;
    gainNodeRef.current = gainNode;
    lfoRef.current = lfo;

    // Start oscillators
    osc1.start();
    osc2.start();
    lfo.start();
  };

  const togglePlay = () => {
    if (!isPlaying) {
      if (!audioCtxRef.current) {
        initAudio();
      } else if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      setIsPlaying(true);
    } else {
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!gainNodeRef.current) return;
    if (isMuted) {
      gainNodeRef.current.gain.value = 0.08;
      setIsMuted(false);
    } else {
      gainNodeRef.current.gain.value = 0;
      setIsMuted(true);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-[#F8F7F4] p-4 rounded-lg flex items-center gap-4 transition-editorial shadow-2xl border border-white/5 max-w-xs md:max-w-sm">
      <button
        onClick={togglePlay}
        className="p-3 bg-[#F8F7F4] text-[#1A1A1A] rounded-full hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center"
        aria-label={isPlaying ? 'Pause Playlist' : 'Play Playlist'}
      >
        {isPlaying ? <Pause size={16} fill="#1A1A1A" /> : <Play size={16} fill="#1A1A1A" />}
      </button>

      <div className="flex flex-col min-w-0 pr-2">
        <span className="text-[9px] uppercase tracking-widest text-white/40 block mb-0.5">Studio Playlist</span>
        <div className="truncate text-xs font-serif italic text-white/90">
          {currentTrack.title}
        </div>
        <div className="text-[10px] text-white/50 truncate">
          {currentTrack.artist}
        </div>
      </div>

      <div className="flex items-center gap-2 border-l border-white/10 pl-3">
        {/* Simple visualizer bars */}
        <div className="flex items-end gap-[2px] h-3 w-4">
          {[1, 2, 3, 4].map((bar) => (
            <div
              key={bar}
              className={`w-[2px] bg-accent-olive rounded-full transition-all duration-300 ${
                isPlaying ? 'animate-pulse' : 'h-1'
              }`}
              style={{
                height: isPlaying ? `${Math.floor(Math.random() * 10) + 3}px` : '4px',
                animationDelay: `${bar * 0.15}s`,
                animationDuration: '0.8s'
              }}
            />
          ))}
        </div>

        {isPlaying && (
          <button
            onClick={toggleMute}
            className="text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        )}
      </div>
    </div>
  );
}
