  //Ordenando os wayponts
const calcWay = (dataDesloc, estado, wayArray) => {
  if (dataDesloc.length == 0) {
    waypt = null;
  } else {
    for (let i = 0; i < dataDesloc.length; i++) {
      waypt = `${dataDesloc[i]} - State of ${estado}, Brazil`;
      wayArray.push(waypt);
    }
  }
};

module.exports = calcWay;
