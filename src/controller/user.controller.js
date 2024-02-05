class UserController {
    
    async register(ctx, next) {
        ctx.body = {msg:"register ok"};
    }

    async login(ctx, next) {
        ctx.body = {msg:"login ok"};
    }
}

module.exports = new UserController();