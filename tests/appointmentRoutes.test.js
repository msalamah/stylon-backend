const request = require('supertest');
const app = require('../index');
const Appointment = require('../models/appointment');
const Service = require('../models/service');

jest.mock('../models/appointment');
jest.mock('../models/service');

describe('Appointment Routes', () => {
    it('should create an appointment', async () => {
        Service.findByPk.mockResolvedValue({ id: 1 });
        Appointment.create.mockResolvedValue({
            id: 1,
            customer_id: 1,
            service_id: 1,
            appointment_date: new Date(),
        });

        const response = await request(app)
            .post('/api/appointments')
            .send({ customer_id: 1, service_id: 1, appointment_date: new Date() });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id', 1);
    });

    it('should return 404 if service is not found', async () => {
        Service.findByPk.mockResolvedValue(null);

        const response = await request(app)
            .post('/api/appointments')
            .send({ customer_id: 1, service_id: 99, appointment_date: new Date() });

        expect(response.status).toBe(404);
        expect(response.text).toBe('Service not found');
    });
});
