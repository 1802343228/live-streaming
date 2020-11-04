'use strict'

const Controller = require('egg').Controller

class NspController extends Controller {
    async test() {
        const {ctx,app} = this
        console.log("11111111111111")
        console.log(ctx)
    }
}

module.exports = NspController