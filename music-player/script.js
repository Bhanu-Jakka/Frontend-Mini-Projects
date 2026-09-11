const songs = [
    {
        title: "Dreams",
        artist: "SoundHelix",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "Adventure",
        artist: "SoundHelix",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "Summer",
        artist: "SoundHelix",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];

let currentSong = 0;

const audio = new Audio();

const title = document.getElementById("song-title");
const artist = document.getElementById("artist");
const playButton = document.getElementById("play");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const previousButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const playlistSongs = document.querySelectorAll(".song");

function loadSong(index) {
    currentSong = index;

    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    audio.src = songs[index].source;

    playlistSongs.forEach(function(song) {
        song.classList.remove("active");
    });

    playlistSongs[index].classList.add("active");

    progress.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";
}

function playSong() {
    audio.play();
    playButton.textContent = "⏸";
}

function pauseSong() {
    audio.pause();
    playButton.textContent = "▶";
}

playButton.addEventListener("click", function() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

nextButton.addEventListener("click", function() {
    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();
});

previousButton.addEventListener("click", function() {
    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    playSong();
});

audio.addEventListener("loadedmetadata", function() {
    progress.max = audio.duration;
    duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", function() {
    progress.value = audio.currentTime;
    currentTime.textContent = formatTime(audio.currentTime);
});

progress.addEventListener("input", function() {
    audio.currentTime = progress.value;
});

volume.addEventListener("input", function() {
    audio.volume = volume.value;
});

audio.addEventListener("ended", function() {
    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();
});

playlistSongs.forEach(function(song) {
    song.addEventListener("click", function() {
        const index = Number(song.dataset.index);

        loadSong(index);
        playSong();
    });
});

function formatTime(time) {
    if (isNaN(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

loadSong(0);
audio.volume = 1;