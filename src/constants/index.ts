const prod = {
    db: {
        user: 'ubuntu',
        password: 'Minjipptvopdvue19'
    }
}

const dev = {
    db: {
        user: 'postgres',
        password: '1'
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;