displayJoke = (req, res) => {
  const data =
    'How did the telephone propose to his girlfriend? ...he gave her a ring.';
  res.status(200).send(data);
};


displayJohn = (req, res) => {
  const data =
    'John is a very good boy';
  res.status(200).send(data);
};

displayRichard = (req, res) => {
  const data =
    'Richard is a BYU-Idaho Student, whose dream is to code as a professional';
  res.status(200).send(data);
};



module.exports = {
  displayJoke,
  displayJohn,
  displayRichard,
};
