// Spotify-like Web Application Logic

// Track Database
const tracks = [
  {
    id: "lose-my-mind",
    title: "Lose My Mind (feat. Doja Cat)",
    artist: "Doja Cat",
    album: "F1: The Movie OST",
    duration: "3:29",
    durationSec: 209,
    file: "Lose My Mind _feat. Doja Cat_ _From F1_ The Movie_.mp3",
    url: "https://res.cloudinary.com/dwpaum6jz/video/upload/v1780335931/Lose_My_Mind__feat._Doja_Cat___From_F1__The_Movie__tzpwdl.mp3",
    cover: "assets/album_art.png",
    key: "F# Minor",
    tempo: "124 BPM",
    lyrics: [
      { time: 0, text: "[Instrumental Intro - Engines revving]" },
      { time: 4, text: "Yeah, I feel the speed, feel the heat rising up" },
      { time: 8, text: "We are running the redline, we can't get enough" },
      { time: 13, text: "Every corner we take, we are pushing the limit" },
      { time: 17, text: "If this is the race of our lives, we are in it" },
      { time: 22, text: "Oh, you make me lose my mind..." },
      { time: 27, text: "Going two hundred miles at the edge of the night" },
      { time: 32, text: "Lose my mind..." },
      { time: 37, text: "In the neon reflection, we fade out of sight" },
      { time: 42, text: "[Beat drop - Synth solo]" },
      { time: 50, text: "(Doja Cat)" },
      { time: 52, text: "Pedal to the metal, yeah we do it like that" },
      { time: 56, text: "Got the carbon body, hear the engine scream back" },
      { time: 61, text: "Formula 1, number one on the track" },
      { time: 65, text: "Lap after lap, yeah we never go back" },
      { time: 70, text: "We fly by, cloud nine, in the blink of an eye" },
      { time: 74, text: "You want a piece of the speed? Come and try" },
      { time: 78, text: "Oh, you make me lose my mind..." },
      { time: 83, text: "Going two hundred miles at the edge of the night" },
      { time: 88, text: "Lose my mind..." },
      { time: 93, text: "In the neon reflection, we fade out of sight" },
      { time: 98, text: "[Guitar Solo / Telemetry Peak]" },
      { time: 118, text: "Speeding through the darkness, chasing down the sun" },
      { time: 123, text: "We won't stop until the final lap is done" },
      { time: 128, text: "Do you feel the rush? Are you ready to fly?" },
      { time: 133, text: "Underneath the glow of the F1 sky" },
      { time: 138, text: "Lose my mind..." },
      { time: 143, text: "Yeah, you make me lose my mind..." },
      { time: 148, text: "[Outro - Engines fading out]" }
    ]
  },
  {
    id: "speed-demon",
    title: "Speed Demon",
    artist: "Redline Pulse",
    album: "Apex Legends",
    duration: "2:52",
    durationSec: 172,
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=60",
    key: "C# Minor",
    tempo: "128 BPM",
    lyrics: [
      { time: 0, text: "[Instrumental Opening]" },
      { time: 10, text: "Entering the track, no time for turning back" },
      { time: 20, text: "Got the eyes on the prize, shadows in the skies" },
      { time: 30, text: "Push the button, feel the kick, speed demon running quick" },
      { time: 40, text: "[Synthesizer Solo]" }
    ]
  },
  {
    id: "night-drive",
    title: "Night Drive",
    artist: "Gridrunner",
    album: "Outrun",
    duration: "3:10",
    durationSec: 190,
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=150&auto=format&fit=crop&q=60",
    key: "A Major",
    tempo: "115 BPM",
    lyrics: [
      { time: 0, text: "[Chill Electronic Beat]" },
      { time: 15, text: "Cruising under streetlights, fading in the warm night" },
      { time: 30, text: "Engine hums a slow tune, searching for the blue moon" }
    ]
  },
  {
    id: "apex-predator",
    title: "Apex Predator",
    artist: "Neon Spectre",
    album: "Monolith",
    duration: "3:04",
    durationSec: 184,
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&auto=format&fit=crop&q=60",
    key: "G Minor",
    tempo: "140 BPM",
    lyrics: [
      { time: 0, text: "[Heavy Bass Drop]" },
      { time: 12, text: "In the shadow of the apex, we are the ones who hunt" },
      { time: 24, text: "Power steering, clutch control, driving deep into your soul" }
    ]
  },
  {
    id: "redline-pulse",
    title: "Redline Pulse",
    artist: "Circuit Board",
    album: "Velocity",
    duration: "2:42",
    durationSec: 162,
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=60",
    key: "D Minor",
    tempo: "122 BPM",
    lyrics: [
      { time: 0, text: "[Chiptune Intro]" },
      { time: 8, text: "Pulse on the gauge, breaking the cage" },
      { time: 16, text: "Redline glow, here we go!" }
    ]
  }
];

// App State
const state = {
  currentTrackIndex: 0,
  isPlaying: false,
  volume: parseFloat(localStorage.getItem('player-volume')) || 0.8,
  isMuted: false,
  repeatMode: 'off', // 'off', 'one', 'all'
  isShuffle: false,
  likedTracks: JSON.parse(localStorage.getItem('liked-tracks')) || [],
  playlists: JSON.parse(localStorage.getItem('custom-playlists')) || [],
  queue: [...Array(tracks.length).keys()], // track indexes
  originalQueue: [...Array(tracks.length).keys()],
  activeTab: 'lyrics', // 'lyrics', 'specs'
  activeSection: 'home', // 'home', 'search', 'playlist-detail'
  activePlaylistId: null
};

