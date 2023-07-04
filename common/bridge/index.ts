const fs = require('fs-extra')
const targetPath = 'dist/';
const iosFileExt = '../ios/PPApp/';
const androidFileExt = '../android/app/src/main/assets/raw/';

const writeFile = (fileName) => {
    const readTargetFile = fs.readFileSync(`${targetPath}${fileName}.js`);
    const iosFile = `${iosFileExt}${fileName}.js`
    const androidFile = `${androidFileExt}${fileName}.js`
    fs.writeFile(iosFile, readTargetFile, (error) => {
        if (error) console.error(error)
        console.info(`ios ${iosFile} updated!`)
    })
    fs.writeFile(androidFile, readTargetFile, (error) => {
        if (error) console.error(error)
        console.info(`android ${androidFile} updated!`)
    })
}

writeFile('injectMetamaskExt');
