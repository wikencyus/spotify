const songList = document.getElementById('songList')
var box = document.getElementById('box');

const search = () => {
    box.style.display = box.style.display === 'block' ? 'none' : 'block';
    
    const myInput =  document.getElementById('myInput').value;
    const apiURL = `https://lolhuman.xyz/api/spotifysearch?apikey=wikenn&query=${myInput}`;
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        const songs = data.result;

        songs.forEach(song => {
            const songDiv = document.createElement('div');
            songDiv.classList.add('songList');
      
            const judul = document.createElement('p');
            judul.id = 'judul';
            judul.textContent = `Judul : ${song.title}`;
            judul.style.marginTop = "60px";
            judul.style.fontSize = "20px"
            judul.style.fontWeight = "bold";
            songDiv.appendChild(judul);
      
            const byArtis = document.createElement('p');
            byArtis.id = 'byArtis';
            byArtis.textContent = `Artis : ${song.artists}`;
            byArtis.style.marginBottom = "25px";
            byArtis.style.fontSize = "18px"
            byArtis.style.fontWeight = "500"
            songDiv.appendChild(byArtis);
      
            const link = document.createElement('a');
            link.id = 'link';
            link.href = song.preview_url ? song.preview_url : '#';
            link.textContent = 'Link : ' + song.preview_url;
            link.target = '_blank';
            link.style.marginBottom = "10px"
            link.style.fontSize = "16px"
            link.style.fontWeight = "500"
            songDiv.appendChild(link);
      
            const playButton = document.createElement('button');
            playButton.textContent = 'Play';
            playButton.addEventListener('click', () => playAudio(song.preview_url));
            playButton.style.backgroundColor = 'blue';
            playButton.style.color = 'white';
            playButton.style.padding = "10px 20px"
            playButton.style.border =  "none";
            playButton.style.borderRadius = "5px";
            playButton.style.cursor = "pointer";
            playButton.style.marginTop = "5px"
            playButton.style.transition = "all .3s ease-in-out";

            songDiv.appendChild(playButton);

            const garis = document.createElement('div');
            garis.style.width = "100%";
            garis.style.marginTop = "20px";
            garis.style.height = "2px";
            garis.style.backgroundColor = "black";
            songDiv.appendChild(garis);

            playButton.addEventListener('mouseover', () => {
                playButton.style.backgroundColor = 'darkblue';
            })

            playButton.addEventListener('mouseout', () => {
                playButton.style.backgroundColor = 'blue';
            })
      
            songList.appendChild(songDiv);
        });
    })
}

function playAudio(audioUrl) {
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioUrl) {
      audioPlayer.src = audioUrl;
      audioPlayer.play();
    } else {
      alert('Lagu tidak di temukan');
    }
}

const clearChace = () => {
    songList.innerHTML = '';
    document.getElementById('myInput').value =  '';
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
}
