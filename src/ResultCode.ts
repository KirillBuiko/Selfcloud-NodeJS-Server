const enum ResultCode{
    OK,
    FAIL,

    TOKEN_EXPIRED,
    TOKEN_INVALID,

    EMAIL_OR_PHONE_IS_BUSY,
    DATA_IS_INCOMPLETE,

    INVALID_LOGIN_OR_PASSWORD,
}

export default ResultCode;