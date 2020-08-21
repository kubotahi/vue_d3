module.exports = {
    //publicPath: './'
    //publicPath: '/vue_d3/'
    publicPath: process.env.NODE_ENV === 'production'
        ? '/vue_d3/'
        : '/'

}