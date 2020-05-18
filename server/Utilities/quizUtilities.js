'use strict'


// DEAFAULT Quizess
const quizess = [ 
    {
        id: '37i9dQZF1DWTJ7xPn4vNaz',
        image: 'https://i.scdn.co/image/ab67706f00000002f0c5c7ed627d220ee59581ca',
        description: '70s'
    },
    {
        id: '37i9dQZF1DX4UtSsGT1Sbe',
        image: 'https://i.scdn.co/image/ab67706f000000023e0b7acc87d7f155120dc026',
        description: '80s'
    },
    {
        id: '37i9dQZF1DXbTxeAdrVG2l',
        image: 'https://i.scdn.co/image/ab67706f00000002150ff1f5d84660a4d013c9fa',
        description: '90s'
    }
]

const shuffleTracks = (tracks) => {
    const tracksCopy = [...tracks]
    let currentIndex = tracksCopy.length
    let temporaryValue = 0
    let randomIndex = 0

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      temporaryValue = tracksCopy[currentIndex]
      tracksCopy[currentIndex] = tracksCopy[randomIndex]
      tracksCopy[randomIndex] = temporaryValue
    }
    return tracksCopy
}


const getRandomNumber = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

module.exports = { quizess, shuffleTracks, getRandomNumber }