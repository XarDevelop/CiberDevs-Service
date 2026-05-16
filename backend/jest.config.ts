import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest/presets/default-esm', // Usar ESM con ts-jest
    testEnvironment: 'node',
    testMatch: ['**/**/*.test.ts'],
    clearMocks: true,
    moduleNameMapper: {
        // Redirigir las importaciones .js a .ts para los tests
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                useESM: true, // Forzar uso de ES Modules
            },
        ],
    },
};

export default config;
