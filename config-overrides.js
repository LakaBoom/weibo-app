const {override, fixBabelImports} = require('customize-cra');

module.exports = override(
    fixBabelImports('antd',{
        libraryDirect:'es',
        style:'css'
    })
)