// Global Audio Element
const audio = new Audio();
audio.volume = state.volume;
audio.crossOrigin = "anonymous"; // Request CORS access for Web Audio Visualizer

// Elements Cache
const els = {
  // Navigation & Sections
  sidebar: document.getElementById('sidebar'),
  mainContent: document.getElementById('main-content'),
  mobileToggle: document.getElementById('mobile-sidebar-toggle'),
  navHome: document.getElementById('nav-home'),
  navSearchMenu: document.getElementById('nav-search-menu'),
  navLibrary: document.getElementById('nav-library'),
  searchContainer: document.getElementById('header-search-container'),
  searchInput: document.getElementById('search-input'),
  sectionHome: document.getElementById('section-home'),
  sectionSearch: document.getElementById('section-search'),
  sectionPlaylistDetail: document.getElementById('section-playlist-detail'),
  
  // Track lists & detail views
  homeTracksList: document.getElementById('home-tracks-list'),
  searchTracksList: document.getElementById('search-tracks-list'),
  searchEmpty: document.getElementById('search-empty-state'),
  playlistDetailTracks: document.getElementById('playlist-detail-tracks'),
  playlistsGrid: document.getElementById('playlists-grid'),
  sidebarPlaylists: document.getElementById('sidebar-playlists'),
  tracksCount: document.getElementById('tracks-count'),
  
  // Playlist Details
  playlistName: document.getElementById('detail-playlist-name'),
  playlistMeta: document.getElementById('detail-playlist-meta'),
  playlistDelete: document.getElementById('playlist-detail-delete'),
  playlistPlay: document.getElementById('playlist-detail-play'),
  playlistArt: document.getElementById('detail-playlist-art'),
  
  // Hero Track
  heroPlayBtn: document.getElementById('hero-play-btn'),
  heroLikeBtn: document.getElementById('hero-like-btn'),
  heroTitle: document.getElementById('hero-title-text'),
  
  // Visualizer / Gauges
  canvas: document.getElementById('visualizer-canvas'),
  rpmGauge: document.getElementById('gauge-rpm'),
  dbGauge: document.getElementById('gauge-db'),
  visModeBtns: document.querySelectorAll('.vis-mode-btn'),
  
  // Drawer & Queue
  rightDrawer: document.getElementById('right-drawer'),
  tabLyrics: document.getElementById('tab-lyrics'),
  tabSpecs: document.getElementById('tab-specs'),
  panelLyrics: document.getElementById('panel-lyrics'),
  panelSpecs: document.getElementById('panel-specs'),
  lyricsContainer: document.getElementById('lyrics-container'),
  lyricsToggle: document.getElementById('lyrics-toggle'),
  queueToggle: document.getElementById('queue-toggle'),
  queueDrawer: document.getElementById('queue-drawer'),
  closeQueueBtn: document.getElementById('close-queue-btn'),
  queueNowPlaying: document.getElementById('queue-now-playing'),
  queueListContainer: document.getElementById('queue-list-container'),
  
  // Specs info
  specKey: document.getElementById('spec-key'),
  specTempo: document.getElementById('spec-tempo'),
  specSource: document.getElementById('spec-source'),

  // Playback Controls
  playerAlbumArt: document.getElementById('player-album-art'),
  playerTrackTitle: document.getElementById('player-track-title'),
  playerTrackArtist: document.getElementById('player-track-artist'),
  playerLikeBtn: document.getElementById('player-like-btn'),
  shuffleBtn: document.getElementById('shuffle-btn'),
  prevBtn: document.getElementById('prev-btn'),
  mainPlayBtn: document.getElementById('main-play-btn'),
  nextBtn: document.getElementById('next-btn'),
  repeatBtn: document.getElementById('repeat-btn'),
  repeatIndicator: document.getElementById('repeat-indicator'),
  currentTime: document.getElementById('current-time'),
  duration: document.getElementById('duration'),
  progressContainer: document.getElementById('progress-container'),
  progressBar: document.getElementById('progress-bar'),
  progressThumb: document.getElementById('progress-thumb'),
  
  // Volume
  volumeBtn: document.getElementById('volume-btn'),
  volumeTrack: document.getElementById('volume-track-container'),
  volumeFill: document.getElementById('volume-track-fill'),
  volumeThumb: document.getElementById('volume-track-thumb'),
  volumeIcon: document.getElementById('volume-icon'),

  // Modals
  createPlaylistBtn: document.getElementById('create-playlist-btn'),
  playlistModal: document.getElementById('playlist-modal'),
  playlistNameInput: document.getElementById('playlist-name-input'),
  modalCancel: document.getElementById('modal-cancel-btn'),
  modalSubmit: document.getElementById('modal-submit-btn'),
};

// Canvas context
let ctx = els.canvas.getContext('2d');
let audioContext, analyser, sourceNode;
let visualizerInitialized = false;
let visualizerMode = 'bars'; // 'bars' | 'wave'

