function setupGame() {
  const startButton = document.getElementById('start-button')
  const scoreElement = document.getElementById('scorecard')
  const gunTurrets = document.getElementById('lives')
  const heroPanel = document.querySelector('.title-hero')
  const playerLounge = document.querySelector('.high-scores')
  const readInstructions = document.getElementById('open')
  const nameScreen = document.querySelector('.setting-up')
  const instructionsPanel = document.querySelector('.instructions')
  const enterName = document.querySelector('#usernameField')
  const leftPanel = document.querySelector('.game-info')
  const startAgain = document.getElementById('reset')
  const theWall = document.querySelector('.top-gunners')
  const doneReading = document.getElementById('close')


  const width = 21
  const spaceSize = width ** 2
  const space = document.querySelector('.space')
  const cells = []
  let bang1 = null
  let shell1 = null
  let shell2 = null
  let shell3 = null
  let invasion = null
  let skyBarrage = null
  let swarm = []
  let turret = 430
  let eT = [89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 111, 112, 113, 114, 115, 116, 117, 118, 119, 133, 134, 135, 136, 137, 138, 139, 155, 156, 157, 158, 159, 177, 178, 179]
  const theresALotOfEm = eT.length
  let baggage = ''
  let missileOne = null
  let laserOne = null
  let laserTwo = null
  let laserThree = null
  let ammoCounter = 0
  let score = 0
  let frontline = null
  let enemyFire = null
  const enemyAmmo = [1, 2, 3]
  let life = 3
  let noLuck = 0
  let gameOver = false
  let gameLoad = false
  let userName = ''
  const forceGet = true


  function spaceGunners(array) {
    frontline = array.filter(aliens => {
      let friendly = aliens + width
      return !!friendly !== eT.some(alien => {
        return friendly === alien
      })
    })
    if (frontline[Math.round(Math.random() * (frontline.length - 1))]) {
      return frontline[Math.round(Math.random() * (frontline.length - 1))]
    } else return Math.round(Math.random() * (eT.length - 1))
  }

  function eTMovesLeft() {
    eT = eT.map(elem => {
      return elem - 1
    })
    if (gotcha(eT)) {
      cells[missileOne].classList.remove('theFirst')
    }
    return swarm = eT.map(elem => {
      return cells[elem]
    })
  }


  function eTMovesRight() {
    eT = eT.map(elem => {
      return elem + 1
    })
    if (gotcha(eT)) {
      cells[missileOne].classList.remove('theFirst')
    }
    return swarm = eT.map(elem => {
      return cells[elem]
    })
  }

  function weReComing() {
    eT = eT.map(elem => {
      return elem + width
    })
    if (gotcha(eT)) {
      cells[missileOne].classList.remove('theFirst')
    }
    if (imTheCaptainNow(eT)) {
      clearInterval(invasion)
      clearInterval(bang1)
      ranking()
    }
    return swarm = eT.map(elem => {
      return cells[elem]
    })
  }

  function rowZ1() {
    clearInterval(bang1)
    setTimeout(() => {
      cells[missileOne].classList.remove('missile')
      missileOne = null
      ammoCounter -= 1
    }, 100)

  }

  function potShot() {
    clearInterval(shell1)
    if (laserOne === turret) {
      setTimeout(() => {
        laserOne = null
        enemyAmmo.push(1)
      }, 800)
    } else {
      setTimeout(() => {
        cells[laserOne].classList.remove('laser')
        laserOne = null
        enemyAmmo.push(1)
      }, 100)
    }
  }

  function potShot2() {
    clearInterval(shell2)
    if (laserTwo === turret) {
      setTimeout(() => {
        laserTwo = null
        enemyAmmo.push(2)
      }, 800)
    } else {
      setTimeout(() => {
        cells[laserTwo].classList.remove('laser')
        laserTwo = null
        enemyAmmo.push(2)
      }, 100)
    }
  }

  function potShot3() {
    clearInterval(shell3)
    if (laserThree === turret) {
      setTimeout(() => {
        laserThree = null
        enemyAmmo.push(3)
      }, 800)
    } else {
      setTimeout(() => {
        cells[laserThree].classList.remove('laser')
        laserThree = null
        enemyAmmo.push(3)
      }, 100)
    }
  }

  function gotcha(array) {
    return array.some((ships) => {
      return missileOne === ships
    })
  }

  //scoring features

  function weReOutOfHere() {
    if (cells[laserThree]) {
      cells[laserThree].classList.remove('laser')
    }
    if (cells[laserTwo]) {
      cells[laserTwo].classList.remove('laser')
    }
    if (cells[laserOne]) {
      cells[laserOne].classList.remove('laser')
    }
    if (eT) {
      swarm.forEach(div => {
        div.classList.remove('theFirst')
      })
    }
    if (cells[missileOne]) {
      cells[missileOne].classList.remove('missile')
    }
  }

  function ranking() {
    space.style.display = 'none'
    leftPanel.style.display = 'none'
    gunTurrets.style.display = 'none'
    playerLounge.style.display = 'flex'
    if (life === 0) {
      theWall.innerHTML = `Our guns are done!\n Your score is ${score}`
    } else if (imTheCaptainNow(eT)){
      theWall.innerHTML = `The invaders have reached the surface! Game Over\n Your score is ${score}`
    } else {
      theWall.innerHTML = `You got 'em! Game Over!\n Your score is ${score}`
    }
  }

  function amIHit() {
    eT = eT.filter((alien) => {
      return alien !== missileOne
    })
    score = scoreBoard()
    if (eT.length === 0) {
      gameOver = true
      cells[missileOne].classList.remove('implosion')
      scoreElement.innerHTML = `Score : ${score}`
      gunTurrets.innerHTML = `Lives : ${life}`
      clearInterval(invasion)
      clearInterval(bang1)
      clearInterval(shell1)
      clearInterval(shell2)
      clearInterval(shell3)
      clearInterval(skyBarrage)
      ranking()
    } else {
      clearInterval(bang1)
      setTimeout(() => {
        console.log(missileOne)
        cells[missileOne].classList.remove('implosion')
        missileOne = null
        ammoCounter -= 1
      }, 1000)
    }
  }


  function hamstrung() {
    setTimeout(() => {
      cells[turret].classList.remove('explosion')
      cells[turret].classList.add('flash')
    }, 500)
    setTimeout(() => {
      noLuck -= 1
      cells[turret].classList.remove('flash')
    }, 1500)
  }

  function tooSlow() {
    if (noLuck === 0) {
      noLuck += 1
      life -= 1
      hamstrung()
    } else if (life > 0) return
    if (life === 0) {
      gameOver = true
      scoreElement.innerHTML = `Score : ${score}`
      gunTurrets.innerHTML = `Lives : ${life}`
      clearInterval(invasion)
      clearInterval(bang1)
      clearInterval(shell1)
      clearInterval(shell2)
      clearInterval(shell3)
      clearInterval(skyBarrage)
      weReOutOfHere()
      ranking()
    }
  }

  function scoreBoard() {
    return (theresALotOfEm - eT.length) * 10
  }

  function shouldWeGoLeft(array) {
    return array.some((element) => {
      return (element - (width - 1)) % width === 0
    })
  }

  function shouldWeGoRight(array) {
    return array.some((element) => {
      return element % width === 0
    })
  }

  function imTheCaptainNow(array) {
    return array.some((alien) => {
      return alien >= spaceSize - width
    })
  }

  function reset() {
    location.reload(forceGet)
  }

  function areYouReady() {
    heroPanel.style.display = 'none'
    readInstructions.style.display = 'flex'
    nameScreen.style.display = 'flex'
  }

  document.addEventListener('keydown', (e) => {
    if (gameLoad === false) {
      gameLoad = true
      areYouReady()
    }
  })

  startAgain.addEventListener('click', () => {
    reset()
  })
  
  readInstructions.addEventListener('click', () => {
    instructionsPanel.style.display = 'flex'
  })
  
  doneReading.addEventListener('click', () => {
    instructionsPanel.style.display = 'none'
  })

  startButton.addEventListener('click', () => {
    //change of view
    space.style.display = 'flex'
    leftPanel.style.display = 'block'
    scoreElement.style.display = 'flex'
    gunTurrets.style.display = 'flex'
    playerLounge.style.display = 'none'
    nameScreen.style.display = 'none'


    //initialisation of grid
    for (let i = 0; i < spaceSize; i++) {
      const cell = document.createElement('div')
      space.appendChild(cell)
      cells.push(cell)
      startButton.style.display = 'none'
    }
    scoreElement.innerHTML = `Score : ${score}`
    gunTurrets.innerHTML = `Lives : ${life}`
    //initialisation of player
    cells[turret].classList.add('turret')
    //initial assignment of alien array numbers to div cells
    swarm = eT.map(elem => {
      return cells[elem]
    })
    //initial application of class elements to alien divs 
    swarm.forEach(div => {
      div.classList.add('theFirst')
      div.classList.add('left')
    })

    //uses a forEach to carry mutiple classes along and filters attack and effect classes on each change

    invasion = setInterval(() => {
      scoreElement.innerHTML = `Score : ${score}`
      gunTurrets.innerHTML = `Lives : ${life}`
      if (shouldWeGoRight(eT) && swarm[0].classList.contains('left')) {
        swarm.forEach(div => {
          div.classList.remove('left')
        })
        swarm.forEach(div => {
          baggage = div.className.split(' ')
          baggage = baggage.filter(classStr => {
            return classStr !== 'missile' && classStr !== 'laser' && classStr !== 'implosion'
          })
          baggage.forEach(classStr => {
            div.classList.remove(`${classStr}`)
          })
        })
        weReComing()
        return swarm.forEach(div => {
          baggage.forEach(classStr => {
            div.classList.add(`${classStr}`)
          })
        })
      } else if (shouldWeGoLeft(eT) && !swarm[0].classList.contains('left')) {
        swarm.forEach(div => {
          baggage = div.className.split(' ')
          baggage = baggage.filter(classStr => {
            return classStr !== 'missile' && classStr !== 'laser' && classStr !== 'implosion'
          })
          baggage.forEach(classStr => {
            div.classList.remove(`${classStr}`)
          })
        })
        weReComing()
        swarm.forEach(div => {
          div.classList.add('left')
        })
        return swarm.forEach(div => {
          baggage.forEach(classStr => {
            div.classList.add(`${classStr}`)
          })
        })
      }
      //constant movement conditionals
      if (swarm[0].classList.contains('left')) {
        swarm.forEach(div => {
          baggage = div.className.split(' ')
          baggage = baggage.filter(classStr => {
            return classStr !== 'missile' && classStr !== 'laser' && classStr !== 'implosion'
          })
          baggage.forEach(classStr => {
            div.classList.remove(`${classStr}`)
          })
        })
        eTMovesLeft()
        return swarm.forEach(div => {
          baggage.forEach(classStr => {
            div.classList.add(`${classStr}`)
          })
        })
      } else {
        swarm.forEach(div => {
          baggage = div.className.split(' ')
          baggage = baggage.filter(classStr => {
            return classStr !== 'missile' && classStr !== 'laser' && classStr !== 'implosion'
          })
          baggage.forEach(classStr => {
            div.classList.remove(`${classStr}`)
          })
        })
        eTMovesRight()
        swarm.forEach(div => {
          baggage.forEach(classStr => {
            div.classList.add(`${classStr}`)
          })
        })
      }

    }, 800)

    // A randomiser function generates start positions for the lasers. Intervals are restricted 
    // from creation by pushing array values in and out.
    skyBarrage = setInterval(() => {
      enemyFire = spaceGunners(eT)
      if (enemyAmmo[0] === 1) {
        enemyAmmo.splice(0, 1)
        laserOne = enemyFire + width
        cells[laserOne].classList.add('laser')
        shell1 = setInterval(() => {
          cells[laserOne].classList.remove('laser')
          laserOne = laserOne + width
          if (laserOne === turret && noLuck === 0) {
            cells[laserOne].classList.add('explosion')
            tooSlow()
            return potShot()
          }
          cells[laserOne].classList.add('laser')
          if (laserOne >= ((width ** 2) - width)) {
            potShot()
          }
        }, 200)
      } else if (enemyAmmo[0] === 2) {
        enemyAmmo.splice(0, 1)
        laserTwo = enemyFire + width
        cells[laserTwo].classList.add('laser')
        shell2 = setInterval(() => {
          cells[laserTwo].classList.remove('laser')
          laserTwo = laserTwo + width
          if (laserTwo === turret) {
            cells[laserTwo].classList.add('explosion')
            tooSlow()
            return potShot2()
          }
          cells[laserTwo].classList.add('laser')
          if (laserTwo >= ((width ** 2) - width)) {
            potShot2()
          }
        }, 80)
      } else if (enemyAmmo[0] === 3) {
        enemyAmmo.splice(0, 1)
        laserThree = enemyFire + width
        cells[laserThree].classList.add('laser')
        shell3 = setInterval(() => {
          cells[laserThree].classList.remove('laser')
          laserThree = laserThree + width
          if (laserThree === turret) {
            cells[laserThree].classList.add('explosion')
            tooSlow()
            return potShot3()
          }
          cells[laserThree].classList.add('laser')
          if (laserThree >= ((width ** 2) - width)) {
            potShot3()
          }
        }, 200)
      } else return
    }, 1000)


    // ==============================Movement ==============================================================
    document.onkeydown = function (e) {
      if (noLuck === 0 && gameOver === false) {
        switch (e.keyCode) {
          case (37):
          case (65): {
            if (turret === ((width ** 2) - width)) {
              return
            }
            cells[turret].classList.remove('turret')
            turret = turret - 1
            cells[turret].classList.add('turret')
            break
          }
          case (68):
          case (39): {
            if (turret === ((spaceSize) - 1)) {
              return
            }
            cells[turret].classList.remove('turret')
            turret = turret + 1
            cells[turret].classList.add('turret')
            break
          }
          //set up missile here

          /*
        Let's get one to fire first
        Event Listener
        let missile = turret + 1
        then set interval
        set 'set interval' to a variable
        missile += width
        write conditionals
        first basic condition
        if missile is < 20 then cease interval
        */

          case (32): {
            if (ammoCounter === 0) {
              ammoCounter += 1
              missileOne = turret - width
              cells[missileOne].classList.add('missile')
              bang1 = setInterval(() => {
                cells[missileOne].classList.remove('missile')
                missileOne = missileOne - width
                //new code to evaluate (simulating hit)
                if (gotcha(eT)) {
                  cells[missileOne].classList.add('implosion')
                  console.log(missileOne)
                  return amIHit()
                }
                cells[missileOne].classList.add('missile')
                if (missileOne < width) {
                  rowZ1()
                }
              }, 80)
            } else return
            break
          }
        }
      } else return
    }

  })



}

document.addEventListener('DOMContentLoaded', setupGame)

