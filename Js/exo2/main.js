document.getElementById('closests').style.display = 'none';

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

idCount = 0;
function pAequorFactory(specimenNum = idCount, dna = mockUpStrand(), _mostRelated) {
  idCount++;
  return {
    specimenNum,
    dna,
    _mostRelated,
    set mostRelated(newMostRelated) {
      this._mostRelated = newMostRelated;
    },
    calcGoodGenes() {
      const totalBase = this.dna.length;
      let numOfCAndG = 0;
      for (const base of this.dna) {
        if (base === 'C' || base === 'G') {
          numOfCAndG++;
        }
      }
      if ((Math.ceil((numOfCAndG/totalBase)*100) >= 60)) {
        return "This specimen has " + Math.ceil((numOfCAndG/totalBase)*100) + " % of C / G bases and is likely to survive."; 
      } else {
      return "This specimen has " + Math.ceil((numOfCAndG/totalBase)*100) + " % of C / G bases and is unlikely to survive."; 
      }
    },
    mutate() {
      const randomDnaBaseIndex = Math.floor(Math.random()*this.dna.length);
      let newRandomBase;
      do {
        newRandomBase = returnRandBase()
      } while (this.dna[randomDnaBaseIndex] === newRandomBase) 
      this.dna[randomDnaBaseIndex] = newRandomBase;
      return randomDnaBaseIndex;
    },
    compareDna(obj) {
      const totalBase = this.dna.length;
      let dnaMatches = 0;
      let matchPercent;
      for (let i = 0; i < this.dna.length; i++) {
        if (obj.dna[i] === this.dna[i]) {
          dnaMatches++;
        }
      }
      matchPercent = Math.ceil((dnaMatches/totalBase)*100);
      console.log(`Specimen ${obj.specimenNum} and specimen ${this.specimenNum} have ${matchPercent}% of dna in common`); 
      return matchPercent;
    },
    willLikelySurvive() {
      const totalBase = this.dna.length;
      let numOfCAndG = 0;
      for (const base of this.dna) {
        if (base === 'C' || base === 'G') {
          numOfCAndG++;
        }
      }
      let cAndGPercent = (numOfCAndG/totalBase)*100; 
      return (cAndGPercent > 60);
    },
    complementStrand() {
      let complementaryStrand = [];
      for (const base of this.dna) {
        switch (base) {
          case 'A':
            complementaryStrand.push('T');
            break;
          case 'T':
            complementaryStrand.push('A');
            break;
          case 'C':
            complementaryStrand.push('G');
            break;
          case 'G':
            complementaryStrand.push('C');
            break;
        }
      }
      return complementaryStrand;
    },
    createElement() {
      //creates a div for the specimen and populates it
      const list = document.getElementById('paequors');

      const paequor = document.createElement('div');
      paequor.classList.add('Paequor');
      list.appendChild(paequor);

      const paequoriD = document.createElement('h2');
      paequoriD.innerHTML = `Paequor #${this.specimenNum}`;
      paequoriD.classList.add('Id')
      paequor.appendChild(paequoriD);

      const paequorPs = document.createElement('div');
      paequorPs.classList.add('PaequorPs');
      paequor.appendChild(paequorPs);

      const paequorGoodGenes = document.createElement('p');
      paequorGoodGenes.innerHTML = this.calcGoodGenes();
      paequorGoodGenes.classList.add('GoodGenes', 'Hidden');
      paequorPs.appendChild(paequorGoodGenes);

      const paequorMostRelated = document.createElement('p');
      paequorMostRelated.innerHTML = '';
      paequorMostRelated.classList.add('MostRelated', 'Hidden');
      paequorPs.appendChild(paequorMostRelated);

      const paequorMutate = document.createElement('button');
      paequorMutate.innerHTML = 'MUTATE';
      paequorMutate.classList.add('Mutate', 'Hidden');
      paequor.appendChild(paequorMutate);
      // Mutate listening event assigement 
      paequorMutate.addEventListener('click', () => {
        console.log("click");
        let baseChanged = this.mutate();
        
        //updates closests h3
        if (storage.length > 1) {
        document.getElementById('closests').innerHTML = findMostRelated(storage);
        }

        //recalculate the amount of good genes in the paequor
        paequorGoodGenes.innerHTML = this.calcGoodGenes();

        console.log(baseChanged);
        let bases = paequorStrand.childNodes;
        bases[baseChanged].innerHTML = this.dna[baseChanged];
        //color the modified base the correct color
        switch(bases[baseChanged].innerHTML) {
          case 'A':
            bases[baseChanged].style.backgroundColor = "#75c873";
            break;
          case 'T':
            bases[baseChanged].style.backgroundColor = "#fe5442";
            break;
          case 'C':
            bases[baseChanged].style.backgroundColor = "#edbea8";
            break;
          case 'G':
            bases[baseChanged].style.backgroundColor = "#6488ea";
            break;
        };
        //cousin calculation
        const arrOfMostRelated = findMostRelatedForEveryone(storage);
        let paequorsOnScreen = document.getElementsByClassName('Paequor');
        console.log(arrOfMostRelated, paequorsOnScreen);

          for (let i = 0; i < paequorsOnScreen.length; i++) {
            paequorsOnScreen[i].getElementsByTagName('p')[1].innerHTML = `This specimens closest cousin is Paequor#${arrOfMostRelated[i][0]} with a match score of ${arrOfMostRelated[i][1]}%`;
          }
      });

      const paequorStrand = document.createElement('div'); //-> div
      //paequorStrand.innerHTML = `${this.dna}`;//-> erase
      paequorStrand.classList.add('Strand');
      paequor.appendChild(paequorStrand);

      // creates new p for every base in this.dna and puts them in div Strand
      for (const base of this.dna) {
        let tempLetter = document.createElement('p');
        tempLetter.classList.add('Base');
        paequorStrand.appendChild(tempLetter);
        tempLetter.innerHTML= `${base}`;

        switch(base) {
          case 'A':
            tempLetter.style.backgroundColor = "#75c873";
            break;
          case 'T':
            tempLetter.style.backgroundColor = "#fe5442";
            break;
          case 'C':
            tempLetter.style.backgroundColor = "#edbea8";
            break;
          case 'G':
            tempLetter.style.backgroundColor = "#6488ea";
            break;
        }
      }
    }
  }
  
}


