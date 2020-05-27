export class Config {

    static prodConfig() {
        return {
            "ProdDb":
            {
                user: '...',
                password: '...',
                server: 'localhost',
                database: '...',
            }
        }
    }

    static testConfig() {
        return {
            database: 'ReportParserTestDB',
            server: 'MD1YWAHC\\SQLEXPRESS',
            driver: 'msnodesqlv8',
            options: {
                trustedConnection: true
            }

        }
    }
}