// Initialize Application
function init() {
  loadTrack(state.currentTrackIndex, false);
  renderTracksList();
  renderSidebarPlaylists();
  renderPlaylistsGrid();
  setupEventListeners();
  updateLikesUI();
  updateVolumeUI();
  initTheme();
  resizeCanvas();
}

// ----------------------------------------------------
// Core Audio Engine
// ----------------------------------------------------

function loadTrack(index, autoplay = true) {
  state.currentTrackIndex = index;
  const track = tracks[index];
  
  // Try local file first, then fall back to Cloudinary URL
  audio.src = track.file;
  els.specSource.textContent = "Local MP3 File";
  
  audio.load();

  // Update Player UI
  els.playerTrackTitle.textContent = track.title;
  els.playerTrackArtist.textContent = track.artist;
  els.playerAlbumArt.src = track.cover;
  
  // Update specs telemetry panel
  els.specKey.textContent = track.key || "Unknown";
  els.specTempo.textContent = track.tempo || "Unknown";

  // Update active states on lists
  document.querySelectorAll('.track-row').forEach(row => {
    row.classList.remove('playing');
    if (row.dataset.id === track.id) {
      row.classList.add('playing');
    }
  });

  updateLikesUI();
  renderLyrics(track);
  updateQueueUI();

  if (autoplay) {
    playAudio();
  } else {
    pauseAudio();
  }
}

// Fallback logic for Audio Loading
audio.addEventListener('error', (e) => {
  const currentTrack = tracks[state.currentTrackIndex];
  // If local file failed, fall back to the remote URL
  if (audio.src.includes(encodeURI(currentTrack.file))) {
    console.warn(`Local file ${currentTrack.file} not loaded. Retrying with cloud stream URL...`);
    audio.src = currentTrack.url;
    els.specSource.textContent = "Cloudinary Stream";
    audio.load();
    if (state.isPlaying) {
      playAudio();
    }
  }
});

function playAudio() {
  // Connect Audio Context for visualizer on user interaction
  if (!visualizerInitialized) {
    setupVisualizer();
  }
  
  audio.play()
    .then(() => {
      state.isPlaying = true;
      els.mainPlayBtn.innerHTML = `<svg viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
      if (els.heroPlayBtn && state.currentTrackIndex === 0) {
        els.heroPlayBtn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg><span>PAUSE</span>`;
      }
    })
    .catch(err => {
      console.log("Playback error: ", err);
    });
}

function pauseAudio() {
  audio.pause();
  state.isPlaying = false;
  els.mainPlayBtn.innerHTML = `<svg viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>`;
  if (els.heroPlayBtn && state.currentTrackIndex === 0) {
    els.heroPlayBtn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M8 5v14l11-7z"/></svg><span>PLAY NOW</span>`;
  }
}

function togglePlay() {
  if (state.isPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
}

function nextTrack() {
  let nextIdx = state.currentTrackIndex + 1;
  if (nextIdx >= tracks.length) {
    nextIdx = 0;
  }
  loadTrack(nextIdx, true);
}

function prevTrack() {
  let prevIdx = state.currentTrackIndex - 1;
  if (prevIdx < 0) {
    prevIdx = tracks.length - 1;
  }
  loadTrack(prevIdx, true);
}

// Handle Track Progress
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const progress = (audio.currentTime / audio.duration) * 100;
    els.progressBar.style.width = `${progress}%`;
    els.progressThumb.style.left = `${progress}%`;
    els.currentTime.textContent = formatTime(audio.currentTime);
    els.duration.textContent = formatTime(audio.duration);
    
    // Sync Scrolling Lyrics
    syncLyrics(audio.currentTime);
  }
});

audio.addEventListener('durationchange', () => {
  els.duration.textContent = formatTime(audio.duration);
});

audio.addEventListener('ended', () => {
  if (state.repeatMode === 'one') {
    audio.currentTime = 0;
    playAudio();
  } else {
    nextTrack();
  }
});

// Draggable Progress Scrubber
let isDraggingProgress = false;
els.progressContainer.addEventListener('mousedown', (e) => {
  isDraggingProgress = true;
  seekProgress(e);
});

window.addEventListener('mousemove', (e) => {
  if (isDraggingProgress) {
    seekProgress(e);
  }
});

window.addEventListener('mouseup', () => {
  isDraggingProgress = false;
});

function seekProgress(e) {
  const rect = els.progressContainer.getBoundingClientRect();
  let pct = (e.clientX - rect.left) / rect.width;
  pct = Math.max(0, Math.min(1, pct));
  els.progressBar.style.width = `${pct * 100}%`;
  els.progressThumb.style.left = `${pct * 100}%`;
  els.currentTime.textContent = formatTime(pct * (audio.duration || 0));
  
  if (!isDraggingProgress || audio.paused) {
    audio.currentTime = pct * (audio.duration || 0);
  }
}

// ----------------------------------------------------
// Volume Controls
// ----------------------------------------------------

let isDraggingVolume = false;
els.volumeTrack.addEventListener('mousedown', (e) => {
  isDraggingVolume = true;
  seekVolume(e);
});

window.addEventListener('mousemove', (e) => {
  if (isDraggingVolume) {
    seekVolume(e);
  }
});

window.addEventListener('mouseup', () => {
  isDraggingVolume = false;
});

