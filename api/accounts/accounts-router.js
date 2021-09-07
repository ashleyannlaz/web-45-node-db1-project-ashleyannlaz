const Accounts = require('./accounts-model')
const router = require('express').Router()
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware.js')


router.get('/', (req, res, next) => {
  Accounts.getAll()
  .then(accounts => {
    res.status(200).json(accounts)
  })
  .catch(next);
})

router.get('/:id', checkAccountId, (req, res, next) => {
  Accounts.getById(req.params.id)
  .then(account => {
    res.status(200).json(account)
  })
  .catch(next);
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const data = await Accounts.create({
      name: req.body.name.trim(),
      budget: req.body.budget,
    })
    res.status(201).json(data)
  } catch(error) {
    next(error)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  const data = await Accounts.updateById(req.params.id, req.body)
  try {
    res.status(200).json(data)
  } catch(error) {
    next(error)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    data = await Accounts.deleteById(req.params.id)
    res.status(200).json(data)
  } catch(error) {
  next(error)
}
})

// eslint-disable-next-line
router.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "Something in accounts router!",
  });
});

module.exports = router;
