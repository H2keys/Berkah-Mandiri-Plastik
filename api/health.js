module.exports = function handler(request, response) {
    response.status(200).json({
        status: 'ok',
        service: 'berkah-mandiri-plastik-api'
    });
};