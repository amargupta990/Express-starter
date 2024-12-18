const AppError = require("./appError");

class InternalServerError extends AppError{
    constructor(){
        super(`Its not you its server `, 500);
    }
}
module.exports=InternalServerError;