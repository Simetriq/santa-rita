# 1. Crear babel.config.js para WatermelonDB
echo "module.exports = function(api) {
api.cache(true);
return {
    presets: ['babel-preset-expo'],
    plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }]
    ]
};
}" > babel.config.js

# 2. Verificar que se creó
Get - Content babel.config.js