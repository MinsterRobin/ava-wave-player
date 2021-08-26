const audioSources = [
    {
        title: "Virtual Riot - Bass Loop Bark 1 150 F",
        src: 'audio/V_RIOT_bass_loop_bark_01_150_F.wav',
        barGap: 0,
        barWidth: 0
    },
    {
        title: "Virtual Riot - Bass Loop Bark 2 150 F",
        src: 'audio/V_RIOT_bass_loop_bark_02_150_F.wav',
        barGap: 4,
        barWidth: 2
    },
    {
        title: "Virtual Riot - Bass Loop Almost Riddim 1 150 F",
        src: 'audio/V_RIOT_bass_loop_almost_riddim_01_150_F.wav',
        barGap: 2,
        barWidth: 2
    },
    {
        title: "Virtual Riot - Bass Loop Almost Riddim 2 150 F",
        src: 'audio/V_RIOT_bass_loop_almost_riddim_02_150_F.wav',
        barGap: 10,
        barWidth: 1
    },
    {
        title: "Virtual Riot - Bass Loop Almost Riddim 2 150 F",
        src: 'audio/V_RIOT_bass_loop_almost_riddim_02_150_F.wav',
        barGap: 4,
        barWidth: 5
    },
    {
        title: "Virtual Riot - Bass Loop Almost Riddim 2 150 F",
        src: 'audio/V_RIOT_bass_loop_almost_riddim_02_150_F.wav',
        barGap: 10,
        barWidth: 10
    }
];

const waveSurfers = [];

for (let i = 0; i < audioSources.length; i++) {

    /*-------------------- HTML --------------------*/
    let newPlayer = document.createElement("div");
    let newTitle = document.createElement("p");
    let newSubContainer = document.createElement("div");
    let newControl = document.createElement("i");
    let newWaveform = document.createElement("div");
    let newInfos = document.createElement("p");
    newPlayer.className = "player";
    newSubContainer.className = "player__sub-container";
    newTitle.innerText = audioSources[i].title;
    newTitle.className = "player__title";
    newControl.id = "btn-play-" + i;
    newControl.className = "btn-play fa fa-play";
    newWaveform.id = "waveform-" + i;
    newWaveform.className = "player__waveform";
    newInfos.className = "player__infos";
    newInfos.innerText = "gap: " + audioSources[i].barGap + " width: " + audioSources[i].barWidth;
    newPlayer.appendChild(newTitle);
    newPlayer.appendChild(newSubContainer);
    newSubContainer.appendChild(newControl);
    newSubContainer.appendChild(newWaveform);
    newPlayer.appendChild(newInfos);

    document.getElementById("players-container").appendChild(newPlayer);

    const wavesurfer = WaveSurfer.create({
        container: '#waveform-' + (i),
        waveColor: "#FFFFFF",
        fillParent: true,
        scrollParent: false,
        hideScrollbar: true,
        height: 50,
        barWidth: audioSources[i].barWidth,
        barGap: audioSources[i].barGap,
        progressColor: "#2D7AFC"
    });

    wavesurfer.on('finish', function () { document.getElementById('btn-play-' + (i )).className = 'btn-play fas fa-play fa-inverse' });
    wavesurfer.on('play', function () { document.getElementById('btn-play-' + (i)).className = 'btn-play fas fa-pause fa-inverse' });
    wavesurfer.on('pause', function () { document.getElementById('btn-play-' + (i)).className = 'btn-play fas fa-play fa-inverse' });
    document.getElementById("btn-play-" + (i)).onclick = function () {play(i)};
    document.getElementById("waveform-" + (i)).ondblclick = function () {play(i)};

    waveSurfers.push(wavesurfer);
}

function play(n) {
    for (let j = 0; j < audioSources.length; j++) {
        if (j !== n && waveSurfers[j].isPlaying()) {
            waveSurfers[j].stop();
        }
    }
    waveSurfers[n].playPause();
}

for (let i = 0; i < audioSources.length; i++) {
    waveSurfers[i].load(audioSources[i].src);
}