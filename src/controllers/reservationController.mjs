import { create, findAll, findByPk, accept, reject } from '../services/reservationService.mjs';

export const createReservationOrder = async (req, res) => {
  const { body: payload, user } = req;

  if (!payload) {
    res.status(400).json({ message: 'Bad request' });
    return;
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
    return;
  }

  const reservationOrder = await findByPk(id);
  res.status(200).json(reservationOrder);
};

export const acceptReservationOrder = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).json({ message: 'Reservation not found' });
    return;
  }

  try {
    const reservationOrder = await accept(id);
    res.status(200).json(reservationOrder);
  } catch (error) {
    if (error.message === 'invalid status') {
      res.status(400).json({ message: 'Reservation with invalid status' });
    } else {
      console.log(error);
      res.status(500).json({ message: 'Internal error' });
    }
  }
};

export const rejectReservationOrder = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).json({ message: 'Reservation not found' });
    return;
  }

  try {
    // Find reservation with products
    const reservationOrder = await findByPk(id);
    if (!reservationOrder) {
      res.status(404).json({ message: 'Not found' });
      return;
    }

    if (reservationOrder.status !== 'pending') {
      res.status(400).json({ message: 'Reservation with invalid status' });
      return;
    }

    const responseData = await reject(id, reservationOrder);
    res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal error' });
  }
};
