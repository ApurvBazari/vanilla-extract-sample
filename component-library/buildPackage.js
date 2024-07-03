const { resolve, join, extname } = require('path');
const fs = require('fs');
const {execSync} = require('child_process')
const { build } = require('esbuild');
const { vanillaExtractPlugin } = require('@vanilla-extract/esbuild-plugin');

const outputFormats = ['cjs', 'esm']

const getArgumentValue = (flag) => {
  const args = process.argv.slice(2);
  const index = args.indexOf(flag);
  if (index !== -1 && index + 1 < args.length) {
    return args[index + 1];
  }
  return null;
}

const getFiles = (componentPath) => {
  const srcPath = resolve(componentPath, 'src')
  const files = fs.readdirSync(srcPath)

  const compiledfiles = {
    vanillaStyleFiles: [],
    cssStyleFiles: [],
    indexFiles: ["index.tsx"]
  }

  let isIndex = false
  files.forEach(file => {
    const filePath = join(srcPath, file)
    if(fs.statSync(filePath).isFile()) {
      if(file.endsWith('.css.ts')) {
        compiledfiles.vanillaStyleFiles.push(file)
      } else {
        const extension = extname(file)
        if(extension === '.css') {
          compiledfiles.cssStyleFiles.push(file)
        } else if (extension === '.tsx' || extension === '.ts') {
          if(file === 'index.tsx' || file === 'index.ts') {
            isIndex = true
          }
        }
      }
    }
  })
  if(!isIndex) {
    throw Error(`No index.tsx file foiund for ${componentPath}`)
  }
  return compiledfiles
}

const getExternalDeps = (componentPath) => {
  const packageJsonPath = resolve(componentPath, 'package.json')
  const packageJson = require(packageJsonPath);
  const peerDependencies = packageJson?.peerDependencies ? Object.keys(packageJson.peerDependencies): []
  const devDependencies = packageJson?.devDependencies ? Object.keys(packageJson.devDependencies) : []
  const pkgDependencies = packageJson?.dependencies ? Object.keys(packageJson.dependencies) : []
  const allDeps = [...peerDependencies, ...devDependencies, ...pkgDependencies]

  return allDeps
}

const buildTypeFiles = (componentPath) => {
  const command = `tsc --project ${resolve(componentPath, 'tsconfig.json')}`;
  execSync(command, { stdio: 'inherit' })
}

const buildVanillaStyleFiles = (completeFileName, componentPath, format, externals) => {
  const fileName = completeFileName.split('.')[0]
  const entryPath = resolve(componentPath, `src/${completeFileName}`);
  const outputFilename = resolve(componentPath, `dist/${format}/${fileName}.css.js`)
  return build({
    entryPoints: [entryPath],
    bundle: true,
    format: format,
    sourcemap: false,
    external: [...externals, '*.css'],
    outbase: resolve(componentPath, 'src'),
    outfile: outputFilename,
    tsconfig: resolve(componentPath, './tsconfig.json'),
    absWorkingDir: componentPath,
    plugins: [
      vanillaExtractPlugin({
        runtime: true,
        outputCss: false
      })
    ]
  });
}

const buildIndexFile = (componentPath, format, externals) => {
  const packageJsonPath = resolve(componentPath, 'package.json')
  const packageJson = require(packageJsonPath);
  const packageName = packageJson.name

  return build({
    entryPoints: [resolve(componentPath, `src/index.tsx`)],
    bundle: true,
    format: format,
    sourcemap: false,
    outbase: resolve(componentPath, 'src'),
    external: [...externals, '*.css'],
    outfile: resolve(componentPath, `dist/${format}/${packageName}.js`),
    tsconfig: resolve(componentPath, './tsconfig.json')
  })
}

const packageNames = getArgumentValue('--packages')?.split(',')

const buildPackage = (componentName) => {
  const componentPath = resolve(__dirname, `packages/${componentName}`)

  // Get style files for the component
  const {vanillaStyleFiles} = getFiles(componentPath)
  
  // Get package dependencies
  const externalDeps = getExternalDeps(componentPath)

  let buildVanillaStyleFilesPromises, buildIndexFilePromises
  // Build vanilla styles files
  outputFormats.map(format => {
    buildVanillaStyleFilesPromises =  vanillaStyleFiles.map(entryName =>
      buildVanillaStyleFiles(entryName, componentPath, format, externalDeps)
    );

    // Build index files
    buildIndexFilePromises = buildIndexFile(componentPath, format, externalDeps)
  })
  return buildVanillaStyleFilesPromises.concat(buildIndexFilePromises)
}

const run = async () => {
  for (const pkg of packageNames) {
    const componentPath = resolve(__dirname, `packages/${pkg}`)
    await Promise.all(buildPackage(pkg))
    buildTypeFiles(componentPath)
  }
}

run()