let storage = []


//button to add a new Randomly generated specimen
const button = document.getElementById('button');
button.addEventListener('click', function() {
  const testCreature = pAequorFactory();
  storage.push(testCreature);
  testCreature.createElement();

  //updates the closests h3
  if (storage.length > 1) {
  document.getElementById('closests').style.display = 'block';
  document.getElementById('closests').innerHTML = findMostRelated(storage);
  }

  // Cousins calculations 
  if (storage.length > 1) {
    const arrOfMostRelated = findMostRelatedForEveryone(storage);
    let paequorsOnScreen = document.getElementsByClassName('Paequor');
    console.log(arrOfMostRelated, paequorsOnScreen);

    for (let i = 0; i < paequorsOnScreen.length; i++) {
      paequorsOnScreen[i].getElementsByTagName('p')[1].innerHTML = `This specimens closest cousin is Paequor#${arrOfMostRelated[i][0]} with a match score of ${arrOfMostRelated[i][1]}%`;
    }
  }
  
});

console.log(storage);

function findMostRelatedForEveryone(arr) {
  console.log(arr);
  let arrOfMostRelated = [];
  let score;
  let bestScore;
  for (const creature of storage) {
    bestScore = 0;
    for (const comparison of storage) {
      if (creature === comparison) {
        continue;
      } else {
      score = creature.compareDna(comparison);
      if (score > bestScore) {
        bestScore = score;
        mostRelated = `${comparison.specimenNum}`;
        }
      }
    }
    console.log(`${creature.specimenNum} is the most related to ${mostRelated} with a match score of ${bestScore}`)
    arrOfMostRelated.push([mostRelated, bestScore])
  }
  return arrOfMostRelated;
}

/*
while (storage.length < 30) {
  let newCreature = pAequorFactory();
  while(!newCreature.willLikelySurvive()) {
    newCreature.mutate();
    console.log(newCreature.calcGoodGenes());
  }
  storage.push(newCreature);
}

console.log(storage);

*/

function findMostRelated(arr) {
  let bestScore = 0;
  let score;
  let mostRelated1;
  let mostRelated2;
  for (let j = 0; j < arr.length; j++) {
    for (let i = 0 + j; i < arr.length; i++) {
      if (i === j) {
        continue;
      } else {
        score = arr[i].compareDna(arr[j]);
        if (score > bestScore) {
          mostRelated1 = arr[i];
          mostRelated2 = arr[j];
          bestScore = score;
        }
      }
    }
  }
  return `the 2 closest specimens are specimen#${mostRelated1.specimenNum} and specimen#${mostRelated2.specimenNum} with a score of ${bestScore}%`;
}


