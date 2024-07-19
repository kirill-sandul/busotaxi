const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const Reservation = require('../models/reservation.model');
const auth_middleware = require('../middlewares/auth.middleware');

const router = new Router();

const error_formatter = ({ location, msg, param }) => {
  return `empty_reservation_${param}`;
};

const parse_date = (date) => {
  const splitted_date = date.split('.');

  return {
    year: splitted_date[2],
    month: splitted_date[1],
    day: splitted_date[0]
  }
}

router.post('/create',
  auth_middleware,
  check('time', 'time').not().isEmpty(),
  check('from', 'from').not().isEmpty(),
  check('to', 'to').not().isEmpty(),
  check('name', 'name').not().isEmpty(),
  check('phone', 'phone').not().isEmpty(), async (req, res) => {
  const { date, time, from, to, name, phone } = req.body;

  const time_match = await Reservation.findOne({ date: parse_date(date), time });
  if(time_match) return res.status(400).json({ error: 'reservation_time_yet_exist' });
  
  const errors = validationResult(req).formatWith(error_formatter);
  if(!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0] });  

  const reservation = new Reservation({ date: parse_date(date), time, from, to, name, phone });
  await reservation.save();

  res.status(201).json({ message: 'Reservation has created' });
});

router.get('/get/:date', async (req, res) => {
  const { date } = req.params;
  
  const found_list = await Reservation.find({ date: parse_date(date) });
  // console.log(found_list, date);
  // if(!found_list.length) return res.json({ error: 'Reservations not found', found_list: [] });

  return res.status(200).json({ message: 'Reservations list returned', found_list });
});

router.put('/edit',
  auth_middleware,
  check('time', 'time').not().isEmpty(),
  check('from', 'from').not().isEmpty(),
  check('to', 'to').not().isEmpty(),
  check('name', 'name').not().isEmpty(),
  check('phone', 'phone').not().isEmpty(), async (req, res) => {
  const { id, date, time, from, to, name, phone } = req.body;

  const errors = validationResult(req).formatWith(error_formatter);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0] });

  return Reservation.findByIdAndUpdate(id, { time, from, to, name, phone }).then(() => {
    return res.status(200).json({ message: 'Reservation has been edited' });
  }).catch(err => {
    return res.status(404).json({ error: 'reservation_to_edit_not_found' });
  });
});

router.delete('/remove', auth_middleware, async (req, res) => {
  const { id } = req.body;

  return Reservation.findByIdAndRemove(id, {}).then(err => {
    return res.status(200).json({ message: 'Reservation has been removed' });
  }).catch(err => {
    return res.status(404).json({ error: 'reservation_to_remove_not_found' });
  });
});

module.exports = router;