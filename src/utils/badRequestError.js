const AppError = require("./appError");

class BadRequestError extends AppError{
    constructor(invalidParams){
        let message=""
        invalidParams.array.forEach(params =>message += `${params}\n` );
        super(`invalid parameters \n  ${invalidParams}`,400)
    }
}
module.exports=BadRequestError;