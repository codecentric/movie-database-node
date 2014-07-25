'use strict';

module.exports = {
    application: {
        port: process.env.PORT || 3000
    },
    neo4j: {
        url: process.env.GRAPHENEDB_URL || 'http://localhost:7474'
    }
};
