console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0; 
let audioElement = new Audio("Source/songs/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Tujhe kitna chane", filePath: "Source/songs/1.mp3", coverPath: "Source/covers/1.jpg"},
    {songName: "Taweez bana ke", filePath: "Source/songs/2.mp3", coverPath: "Source/covers/2.jpg"},
    {songName: "Kesariya", filePath: "Source/songs/3.mp3", coverPath: "Source/covers/3.jpg"},
    {songName: "Radhe", filePath: "Source/songs/4.mp3", coverPath: "Source/covers/4.jpg"},
    {songName: "Ghungroo", filePath: "Source/songs/5.mp3", coverPath: "Source/covers/5.jpg"},
    {songName: "Nashe si chadgai", filePath: "Source/songs/6.mp3", coverPath: "Source/covers/6.jpg"},
    {songName: "Zaroori tha", filePath: "Source/songs/7.mp3", coverPath: "Source/covers/7.jpg"},
    {songName: "Zalima", filePath: "Source/songs/8.mp3", coverPath: "Source/covers/8.jpg"},
    {songName: "Hawayein", filePath: "Source/songs/9.mp3", coverPath: "Source/covers/9.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

// Handel play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    // Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e)=>{
         makeAllPlays();
         songIndex = parseInt(e.target.id);
         e.target.classList.remove('fa-circle-play');
         e.target.classList.add('fa-circle-pause');
         audioElement.src = `Source/songs/${songIndex+1}.mp3`;
         masterSongName.innerText = songs[songIndex].songName;
         audioElement.currentTime = 0;
         audioElement.play();
         gif.style.opacity = 1;
         masterPlay.classList.remove('fa-circle-play');
         masterPlay.classList.add('fa-circle-pause');
    })   
})


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=8){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `Source/songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `Source/songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})


