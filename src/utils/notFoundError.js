const AppError = require("./appError");

class NotFoundError extends AppError{
    constructor( resource){
        super(`not able to find  ${resource}`)
    }
}

module.exports=NotFoundError