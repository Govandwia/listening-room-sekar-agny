import { useEffect, useRef, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import html2canvas from 'html2canvas'
import './index.css'

// --- SUPABASE SETUP ---//
const SUPABASE_URL = 'https://pkmhufszddbjmnpuerzl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrbWh1ZnN6ZGRiam1ucHVlcnpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyODU5NzEsImV4cCI6MjA3NTg2MTk3MX0.is54Vuker0jWDvarqdIhDa_PNYb_1QjSps-pUtht4qo';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

// Lyrics for "No Regrets"
const LYRICS = [
  {
    "time": 0,
    "text": "(Instrumental intro...)"
  },
  {
    "time": 17.56,
    "text": "Why're you still here?"
  },
  {
    "time": 20.57,
    "text": "It doesn't make sense"
  },
  {
    "time": 24.36,
    "text": "I hope you're planning something behind my back"
  },
  {
    "time": 27.76,
    "text": "Stab me while I'm off guard"
  },
  {
    "time": 31.38,
    "text": "Cause if you're still here"
  },
  {
    "time": 34.61,
    "text": "And playing tough"
  },
  {
    "time": 38.36,
    "text": "You're not taking care of your heart enough"
  },
  {
    "time": 45.3,
    "text": "Don't get me wrong"
  },
  {
    "time": 46.53,
    "text": "I do feel like the world's cheating on us"
  },
  {
    "time": 49.71,
    "text": "But"
  },
  {
    "time": 52.49,
    "text": "I'm treated better and kinder"
  },
  {
    "time": 54.62,
    "text": "I swear I never asked"
  },
  {
    "time": 59.44,
    "text": "Don't get me wrong"
  },
  {
    "time": 60.37,
    "text": "I do feel like the world's cheating on us"
  },
  {
    "time": 63.39,
    "text": "But"
  },
  {
    "time": 66.24,
    "text": "I dove too deep"
  },
  {
    "time": 67.63,
    "text": "I can't get back up"
  },
  {
    "time": 72.73,
    "text": "I don't even remember why I left"
  },
  {
    "time": 75.45,
    "text": "And why I never returned back to you"
  },
  {
    "time": 79.72,
    "text": "Not when you gave me the chance"
  },
  {
    "time": 82.16,
    "text": "Not even when I wanted to"
  },
  {
    "time": 86.63,
    "text": "Right when I realized that I've been too proud"
  },
  {
    "time": 90.23,
    "text": "I caught a glance"
  },
  {
    "time": 93.57,
    "text": "Of you holding hands with someone new"
  },
  {
    "time": 97.46,
    "text": "And I went for it too"
  },
  {
    "time": 115.21,
    "text": "Never thought"
  },
  {
    "time": 116.18,
    "text": "I really was something"
  },
  {
    "time": 121.91,
    "text": "I said no regrets"
  },
  {
    "time": 123.29,
    "text": "But why is my chest ripping itself in pieces?"
  },
  {
    "time": 128.85,
    "text": "Now you're still here"
  },
  {
    "time": 132.11,
    "text": "You're just playing tough"
  },
  {
    "time": 135.71,
    "text": "You're not taking care of your heart enough"
  },
  {
    "time": 142.32,
    "text": "I don't even remember why I left"
  },
  {
    "time": 145.49,
    "text": "And why I never returned back to you"
  },
  {
    "time": 149.38,
    "text": "Not when you gave me the chance"
  },
  {
    "time": 151.61,
    "text": "Not even when I wanted to"
  },
  {
    "time": 156.21,
    "text": "Right when I realized that I've been too proud"
  },
  {
    "time": 159.5,
    "text": "I caught a glance"
  },
  {
    "time": 163.34,
    "text": "Of you holding hands with someone new"
  },
  {
    "time": 167.06,
    "text": "And I went for it too"
  },
  {
    "time": 170.68,
    "text": "My eyes just went blue"
  },
  {
    "time": 174.02,
    "text": "She was getaway cue"
  },
  {
    "time": 177.45,
    "text": "You found someone new"
  },
  {
    "time": 180.91,
    "text": "I went for it too"
  },
  {
    "time": 184.4,
    "text": "My eyes just went blue"
  },
  {
    "time": 187.91,
    "text": "She was getaway cue"
  },
  {
    "time": 191.48,
    "text": "If only I knew"
  },
  {
    "time": 194.92,
    "text": "If only I knew"
  }
];

function App() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [listenersCount, setListenersCount] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [reactions, setReactions] = useState([]);
  const [polaroidText, setPolaroidText] = useState('');

  // Sync Studio State
  const [lyricsData, setLyricsData] = useState(LYRICS);
  const [isSyncMode, setIsSyncMode] = useState(false);
  const [syncIndex, setSyncIndex] = useState(0);
  const [syncDataExport, setSyncDataExport] = useState('');
  const [activeLyricIndex, setActiveLyricIndex] = useState(-1);

  const audioRef = useRef(null);
  const cdRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const lyricsScrollRef = useRef(null);
  const animationRef = useRef(null);
  const angleRef = useRef(0);
  const polaroidRef = useRef(null);

  const IS_ARTIST_MODE = new URLSearchParams(window.location.search).get("eggny") === "54";

  // --- VOLUME CONTROL ---
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const recordSyncTime = () => {
    if (syncIndex < lyricsData.length) {
      const newTime = audioRef.current ? audioRef.current.currentTime : 0;
      setLyricsData(prev => {
        const next = [...prev];
        next[syncIndex] = { ...next[syncIndex], time: newTime };
        return next;
      });
      setSyncIndex(prev => prev + 1);
    }
  };

  // --- SYNC STUDIO LISTENER ---
  useEffect(() => {
    if (!isSyncMode) return;
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        recordSyncTime();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSyncMode, syncIndex, lyricsData]);

  // --- LYRIC ACTIVE INDEX ---
  useEffect(() => {
    let currentIdx = -1;
    for (let i = 0; i < lyricsData.length; i++) {
      if (currentTime >= lyricsData[i].time) {
        currentIdx = i;
      }
    }
    if (currentIdx !== activeLyricIndex) {
      setActiveLyricIndex(currentIdx);
    }
  }, [currentTime, lyricsData, activeLyricIndex]);

  useEffect(() => {
    // --- LOAD MESSAGES ---
    const loadMessages = async () => {
      const { data, error } = await supabaseClient
        .from("messages")
        .select("name, text, is_artist, created_at")
        .order("created_at", { ascending: true })
        .limit(300);
      if (!error && data) {
        setMessages(data.filter(msg => !msg.text.startsWith('REACTION:')));
      }
    };
    loadMessages();

    // --- REALTIME MESSAGES ---
    const msgSubscription = supabaseClient
      .channel("public:messages")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        const msgTime = new Date(payload.new.created_at);
        if (msgTime >= new Date(Date.now() - 24 * 60 * 60 * 1000)) {
          if (payload.new.text.startsWith('REACTION:')) {
            const emoji = payload.new.text.replace('REACTION:', '');
            const id = Date.now() + Math.random();
            const left = Math.random() * 80 + 10;
            setReactions(prev => [...prev, { id, emoji, left }]);
            setTimeout(() => {
              setReactions(prev => prev.filter(r => r.id !== id));
            }, 4000);
          } else {
            setMessages(prev => [...prev, payload.new]);
          }
        }
      })
      .subscribe();

    // --- LOAD ARTIST STATUS ---
    const loadArtistStatus = async () => {
      const { data, error } = await supabaseClient.from("status").select("online").eq("id", 1).single();
      if (!error && data) setIsOnline(data.online);
    };
    loadArtistStatus();

    // --- REALTIME STATUS ---
    const statusSubscription = supabaseClient
      .channel("public:status")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "status" }, (payload) => {
        setIsOnline(payload.new.online);
      })
      .subscribe();

    // --- PRESENCE (Listeners Count) ---
    const room = supabaseClient.channel('listening_room');
    room.on('presence', { event: 'sync' }, () => {
      const newState = room.presenceState();
      let count = 0;
      for (let id in newState) { count += newState[id].length; }
      setListenersCount(Math.max(1, count));
    }).subscribe(async (status) => {
      if (status === 'SUBSCRIBED') await room.track({ online_at: new Date().toISOString() });
    });

    // --- ARTIST HEARTBEAT ---
    let heartbeatInterval;
    if (IS_ARTIST_MODE) {
      const sendHeartbeat = async () => {
        await supabaseClient.from("status").update({ online: true, updated_at: new Date().toISOString() }).eq("id", 1);
      };
      sendHeartbeat();
      heartbeatInterval = setInterval(sendHeartbeat, 15000);

      window.addEventListener("beforeunload", () => {
        clearInterval(heartbeatInterval);
        const url = `${SUPABASE_URL}/rest/v1/status?id=eq.1`;
        const payload = JSON.stringify([{ online: false }]);
        const headers = { "Content-Type": "application/json", "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Prefer": "return=minimal" };
        navigator.sendBeacon(url, new Blob([payload], { type: "application/json" }));
      });
    }

    return () => {
      supabaseClient.removeChannel(msgSubscription);
      supabaseClient.removeChannel(statusSubscription);
      supabaseClient.removeChannel(room);
      if (heartbeatInterval) clearInterval(heartbeatInterval);
    };
  }, []);

  // --- AUTOSCROLL CHAT ---
  useEffect(() => {
    if (activeTab === 'chat' && chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, activeTab]);

  // --- AUTO SCROLL LYRICS ---
  useEffect(() => {
    // Only autoscroll if active index changes, and NOT in sync mode
    if (activeTab === 'lyrics' && lyricsScrollRef.current && !isSyncMode) {
      const activeLine = lyricsScrollRef.current.querySelector('.lyric-line.active');
      if (activeLine) {
        activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeLyricIndex, activeTab, isSyncMode]);

  // Also scroll to sync target
  useEffect(() => {
    if (activeTab === 'lyrics' && lyricsScrollRef.current && isSyncMode) {
      const targetLine = lyricsScrollRef.current.querySelector('.lyric-line.sync-target');
      if (targetLine) {
        targetLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [syncIndex, activeTab, isSyncMode]);

  // --- CAPTURE POLAROID ---
  const capturePolaroid = async (text, e) => {
    e.stopPropagation(); // prevent audio seek
    setPolaroidText(text);
    
    // Wait for state to update and render the hidden template
    setTimeout(async () => {
      if (polaroidRef.current) {
        const canvas = await html2canvas(polaroidRef.current, { scale: 2, backgroundColor: null });
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], "no-regrets-lyric.png", { type: "image/png" });
          
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                title: 'No Regrets',
                text: `"${text}" - Sekar Agny`,
                files: [file]
              });
            } catch (err) {
              console.log("Error sharing", err);
            }
          } else {
            // Fallback for desktop: open image in new tab
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
          }
        }, "image/png");
      }
    }, 100);
  };

  // --- SEND REACTION ---
  const sendReaction = async (emoji) => {
    // Show locally instantly for responsiveness
    const id = Date.now() + Math.random();
    const left = Math.random() * 80 + 10;
    setReactions(prev => [...prev, { id, emoji, left, local: true }]);
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== id));
    }, 4000);
    
    // Broadcast via database
    await supabaseClient.from("messages").insert([{ name: "system", text: `REACTION:${emoji}`, is_artist: false }]);
  };

  // --- SEND MESSAGE ---
  const sendMessage = async () => {
    const text = chatInput.trim();
    if (!text) return;

    let savedEmoji = sessionStorage.getItem("chatEmoji");
    if (!savedEmoji) {
      const emojiList = ["😺", "🐸", "🐻", "🐰", "🐼", "🦊", "🐨", "🐢", "🦋", "🐧", "🐙", "🐝", "🐞", "🌸", "⭐"];
      savedEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
      sessionStorage.setItem("chatEmoji", savedEmoji);
    }
    const senderName = name.trim() || savedEmoji;
    const tempMsg = { name: senderName, text, is_artist: IS_ARTIST_MODE, created_at: new Date().toISOString() };

    setChatInput('');
    await supabaseClient.from("messages").insert([{ name: senderName, text, is_artist: IS_ARTIST_MODE }]);
  };

  // --- AUDIO LOGIC ---
  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else await audioRef.current.play();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => { setIsPlaying(true); startRotation(); };
    const onPause = () => { setIsPlaying(false); stopRotation(); };
    const onEnded = () => { setIsPlaying(false); stopRotation(); };
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setDuration(audio.duration);
      }
    };
    const onLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, []);

  const rotateFrame = () => {
    angleRef.current = (angleRef.current + 0.3) % 360;
    if (cdRef.current) cdRef.current.style.transform = `rotate(${angleRef.current}deg)`;
    animationRef.current = requestAnimationFrame(rotateFrame);
  };
  const startRotation = () => { cancelAnimationFrame(animationRef.current); animationRef.current = requestAnimationFrame(rotateFrame); };
  const stopRotation = () => cancelAnimationFrame(animationRef.current);

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = Math.min(Math.max(0, clientX - rect.left), rect.width);
    const pct = x / rect.width;
    audioRef.current.currentTime = pct * audioRef.current.duration;
    setProgress(pct * 100);
    setCurrentTime(audioRef.current.currentTime);
  };

  const shareLink = async () => {
    const shareUrl = window.location.href;
    const shareText = "Listen to 'No Regrets' by Agny 🎧";
    if (navigator.share) {
      try { await navigator.share({ title: document.title, text: shareText, url: shareUrl }); }
      catch (err) { console.warn(err); }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied! Thank you for sharing 💙");
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <main className="wrapper">
      
      {/* FLOATING REACTIONS */}
      <div className="reactions-container">
        {reactions.map(r => (
          <div key={r.id} className="floating-reaction" style={{ left: `${r.left}%` }}>
            {r.emoji}
          </div>
        ))}
      </div>

      <div className="col-left">
        <header>
          <img src="/cover-art.jpg" alt="Cover art" className="cover-image" />
          <h1>No Regrets</h1>
          <h2>Sekar Agny</h2>
        </header>

        <section className="player">
          <img src="/cd.png" alt="cdArt" className="cd-art" ref={cdRef} />

          <audio ref={audioRef} preload="metadata" loop={isLooping} muted={isMuted}>
            <source src="/your-song.mp3" type="audio/mpeg" />
          </audio>

          <div className="player-top">
            <button className="control-btn" aria-label="Play/Pause" onClick={togglePlay}>
              <img src="/icon-play.svg" className={`control-icon ${isPlaying ? 'hidden' : ''}`} alt="Play" />
              <img src="/icon-pause.svg" className={`control-icon ${isPlaying ? '' : 'hidden'}`} alt="Pause" />
            </button>
          </div>

          <div className="player-row">
            <div className="time-display">{formatTime(currentTime)}</div>
            <div className="progress-wrap"
              onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); handleSeek(e); }}
              onPointerMove={(e) => { if (e.buttons === 1) handleSeek(e); }}>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                <div className="progress-knob" style={{ left: `${progress}%` }}></div>
              </div>
            </div>
            <div className="time-display">{formatTime(duration)}</div>
          </div>
          
          <div className="player-controls-bottom">
            <div className="volume-control">
              <button className="control-btn volume-btn" onClick={() => setIsMuted(!isMuted)}>
                <img src={isMuted || volume === 0 ? "/icon-volume-mute.svg" : "/icon-volume.svg"} alt="Volume" className="control-icon volume-icon" />
              </button>
              <input 
                type="range" 
                min="0" max="1" step="0.01" 
                value={isMuted ? 0 : volume} 
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (isMuted && e.target.value > 0) setIsMuted(false);
                }} 
                className="volume-slider" 
              />
            </div>
            <button className={`control-btn loop-btn ${isLooping ? 'active' : ''}`} onClick={() => setIsLooping(!isLooping)}>
              <img src="/icon-loop.svg" alt="Loop" className="control-icon" />
            </button>
          </div>
        </section>
      </div>

      <div className="col-right">
        <div className="status-indicator">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className={`dot ${isOnline ? 'online' : 'offline'}`}></span>
            <span className="status-text">{isOnline ? "Agny is here!" : "Agny is not here"}</span>
          </div>
          <div className="listeners-badge">
            <span className="pulse"></span> {listenersCount} listening now
          </div>
        </div>

        <div className="tabs">
          <button className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>Live Chat</button>
          <button className={`tab-btn ${activeTab === 'lyrics' ? 'active' : ''}`} onClick={() => setActiveTab('lyrics')}>Lyrics</button>
        </div>

        {/* REACTION BAR */}
        <div className="reaction-bar" style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '10px' }}>
           {['❤️', '🔥', '😭', '✨'].map(emoji => (
             <button 
               key={emoji}
               onClick={() => sendReaction(emoji)}
               style={{ background: '#e3eff3', border: '1px solid #9dadb1', borderRadius: '50%', width: '38px', height: '38px', fontSize: '1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.1s' }}
               onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.8)'}
               onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
             >
               {emoji}
             </button>
           ))}
        </div>

        {activeTab === 'chat' ? (
          <section className="chat">
            <div ref={chatMessagesRef} className="chat-messages">
              {messages.map((msg, idx) => (
                <div key={idx}>
                  <span className="msg-time">[{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}]</span>
                  <span className={`msg-name ${msg.is_artist ? 'artist' : ''}`}>{msg.name}:</span>
                  <span className="msg-text">{msg.text}</span>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input id="nameInput" type="text" placeholder="Name (optional)" value={name} onChange={(e) => setName(e.target.value)} />
              <input id="chatInput" type="text" placeholder="I think the song is..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} />
              <button id="sendBtn" onClick={sendMessage}>Send</button>
            </div>
          </section>
        ) : (
          <section className="lyrics-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px dashed #9dadb1', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: '#9dadb1', fontStyle: 'italic' }}>Follow along...</span>
              <button 
                onClick={(e) => {
                  if (activeLyricIndex >= 0 && activeLyricIndex < lyricsData.length) {
                    capturePolaroid(lyricsData[activeLyricIndex].text, e);
                  } else {
                    alert("Play the song to share a lyric!");
                  }
                }}
                style={{ background: '#405b6f', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '15px', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', transition: 'transform 0.2s', whiteSpace: 'nowrap' }}
                onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                📸 Share Lyric
              </button>
            </div>
            {IS_ARTIST_MODE && (
              <div style={{ 
                position: 'fixed', bottom: '15px', left: '50%', transform: 'translateX(-50%)', 
                width: '90%', maxWidth: '400px', zIndex: 1000,
                background: '#e3eff3', padding: '12px', borderRadius: '12px', 
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)', border: '1px solid #9dadb1',
                fontSize: '0.8rem', textAlign: 'left' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>Studio Sync Mode</strong>
                  <button onClick={() => { setIsSyncMode(!isSyncMode); setSyncIndex(0); }} style={{ padding: '4px 8px' }}>
                    {isSyncMode ? 'Exit Sync' : 'Start Sync'}
                  </button>
                </div>
                {isSyncMode && (
                  <div style={{ marginTop: '10px' }}>
                    <p style={{ margin: '4px 0' }}>1. Play the song.</p>
                    <p style={{ margin: '4px 0' }}>2. Tap <strong>SPACEBAR</strong> exactly when the highlighted orange line is sung.</p>
                    <p style={{ margin: '8px 0 4px 0' }}>3. Click Generate when done and paste it back into App.jsx!</p>
                    <button onClick={() => {
                      const dataStr = "const LYRICS = " + JSON.stringify(lyricsData.map(l => ({ time: Number(l.time.toFixed(2)), text: l.text })), null, 2) + ";";
                      setSyncDataExport(dataStr);
                    }} style={{ width: '100%', marginTop: '5px', padding: '8px', background: '#405b6f', color: 'white', border: 'none', borderRadius: '6px' }}>Generate Code</button>
                  </div>
                )}
                {syncDataExport && (
                  <textarea readOnly value={syncDataExport} style={{ width: '100%', height: '80px', marginTop: '10px', fontSize: '0.7rem' }} />
                )}
              </div>
            )}
            <div ref={lyricsScrollRef} className="lyrics-scroll">
              {lyricsData.map((line, idx) => {
                let isActive = false;
                if (isSyncMode) {
                  isActive = idx === syncIndex;
                } else {
                  isActive = idx === activeLyricIndex;
                }
                return (
                  <p 
                    key={idx} 
                    className={`lyric-line ${isActive ? (isSyncMode ? 'sync-target' : 'active') : ''}`}
                    onClick={() => {
                      if (!isSyncMode && audioRef.current) {
                        audioRef.current.currentTime = line.time;
                        if (!isPlaying) togglePlay();
                      }
                    }}
                    style={{ cursor: !isSyncMode ? 'pointer' : 'default' }}
                  >
                    {isSyncMode && <span style={{ fontSize: '0.7rem', color: '#888', marginRight: '8px' }}>{line.time.toFixed(1)}s</span>}
                    {line.text}
                  </p>
                );
              })}
            </div>
          </section>
        )}

        <footer>
          <div className="socials">
            <a href="https://instagram.com/sekaragny" target="_blank" rel="noreferrer"><img src="/icon-instagram.svg" alt="IG" className="icon" /></a>
            <a href="https://tiktok.com/@sekar.agny" target="_blank" rel="noreferrer"><img src="/icon-tiktok.svg" alt="TikTok" className="icon" /></a>
            <a href="https://youtube.com/@sekaragny" target="_blank" rel="noreferrer"><img src="/icon-youtube.svg" alt="YT" className="icon" /></a>
          </div>
          <button className="share-btn" onClick={shareLink}>
            <img src="/icon-share.svg" alt="Share" className="icon" />
          </button>
        </footer>
      </div>

      {/* HIDDEN POLAROID TEMPLATE */}
      <div style={{ position: 'absolute', top: 0, left: 0, zIndex: -9999, opacity: 0, pointerEvents: 'none' }}>
        <div ref={polaroidRef} className="polaroid-card">
          <img src="/cover-art.jpg" alt="Cover" className="polaroid-image" />
          <div className="polaroid-lyric">"{polaroidText}"</div>
          <div className="polaroid-footer">Sekar Agny - No Regrets</div>
        </div>
      </div>

    </main>
  )
}

export default App