function seekVolume(e) {
  const rect = els.volumeTrack.getBoundingClientRect();
  let pct = (e.clientX - rect.left) / rect.width;
  pct = Math.max(0, Math.min(1, pct));
  state.volume = pct;
  state.isMuted = (pct === 0);
  audio.volume = pct;
  localStorage.setItem('player-volume', pct);
  updateVolumeUI();
}

function toggleMute() {
  state.isMuted = !state.isMuted;
  audio.volume = state.isMuted ? 0 : state.volume;
  updateVolumeUI();
}

function updateVolumeUI() {
  const volPct = state.isMuted ? 0 : state.volume;
  els.volumeFill.style.width = `${volPct * 100}%`;
  els.volumeThumb.style.left = `${volPct * 100}%`;
  
  if (state.isMuted || volPct === 0) {
    els.volumeIcon.innerHTML = `<path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>`;
  } else if (volPct < 0.5) {
    els.volumeIcon.innerHTML = `<path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>`;
  } else {
    els.volumeIcon.innerHTML = `<path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>`;
  }
}

// ----------------------------------------------------
// Real-time Audio Visualizer & Gauges
// ----------------------------------------------------

function setupVisualizer() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 128; // Keep it clean for canvas UI bars

    sourceNode = audioContext.createMediaElementSource(audio);
    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);

    visualizerInitialized = true;
    animateVisualizer();
  } catch (err) {
    console.warn("Could not start Web Audio API Context (CORS constraints or blocked). Bypassing...", err);
  }
}

function animateVisualizer() {
  if (!visualizerInitialized) return;
  requestAnimationFrame(animateVisualizer);

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0, 0, els.canvas.width, els.canvas.height);

  // Compute Engine telemetry values
  let sum = 0;
  let bassSum = 0;
  for (let i = 0; i < bufferLength; i++) {
    sum += dataArray[i];
    if (i < 8) bassSum += dataArray[i];
  }
  const avgVol = sum / bufferLength;
  const avgBass = bassSum / 8;

  // Calculate simulated telemetry gauges
  let rpm = 0;
  let boost = "-Inf";
  
  if (state.isPlaying && avgVol > 0) {
    rpm = Math.floor(2500 + (avgBass / 255) * 9800); // 2.5K to 12.3K RPM
    boost = ((avgVol / 255) * 12).toFixed(1) + " dB";
  } else {
    rpm = state.isPlaying ? 2300 : 0;
    boost = state.isPlaying ? "0.2 dB" : "-Inf";
  }

  els.rpmGauge.textContent = rpm.toLocaleString();
  els.dbGauge.textContent = boost;

  // Get active styling colors from document properties
  const activeColor = getComputedStyle(document.body).getPropertyValue('--primary-color').trim() || '#e50914';
  const glowColor = getComputedStyle(document.body).getPropertyValue('--primary-glow').trim() || 'rgba(229, 9, 20, 0.4)';

  if (visualizerMode === 'bars') {
    // Render Telemetry Equilateral frequency bars
    const barWidth = (els.canvas.width / bufferLength) * 1.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = (dataArray[i] / 255) * (els.canvas.height - 20);

      // Create glowing linear gradient
      const grad = ctx.createLinearGradient(0, els.canvas.height, 0, els.canvas.height - barHeight);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
      grad.addColorStop(0.5, activeColor);
      grad.addColorStop(1, '#ffffff');

      ctx.fillStyle = grad;
      ctx.fillRect(x, els.canvas.height - barHeight, barWidth - 4, barHeight);

      // Top Peak Dot
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x, els.canvas.height - barHeight - 2, barWidth - 4, 2);

      x += barWidth;
    }
  } else {
    // Render Wave oscilloscope line
    ctx.lineWidth = 3;
    ctx.strokeStyle = activeColor;
    ctx.shadowBlur = 15;
    ctx.shadowColor = glowColor;
    ctx.beginPath();

    const sliceWidth = els.canvas.width * 1.0 / bufferLength;
    let x = 0;

    analyser.getByteTimeDomainData(dataArray); // Fetch waveform instead of frequency

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * els.canvas.height / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(els.canvas.width, els.canvas.height / 2);
    ctx.stroke();
    
    // Reset shadow states
    ctx.shadowBlur = 0;
  }
}

function resizeCanvas() {
  els.canvas.width = els.canvas.parentElement.clientWidth;
  els.canvas.height = els.canvas.parentElement.clientHeight - 80; // Minus the controls row
}
window.addEventListener('resize', resizeCanvas);

// ----------------------------------------------------
// UI Rendering
// ----------------------------------------------------

function renderTracksList() {
  els.homeTracksList.innerHTML = '';
  els.tracksCount.textContent = `${tracks.length} tracks`;
  
  tracks.forEach((track, i) => {
    const isPlayingClass = (i === state.currentTrackIndex) ? 'playing' : '';
    
    const row = document.createElement('div');
    row.className = `track-row ${isPlayingClass}`;
    row.dataset.id = track.id;
    row.dataset.index = i;
    
    row.innerHTML = `
      <div class="col-index">${i + 1}</div>
      <div class="col-title">
        <div class="track-title-block">
          <img src="${track.cover}" class="track-thumb" alt="${track.title}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' width=\'40\' height=\'40\'><rect width=\'24\' height=\'24\' fill=\'%23222\'/><path fill=\'%23666\' d=\'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z\'/></svg>'">
          <div class="track-details">
            <span class="track-title-text">${track.title}</span>
            <span class="track-artist-text">${track.artist}</span>
          </div>
        </div>
      </div>
      <div class="col-album">${track.album}</div>
      <div class="col-duration">${track.duration}</div>
    `;
    
    row.addEventListener('click', () => {
      loadTrack(i, true);
    });
    
    els.homeTracksList.appendChild(row);
  });
}

