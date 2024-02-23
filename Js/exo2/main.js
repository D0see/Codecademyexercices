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
function pAequorFactory(specimenNum = idCount, dna = mockUpStrand()) {
  idCount++;
  return {
    specimenNum: idCount,
    dna: mockUpStrand(),
    calcGoodGenes() {
      const totalBase = this.dna.length;
      let numOfCAndG = 0;
      for (const base of this.dna) {
        if (base === 'C' || base === 'G') {
          numOfCAndG++;
        }
      }
      if (((numOfCAndG/totalBase)*100) > 60) {
        return "Specimen" + this.specimenNum + " at " + Math.ceil((numOfCAndG/totalBase)*100) + " % of good genes, store now !"; 
      } else {
      return "Specimen" + this.specimenNum + " at " + Math.ceil((numOfCAndG/totalBase)*100) + " % of good genes, keep mutating..."; 
      }
    },
    mutate() {
      const randomDnaBaseIndex = Math.floor(Math.random()*this.dna.length);
      let newRandomBase;
      do {
        newRandomBase = returnRandBase()
      } while (this.dna[randomDnaBaseIndex] === newRandomBase) 
      this.dna[randomDnaBaseIndex] = newRandomBase;
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
    }
  }
  
}

let storage = []

while (storage.length < 30) {
  let newCreature = pAequorFactory();
  while(!newCreature.willLikelySurvive()) {
    newCreature.mutate();
    console.log(newCreature.calcGoodGenes());
  }
  storage.push(newCreature);
}

console.log(storage);

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
  console.log(`the 2 closest specimens are ${mostRelated1.specimenNum} and ${mostRelated2.specimenNum} with a score of ${bestScore}%`);
  console.log(mostRelated1.dna, mostRelated2.dna);
}

findMostRelated(storage);