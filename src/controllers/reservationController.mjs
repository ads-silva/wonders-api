import { create, findAll, findByPk } from '../services/reservationService.mjs';

export const createReservationOrder = async (req, res) => {
  const { body: payload, user } = req;

  if (!payload) {
    res.status(400).json({ message: 'Bad request' });
  }

  try {
    const reservation = await create(payload, user.id);
    res.status(201).json(reservation);
  } catch (error) {
    if (error.message === 'no balance') {
      res.status(400).json({ message: 'No balance for this operation' });
    } else {
      console.log(error);
      res.status(500).json({ message: 'Internal error' });
    }
  }
};

export const getReservationOrders = async (req, res) => {
  const reservationOrders = await findAll();
  res.status(200).json(reservationOrders);
};

export const getReservationOrder = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).json({ message: 'Reservation not found' });
  }

  const reservationOrder = await findByPk(id);
  res.status(200).json(reservationOrder);
};
