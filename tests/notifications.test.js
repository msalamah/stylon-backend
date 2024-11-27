const { sendNotification } = require('../utils/notifications');

jest.mock('../config/firebase', () => ({
    messaging: () => ({
        send: jest.fn(() => Promise.resolve('Notification sent')),
    }),
}));

describe('sendNotification', () => {
    it('should send a notification successfully', async () => {
        const response = await sendNotification('mockToken', 'Test Title', 'Test Body');
        expect(response).toBe('Notification sent');
    });

    it('should handle errors when sending a notification', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        const mockError = new Error('Failed to send notification');
        jest.mock('../config/firebase', () => ({
            messaging: () => ({
                send: jest.fn(() => Promise.reject(mockError)),
            }),
        }));

        await expect(sendNotification('invalidToken', 'Test Title', 'Test Body')).rejects.toThrow(
            'Failed to send notification'
        );
    });
});
