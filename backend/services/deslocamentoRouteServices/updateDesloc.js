const updateDesl = (model, id, desl, res) => {
  model.findOneAndUpdate( { idDoc: id },{ $push: { desl: desl} } )
    .then(() => {})
    .catch((erro) => {
      res.status(500).json({
        msg: `${erro.message}`,
      });
    });
};
module.exports = updateDesl