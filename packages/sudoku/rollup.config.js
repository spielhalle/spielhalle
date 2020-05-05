import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json';
//import { terser } from "rollup-plugin-terser";

function buildConfig(target, targetDir) {
    return {
        input: 'src/index.ts', // our source file
        output: [
            {
                dir: targetDir,
                format: target, // the preferred format
                sourcemap: true,
                exports: "named",
                treeshake: true
            }
        ],
        external: [
            ...Object.keys(pkg.dependencies || {})
        ],
        plugins: [
            nodeResolve(),
            commonjs({
                include: [
                    'node_modules/**'
                ],
            }),
            typescript({
                tsconfig: './tsconfig.json',
                declaration: true,
                outDir: targetDir
            })]
    }
}
export default [buildConfig('es', './dist/esm'), buildConfig('iife', './dist/cjs')];
