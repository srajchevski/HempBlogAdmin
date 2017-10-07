if (process.env.NODE_ENV === 'production') {
    module.exports = require('./webpack.config.prod');
    return;
}

module.exports = require('./webpack.config.dev');
