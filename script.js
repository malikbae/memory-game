const arrayGambar = [
    {
      nama: "pizza",
      gambar: "img/gambar-1.jpg"
    },
    {
      nama: "ice-cream",
      gambar: "img/gambar-2.jpg"
    },
    {
      nama: "cake",
      gambar: "img/gambar-3.jpg"
    },
    {
      nama: "egg",
      gambar: "img/gambar-4.jpg"
    },
    {
      nama: "donut",
      gambar: "img/gambar-5.jpg"
    },
    {
      nama: "apple",
      gambar: "img/gambar-6.jpg"
    }
];

function acakArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const arrayDuplikat = arrayGambar.concat(arrayGambar);
const arrayAcak = acakArray(arrayDuplikat);
const container = document.querySelector('.container');
let pilihan = [];
let idPilihan = [];
let timer;
let spanTimer = document.querySelector('.timer');
const startButton = document.querySelector('.custom-btn');
const spanTitle = document.querySelector('.id-title');
let permainanDimulai = false;
let jumlahKartu = 0;

function runTimer() {
    let sec = 40;
    timer = setInterval(()=> {
        spanTitle.textContent = 'Time Remaining';
        spanTitle.classList.add('title');
        spanTimer.innerHTML = sec;
        setTimeout(function() {
            if (sec === 0) {
                clearInterval(timer);
                if (!semuaKartuTerbuka()) {
                    setTimeout(() => {
                        alert('Waktu Habis, Kamu Kalah!');
                        location.reload();
                    }, 500);
                }
            }
            sec--;
        }, 2000);
    }, 1000);
}

function semuaKartuTerbuka() {
    return jumlahKartu === arrayAcak.length / 2;
}

function start() {
    if (!permainanDimulai) {
        startButton.classList.add('fade-out');
        setTimeout(function() {
            startButton.style.display = 'none';
        }, 350);
        runTimer();
        permainanDimulai = true;

        cards.forEach(function(card) {
            card.addEventListener('click', kartuClickHandler);
        });
    }
}

function kartuClickHandler(e) {
    const card = e.currentTarget;
    card.style.transform = 'rotateY(180deg)';
    const cardBackInCard = card.querySelector('.card-back');
    const idCardBack = cardBackInCard.getAttribute('data-id');
    pilihan.push(arrayAcak[idCardBack].nama);
    idPilihan.push(idCardBack);
    if (pilihan.length === 2) {
        cekGambar();
        if (semuaKartuTerbuka()) {
            setTimeout(() => {
                alert('Selamat, Kamu Menang!');
                location.reload();
            }, 1000);
        }
    }
}

for (let i = 0; i < arrayAcak.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    
    const frontImage = document.createElement('img');
    frontImage.src = 'img/hide-image.jpg';
    
    cardFront.appendChild(frontImage);
    
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.setAttribute('data-id', i);
    
    const backImage = document.createElement('img');
    backImage.src = arrayAcak[i].gambar;
    
    cardBack.appendChild(backImage);
    
    card.appendChild(cardFront);
    card.appendChild(cardBack);
    
    container.appendChild(card);
}

const cards = document.querySelectorAll('.card');

function cekGambar() {
    const idPilihanSatu = idPilihan[0];
    const idPilihanDua = idPilihan[1];
    const kartuPertama = document.querySelector(`.card-back[data-id="${idPilihanSatu}"]`).parentNode;
    const kartuKedua = document.querySelector(`.card-back[data-id="${idPilihanDua}"]`).parentNode;

    if (idPilihanSatu == idPilihanDua) {
        kartuPertama.style.transform = 'rotateY(0deg)';
    } else if (pilihan[0] == pilihan[1]) {
        setTimeout(function() {
            kartuPertama.style.visibility = 'hidden';
            kartuKedua.style.visibility = 'hidden';
        }, 1000);
        jumlahKartu++;
    } else {
        setTimeout(function() {
            kartuPertama.style.transform = 'rotateY(0deg)';
            kartuKedua.style.transform = 'rotateY(0deg)';
        }, 1000);
    }

    pilihan = [];
    idPilihan = [];
}