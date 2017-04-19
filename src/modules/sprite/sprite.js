require('./sprite.styl');
const __svg__ = {
    path: 'icons/**/*.svg',
    name: 'images/sprite.default.svg'
};

require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);