function renderLyrics(track) {
  els.lyricsContainer.innerHTML = '';
  if (!track.lyrics || track.lyrics.length === 0) {
    els.lyricsContainer.innerHTML = `<p class="lyric-line placeholder">No lyrics available for this track.</p>`;
    return;
  }

  track.lyrics.forEach((line, idx) => {
    const p = document.createElement('p');
    p.className = 'lyric-line';
    p.dataset.time = line.time;
    p.dataset.index = idx;
    p.textContent = line.text;
    
    // Clicking lyrics line seeks track to that timestamp
    p.addEventListener('click', () => {
      audio.currentTime = line.time;
      if (!state.isPlaying) playAudio();
    });
    
    els.lyricsContainer.appendChild(p);
  });
}

function syncLyrics(time) {
  const currentTrack = tracks[state.currentTrackIndex];
  if (!currentTrack.lyrics || currentTrack.lyrics.length === 0) return;

  const lines = els.lyricsContainer.querySelectorAll('.lyric-line');
  let activeIndex = -1;

  for (let i = 0; i < currentTrack.lyrics.length; i++) {
    if (time >= currentTrack.lyrics[i].time) {
      activeIndex = i;
    } else {
      break;
    }
  }

  if (activeIndex !== -1) {
    lines.forEach((line, i) => {
      line.classList.remove('active', 'passed');
      if (i === activeIndex) {
        line.classList.add('active');
        
        // Auto scroll lyrics centered inside viewport
        const parent = els.lyricsContainer.parentElement;
        const offset = line.offsetTop - (parent.clientHeight / 2) + (line.clientHeight / 2);
        parent.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
      } else if (i < activeIndex) {
        line.classList.add('passed');
      }
    });
  }
}

// ----------------------------------------------------
// Playlist Operations
// ----------------------------------------------------

function createPlaylist(name) {
  if (!name.trim()) return;
  const id = 'playlist_' + Date.now();
  const newPlaylist = {
    id: id,
    name: name,
    tracks: [] // stores track IDs
  };
  state.playlists.push(newPlaylist);
  savePlaylistsToStorage();
  
  renderSidebarPlaylists();
  renderPlaylistsGrid();
}

function deletePlaylist(id) {
  state.playlists = state.playlists.filter(pl => pl.id !== id);
  savePlaylistsToStorage();
  renderSidebarPlaylists();
  renderPlaylistsGrid();
  showSection('home');
}

function toggleAddTrackToPlaylist(playlistId, trackId) {
  const pl = state.playlists.find(p => p.id === playlistId);
  if (!pl) return;
  
  const idx = pl.tracks.indexOf(trackId);
  if (idx === -1) {
    pl.tracks.push(trackId);
  } else {
    pl.tracks.splice(idx, 1);
  }
  
  savePlaylistsToStorage();
  if (state.activeSection === 'playlist-detail' && state.activePlaylistId === playlistId) {
    openPlaylistDetail(playlistId);
  }
}

function savePlaylistsToStorage() {
  localStorage.setItem('custom-playlists', JSON.stringify(state.playlists));
}

function renderSidebarPlaylists() {
  els.sidebarPlaylists.innerHTML = '';
  
  // Custom user playlists
  state.playlists.forEach(pl => {
    const li = document.createElement('li');
    li.className = 'playlist-item';
    li.dataset.id = pl.id;
    li.innerHTML = `
      <span>${pl.name}</span>
      <button class="icon-btn-small delete-pl-btn" data-id="${pl.id}">
        <svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
      </button>
    `;
    
    li.addEventListener('click', (e) => {
      if (e.target.closest('.delete-pl-btn')) {
        deletePlaylist(pl.id);
      } else {
        openPlaylistDetail(pl.id);
      }
    });
    
    els.sidebarPlaylists.appendChild(li);
  });
}

function renderPlaylistsGrid() {
  els.playlistsGrid.innerHTML = '';
  
  // Render Liked Playlist Card
  const likedCard = document.createElement('div');
  likedCard.className = 'playlist-card';
  likedCard.innerHTML = `
    <div class="playlist-card-art" style="background: linear-gradient(135deg, #450af5 0%, #c4efb2 100%);">
      <svg viewBox="0 0 24 24" width="48" height="48" style="color: white;"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
    </div>
    <div class="playlist-card-info">
      <span class="playlist-card-title">Liked Songs</span>
      <span class="playlist-card-meta">${state.likedTracks.length} tracks</span>
    </div>
    <button class="play-hover-btn">
      <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
    </button>
  `;
  
  likedCard.addEventListener('click', (e) => {
    if (e.target.closest('.play-hover-btn')) {
      e.stopPropagation();
      playPlaylistTracks(state.likedTracks);
    } else {
      openLikedPlaylistDetail();
    }
  });
  
  els.playlistsGrid.appendChild(likedCard);

  // Render User Custom playlists
  state.playlists.forEach(pl => {
    const card = document.createElement('div');
    card.className = 'playlist-card';
    card.dataset.id = pl.id;
    card.innerHTML = `
      <div class="playlist-card-art">
        <svg viewBox="0 0 24 24" width="40" height="40"><path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
      </div>
      <div class="playlist-card-info">
        <span class="playlist-card-title">${pl.name}</span>
        <span class="playlist-card-meta">${pl.tracks.length} tracks</span>
      </div>
      <button class="play-hover-btn">
        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
      </button>
    `;
    
    card.addEventListener('click', (e) => {
      if (e.target.closest('.play-hover-btn')) {
        e.stopPropagation();
        playPlaylistTracks(pl.tracks);
      } else {
        openPlaylistDetail(pl.id);
      }
    });
    
    els.playlistsGrid.appendChild(card);
  });
}

