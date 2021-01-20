const chai = require("chai");
const expect = require("chai").expect;
//const chaiAsPromised = require("chai-as-promised");
const mock = require("./mock");
const calcElemDeslocamento = require("../services/deslocamentoRouteServices/calcElemDeslocamento");

describe("test helpers", async () => {
  it("Should parse the displacements", () => {
    const element = {
      DESLOCAMENTO: "Irajá X Madureira",
      ESTADO: "Rio de Janeiro",
    };
    const resultCalcElemDeslocamento = calcElemDeslocamento(element);
    expect(resultCalcElemDeslocamento.estado).equal(mock.objDesloc.estado);
    expect(resultCalcElemDeslocamento.primeiro).equal(mock.objDesloc.primeiro);
    expect(resultCalcElemDeslocamento.ultimo).equal(mock.objDesloc.ultimo);
  });
});
