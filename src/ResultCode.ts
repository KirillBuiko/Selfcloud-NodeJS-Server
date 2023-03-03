const enum ResultCode{
    OK = 0,
    FAIL = 1,

    TOKEN_EXPIRED = 101,
    TOKEN_INVALID = 102,

    EMAIL_OR_PHONE_IS_BUSY = 150,
    DATA_IS_INCOMPLETE = 151,

    WRONG_LOGIN_OR_PASSWORD = 160,
}

export const ResultCodeDescription = {
    [ResultCode.OK]: "Success",
    [ResultCode.FAIL]: "Fail",

    [ResultCode.TOKEN_EXPIRED]: "Token Expired",
    [ResultCode.TOKEN_INVALID]: "Token Invalid",

    [ResultCode.EMAIL_OR_PHONE_IS_BUSY]: "Email or phone is busy",
    [ResultCode.DATA_IS_INCOMPLETE]: "Data incomplete",

    [ResultCode.WRONG_LOGIN_OR_PASSWORD]: "Wrong login or password",
}

export default ResultCode;