function openPlaylistDetail(playlistId) {
  state.activePlaylistId = playlistId;
  const pl = state.playlists.find(p => p.id === playlistId);
  if (!pl) return;

  showSection('playlist-detail');
  els.playlistName.textContent = pl.name;
  els.playlistMeta.textContent = `${pl.tracks.length} tracks`;
  els.playlistDelete.classList.remove('hidden');
  els.playlistArt.innerHTML = `<svg viewBox="0 0 24 24" width="64" height="64"><path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`;
  els.playlistArt.style.background = `linear-gradient(135deg, var(--panel-border) 0%, rgba(255,255,255,0.02) 100%)`;

  renderPlaylistTracks(pl.tracks, pl.id);
}

function openLikedPlaylistDetail() {
  state.activePlaylistId = 'liked';
  showSection('playlist-detail');
  els.playlistName.textContent = "Liked Songs";
  els.playlistMeta.textContent = `${state.likedTracks.length} tracks`;
  els.playlistDelete.classList.add('hidden'); // Hide delete button for system lists
  els.playlistArt.innerHTML = `<svg viewBox="0 0 24 24" width="64" height="64" style="color: white;"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
  els.playlistArt.style.background = `linear-gradient(135deg, #450af5 0%, #c4efb2 100%)`;

  renderPlaylistTracks(state.likedTracks, 'liked');
}

function renderPlaylistTracks(trackIds, playlistId) {
  els.playlistDetailTracks.innerHTML = '';
  
  if (trackIds.length === 0) {
    els.playlistDetailTracks.innerHTML = `<p class="lyric-line placeholder" style="margin-top: 40px;">No tracks in this playlist yet. Go to Home to add tracks!</p>`;
    return;
  }

  trackIds.forEach((tId, idx) => {
    const trackIndex = tracks.findIndex(t => t.id === tId);
    if (trackIndex === -1) return;
    const track = tracks[trackIndex];
    
    const row = document.createElement('div');
    row.className = `track-row ${(trackIndex === state.currentTrackIndex) ? 'playing' : ''}`;
    row.innerHTML = `
      <div class="col-index">${idx + 1}</div>
      <div class="col-title">
        <div class="track-title-block">
          <img src="${track.cover}" class="track-thumb" alt="${track.title}">
          <div class="track-details">
            <span class="track-title-text">${track.title}</span>
            <span class="track-artist-text">${track.artist}</span>
          </div>
        </div>
      </div>
      <div class="col-album">${track.album}</div>
      <div class="col-duration">
        <span>${track.duration}</span>
        <button class="remove-track-btn" style="background:transparent; border:none; color:var(--text-muted); cursor:pointer; margin-left:12px;" title="Remove track">
          <svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
        </button>
      </div>
    `;

    row.addEventListener('click', (e) => {
      if (e.target.closest('.remove-track-btn')) {
        e.stopPropagation();
        if (playlistId === 'liked') {
          toggleLikeTrack(track.id);
          openLikedPlaylistDetail();
        } else {
          toggleAddTrackToPlaylist(playlistId, track.id);
        }
      } else {
        loadTrack(trackIndex, true);
      }
    });

    els.playlistDetailTracks.appendChild(row);
  });
}

function playPlaylistTracks(trackIds) {
  if (trackIds.length === 0) return;
  const index = tracks.findIndex(t => t.id === trackIds[0]);
  if (index !== -1) {
    loadTrack(index, true);
  }
}

// ----------------------------------------------------
// Favorites System
// ----------------------------------------------------

function toggleLikeTrack(id) {
  const idx = state.likedTracks.indexOf(id);
  if (idx === -1) {
    state.likedTracks.push(id);
  } else {
    state.likedTracks.splice(idx, 1);
  }
  localStorage.setItem('liked-tracks', JSON.stringify(state.likedTracks));
  updateLikesUI();
  renderPlaylistsGrid();
}

function updateLikesUI() {
  const currentTrack = tracks[state.currentTrackIndex];
  const isLiked = state.likedTracks.includes(currentTrack.id);

  if (isLiked) {
    els.playerLikeBtn.classList.add('liked');
    if (els.heroLikeBtn && state.currentTrackIndex === 0) {
      els.heroLikeBtn.classList.add('btn-primary');
      els.heroLikeBtn.classList.remove('btn-secondary');
      els.heroLikeBtn.querySelector('span').textContent = "FAVORITED";
    }
  } else {
    els.playerLikeBtn.classList.remove('liked');
    if (els.heroLikeBtn && state.currentTrackIndex === 0) {
      els.heroLikeBtn.classList.add('btn-secondary');
      els.heroLikeBtn.classList.remove('btn-primary');
      els.heroLikeBtn.querySelector('span').textContent = "FAVORITE";
    }
  }
}

// ----------------------------------------------------
// Play Queue Operations
// ----------------------------------------------------

function updateQueueUI() {
  const currentTrack = tracks[state.currentTrackIndex];
  
  els.queueNowPlaying.innerHTML = `
    <img src="${currentTrack.cover}" alt="${currentTrack.title}">
    <div class="queue-track-info">
      <span class="queue-track-name">${currentTrack.title}</span>
      <span class="queue-track-artist">${currentTrack.artist}</span>
    </div>
  `;

  els.queueListContainer.innerHTML = '';
  
  // Next songs in tracklist
  let count = 0;
  for (let i = state.currentTrackIndex + 1; i < tracks.length; i++) {
    const track = tracks[i];
    const item = document.createElement('div');
    item.className = 'queue-track-card';
    item.innerHTML = `
      <img src="${track.cover}" alt="${track.title}">
      <div class="queue-track-info">
        <span class="queue-track-name">${track.title}</span>
        <span class="queue-track-artist">${track.artist}</span>
      </div>
    `;
    item.addEventListener('click', () => {
      loadTrack(i, true);
    });
    els.queueListContainer.appendChild(item);
    count++;
  }

  // Wrap around queue for remaining tracks
  for (let i = 0; i < state.currentTrackIndex; i++) {
    const track = tracks[i];
    const item = document.createElement('div');
    item.className = 'queue-track-card';
    item.innerHTML = `
      <img src="${track.cover}" alt="${track.title}">
      <div class="queue-track-info">
        <span class="queue-track-name">${track.title}</span>
        <span class="queue-track-artist">${track.artist}</span>
      </div>
    `;
    item.addEventListener('click', () => {
      loadTrack(i, true);
    });
    els.queueListContainer.appendChild(item);
    count++;
  }

  if (count === 0) {
    els.queueListContainer.innerHTML = `<p class="lyric-line placeholder">No upcoming songs</p>`;
  }
}

// ----------------------------------------------------
// UI Navigation / Theme Switching
// ----------------------------------------------------

function showSection(sectionId) {
  state.activeSection = sectionId;
  
  els.sectionHome.classList.add('hidden');
  els.sectionSearch.classList.add('hidden');
  els.sectionPlaylistDetail.classList.add('hidden');
  
  els.navHome.classList.remove('active');
  els.navSearchMenu.classList.remove('active');
  
  if (sectionId === 'home') {
    els.sectionHome.classList.remove('hidden');
    els.navHome.classList.add('active');
    els.searchContainer.classList.add('hidden');
  } else if (sectionId === 'search') {
    els.sectionSearch.classList.remove('hidden');
    els.navSearchMenu.classList.add('active');
    els.searchContainer.classList.remove('hidden');
    els.searchInput.focus();
  } else if (sectionId === 'playlist-detail') {
    els.sectionPlaylistDetail.classList.remove('hidden');
  }
}

// Search Functionality
function handleSearch(query) {
  els.searchTracksList.innerHTML = '';
  
  if (!query.trim()) {
    els.searchEmpty.classList.remove('hidden');
    return;
  }

  const results = tracks.filter(t => 
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.artist.toLowerCase().includes(query.toLowerCase()) ||
    t.album.toLowerCase().includes(query.toLowerCase())
  );

  if (results.length === 0) {
    els.searchEmpty.classList.remove('hidden');
    return;
  }

  els.searchEmpty.classList.add('hidden');
  results.forEach(track => {
    const idx = tracks.findIndex(t => t.id === track.id);
    const row = document.createElement('div');
    row.className = `track-row ${(idx === state.currentTrackIndex) ? 'playing' : ''}`;
    row.innerHTML = `
      <div class="col-index">
        <svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
      </div>
      <div class="col-title">
        <div class="track-title-block">
          <img src="${track.cover}" class="track-thumb" alt="${track.title}">
          <div class="track-details">
            <span class="track-title-text">${track.title}</span>
            <span class="track-artist-text">${track.artist}</span>
          </div>
        </div>
      </div>
      <div class="col-album">${track.album}</div>
      <div class="col-duration">${track.duration}</div>
    `;

    row.addEventListener('click', () => {
      loadTrack(idx, true);
    });

    els.searchTracksList.appendChild(row);
  });
}

// Theme Handlers
function initTheme() {
  const savedTheme = localStorage.getItem('app-theme') || 'f1';
  setTheme(savedTheme);
}

function setTheme(themeName) {
  document.body.className = '';
  document.body.classList.add(`theme-${themeName}`);
  localStorage.setItem('app-theme', themeName);

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.theme === themeName) {
      btn.classList.add('active');
    }
  });
}

