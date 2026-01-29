import { neon, HTTPQueryOptions } from '@neondatabase/serverless';
import { PrismaNeonHttp } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';

declare global {
    // eslint-disable-next-line no-var
    var cachedPrisma: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        console.error('DATABASE_URL is not set');
        throw new Error('DATABASE_URL environment variable is not set');
    }

    // PrismaNeonHttp takes the connection string and HTTP options
    const options: HTTPQueryOptions<boolean, boolean> = {
        fullResults: true,
    };

    const adapter = new PrismaNeonHttp(connectionString, options);

    return new PrismaClient({
        adapter,
        log: ['error', 'warn'],
    });
}

export function getPrisma(): PrismaClient {
    if (process.env.NODE_ENV === 'production') {
        return createPrismaClient();
    }

    if (!global.cachedPrisma) {
        global.cachedPrisma = createPrismaClient();
    }

    return global.cachedPrisma;
}

export default getPrisma;
