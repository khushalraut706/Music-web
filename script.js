const songs = [
      {
        title: "soundhelix ",
        artist: "Artist 1",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      },
      {
        title: "Calm Down",
        artist: "Artist 2",
        src: "https://youtube.com/shorts/v8LANbqV8e8?si=TpB7T_5ryI-X2m55"
      },
      {
        title: "Avenged Sevenfold ",
        artist: "Artist 3",
        src: "https://youtube.com/shorts/CuoR70zT4do?si=1t7y8G5uOFpXVzIW"
      }
    ];

    const audio = document.getElementById('audio');
    const title = document.getElementById('title');
    const artist = document.getElementById('artist');
    const playBtn = document.getElementById('play');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const progress = document.getElementById('progress');
    const progressContainer = document.getElementById('progress-container');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const volumeControl = document.getElementById('volume');
    const playlistEl = document.getElementById('playlist');

    let currentSong = 0;
    let isPlaying = false;

    
    function loadSong(songIndex) {
      const song = songs[songIndex];
      title.textContent = song.title;
      artist.textContent = song.artist;
      audio.src = song.src;
      updatePlaylistUI();
    }

    
    function playSong() {
      audio.play();
      playBtn.textContent = '⏸️';
      isPlaying = true;
    }

  
    function pauseSong() {
      audio.pause();
      playBtn.textContent = '▶️';
      isPlaying = false;
    }


    playBtn.addEventListener('click', () => {
      isPlaying ? pauseSong() : playSong();
    });

    
    prevBtn.addEventListener('click', () => {
      currentSong = (currentSong - 1 + songs.length) % songs.length;
      loadSong(currentSong);
      playSong();
    });

    
    nextBtn.addEventListener('click', () => {
      currentSong = (currentSong + 1) % songs.length;
      loadSong(currentSong);
      playSong();
    });

    
    audio.addEventListener('timeupdate', () => {
      const { currentTime, duration } = audio;
      const percent = (currentTime / duration) * 100;
      progress.style.width = `${percent}%`;

      currentTimeEl.textContent = formatTime(currentTime);
      durationEl.textContent = formatTime(duration);
    });

  
    progressContainer.addEventListener('click', (e) => {
      const width = progressContainer.clientWidth;
      const clickX = e.offsetX;
      const duration = audio.duration;
      audio.currentTime = (clickX / width) * duration;
    });

    
    volumeControl.addEventListener('input', () => {
      audio.volume = volumeControl.value;
    });

  
    function formatTime(time) {
      if (isNaN(time)) return '0:00';
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    }

    
    audio.addEventListener('ended', () => {
      currentSong = (currentSong + 1) % songs.length;
      loadSong(currentSong);
      playSong();
    });

    
    function updatePlaylistUI() {
      playlistEl.innerHTML = '';
      songs.forEach((song, index) => {
        const div = document.createElement('div');
        div.textContent = `${song.title} - ${song.artist}`;
        div.classList.add('playlist-item');
        if (index === currentSong) div.classList.add('active');
        div.addEventListener('click', () => {
          currentSong = index;
          loadSong(currentSong);
          playSong();
        });
        playlistEl.appendChild(div);
      });
    }

    
    loadSong(currentSong);
    volumeControl.value = 0.5;
    audio.volume = 0.5;