// ----------------------------------------------------
// Setup Listeners
// ----------------------------------------------------

function setupEventListeners() {
  // Navigation Toggles
  els.navHome.addEventListener('click', (e) => { e.preventDefault(); showSection('home'); });
  els.navSearchMenu.addEventListener('click', (e) => { e.preventDefault(); showSection('search'); });
  els.navLibrary.addEventListener('click', (e) => { e.preventDefault(); openLikedPlaylistDetail(); });
  
  els.mobileToggle.addEventListener('click', () => {
    els.sidebar.classList.toggle('mobile-active');
  });

  // Search input events
  els.searchInput.addEventListener('input', (e) => {
    handleSearch(e.target.value);
  });

  // Playback Control Triggers
  els.mainPlayBtn.addEventListener('click', togglePlay);
  els.prevBtn.addEventListener('click', prevTrack);
  els.nextBtn.addEventListener('click', nextTrack);
  els.playerLikeBtn.addEventListener('click', () => {
    toggleLikeTrack(tracks[state.currentTrackIndex].id);
  });

  // Hero play button trigger
  els.heroPlayBtn.addEventListener('click', () => {
    if (state.currentTrackIndex !== 0) {
      loadTrack(0, true);
    } else {
      togglePlay();
    }
  });
  
  els.heroLikeBtn.addEventListener('click', () => {
    toggleLikeTrack(tracks[0].id);
  });

  // Drawer / Side panels tabs
  els.tabLyrics.addEventListener('click', () => {
    els.tabLyrics.classList.add('active');
    els.tabSpecs.classList.remove('active');
    els.panelLyrics.classList.add('active');
    els.panelSpecs.classList.remove('active');
  });

  els.tabSpecs.addEventListener('click', () => {
    els.tabSpecs.classList.add('active');
    els.tabLyrics.classList.remove('active');
    els.panelSpecs.classList.add('active');
    els.panelLyrics.classList.remove('active');
  });

  els.lyricsToggle.addEventListener('click', () => {
    els.rightDrawer.classList.toggle('hidden');
    // Adjust canvas after drawer collapses
    setTimeout(resizeCanvas, 350);
  });

  els.queueToggle.addEventListener('click', () => {
    els.queueDrawer.classList.toggle('hidden');
  });

  els.closeQueueBtn.addEventListener('click', () => {
    els.queueDrawer.classList.add('hidden');
  });

  // Modal actions
  els.createPlaylistBtn.addEventListener('click', () => {
    els.playlistModal.classList.remove('hidden');
    els.playlistNameInput.value = '';
    els.playlistNameInput.focus();
  });

  els.modalCancel.addEventListener('click', () => {
    els.playlistModal.classList.add('hidden');
  });

  els.modalSubmit.addEventListener('click', () => {
    const name = els.playlistNameInput.value;
    if (name.trim()) {
      createPlaylist(name);
      els.playlistModal.classList.add('hidden');
    }
  });

  els.playlistNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      els.modalSubmit.click();
    }
  });

  // Playlist detail delete
  els.playlistDelete.addEventListener('click', () => {
    if (state.activePlaylistId && state.activePlaylistId !== 'liked') {
      deletePlaylist(state.activePlaylistId);
    }
  });

  els.playlistPlay.addEventListener('click', () => {
    if (state.activePlaylistId === 'liked') {
      playPlaylistTracks(state.likedTracks);
    } else {
      const pl = state.playlists.find(p => p.id === state.activePlaylistId);
      if (pl) playPlaylistTracks(pl.tracks);
    }
  });

  // Visualizer Mode Switches
  els.visModeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      els.visModeBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      visualizerMode = e.target.dataset.mode;
    });
  });

  // Themes list toggle buttons
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      setTheme(e.target.dataset.theme);
    });
  });

  // Shuffle & Repeat Modes triggers
  els.shuffleBtn.addEventListener('click', () => {
    state.isShuffle = !state.isShuffle;
    els.shuffleBtn.classList.toggle('active', state.isShuffle);
    
    if (state.isShuffle) {
      // Fisher-Yates shuffle queue
      for (let i = state.queue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [state.queue[i], state.queue[j]] = [state.queue[j], state.queue[i]];
      }
    } else {
      // Revert queue to original index ordering
      state.queue = [...state.originalQueue];
    }
    updateQueueUI();
  });

  els.repeatBtn.addEventListener('click', () => {
    if (state.repeatMode === 'off') {
      state.repeatMode = 'all';
      els.repeatBtn.classList.add('active');
      els.repeatBtn.setAttribute('title', 'Repeat (All)');
      els.repeatIndicator.style.background = 'var(--primary-color)';
    } else if (state.repeatMode === 'all') {
      state.repeatMode = 'one';
      els.repeatBtn.classList.add('active');
      els.repeatBtn.setAttribute('title', 'Repeat (One)');
      els.repeatIndicator.innerHTML = '1';
      els.repeatIndicator.style.fontSize = '8px';
      els.repeatIndicator.style.color = 'white';
      els.repeatIndicator.style.lineHeight = '4px';
    } else {
      state.repeatMode = 'off';
      els.repeatBtn.classList.remove('active');
      els.repeatBtn.setAttribute('title', 'Repeat (Off)');
      els.repeatIndicator.innerHTML = '';
      els.repeatIndicator.style.background = 'transparent';
    }
  });

  els.volumeBtn.addEventListener('click', toggleMute);
}

// ----------------------------------------------------
// Helpers
// ----------------------------------------------------

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// Start execution
window.addEventListener('DOMContentLoaded', init);
