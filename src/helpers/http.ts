export const statusOK = 200;
export const statusCreated = 201;
export const statusAccepted = 202;
export const statusNonAuthoritativeInformation = 203;
export const statusNoContent = 204;
export const statusResetContent = 205;
export const statusPartialContent = 206;
export const statusMultipleChoices = 300;
export const statusMovedPermanently = 301;
export const statusFound = 302;
export const statusSeeOther = 303;
export const statusNotModified = 304;
export const statusUseProxy = 305;
export const statusTemporaryRedirect = 307;
export const statusBadRequest = 400;
export const statusUnauthorized = 401;
export const statusPaymentRequired = 402;
export const statusForbidden = 403;
export const statusNotFound = 404;
export const statusMethodNotAllowed = 405;
export const statusNotAcceptable = 406;
export const statusProxyAuthenticationRequired = 407;
export const statusRequestTimeout = 408;
export const statusConflict = 409;
export const statusGone = 410;
export const statusLengthRequired = 411;
export const statusPreconditionFailed = 412;
export const statusRequestEntityTooLarge = 413;
export const statusRequestURITooLong = 414;
export const statusUnsupportedMediaType = 415;
export const statusRequestedRangeNotSatisfiable = 416;
export const statusExpectationFailed = 417;
export const statusInternalServerError = 500;
export const statusNotImplemented = 501;
export const statusBadGateway = 502;
export const statusServiceUnavailable = 503;
export const statusGatewayTimeout = 504;
export const statusHTTPVersionNotSupported = 505;
export const statusNoNetwork = 0;

export const statusLoginFailed = 432;

export const isOK = ({ status }) => status === statusOK;
export const isCreated = ({ status }) => status === statusCreated;
export const isAccepted = ({ status }) => status === statusAccepted;
export const isNonAuthoritativeInformation = ({ status }) => status === statusNonAuthoritativeInformation;
export const isNoContent = ({ status }) => status === statusNoContent;
export const isResetContent = ({ status }) => status === statusResetContent;
export const isPartialContent = ({ status }) => status === statusPartialContent;
export const isMultipleChoices = ({ status }) => status === statusMultipleChoices;
export const isMovedPermanently = ({ status }) => status === statusMovedPermanently;
export const isFound = ({ status }) => status === statusFound;
export const isSeeOther = ({ status }) => status === statusSeeOther;
export const isNotModified = ({ status }) => status === statusNotModified;
export const isUseProxy = ({ status }) => status === statusUseProxy;
export const isTemporaryRedirect = ({ status }) => status === statusTemporaryRedirect;
export const isBadRequest = ({ status }) => status === statusBadRequest;
export const isUnauthorized = ({ status }) => status === statusUnauthorized;
export const isPaymentRequired = ({ status }) => status === statusPaymentRequired;
export const isForbidden = ({ status }) => status === statusForbidden;
export const isNotFound = ({ status }) => status === statusNotFound;
export const isMethodNotAllowed = ({ status }) => status === statusMethodNotAllowed;
export const isNotAcceptable = ({ status }) => status === statusNotAcceptable;
export const isProxyAuthenticationRequired = ({ status }) => status === statusProxyAuthenticationRequired;
export const isRequestTimeout = ({ status }) => status === statusRequestTimeout;
export const isConflict = ({ status }) => status === statusConflict;
export const isGone = ({ status }) => status === statusGone;
export const isLengthRequired = ({ status }) => status === statusLengthRequired;
export const isPreconditionFailed = ({ status }) => status === statusPreconditionFailed;
export const isRequestEntityTooLarge = ({ status }) => status === statusRequestEntityTooLarge;
export const isRequestURITooLong = ({ status }) => status === statusRequestURITooLong;
export const isUnsupportedMediaType = ({ status }) => status === statusUnsupportedMediaType;
export const isRequestedRangeNotSatisfiable = ({ status }) => status === statusRequestedRangeNotSatisfiable;
export const isExpectationFailed = ({ status }) => status === statusExpectationFailed;
export const isInternalServerError = ({ status }) => status === statusInternalServerError;
export const isNotImplemented = ({ status }) => status === statusNotImplemented;
export const isBadGateway = ({ status }) => status === statusBadGateway;
export const isServiceUnavailable = ({ status }) => status === statusServiceUnavailable;
export const isGatewayTimeout = ({ status }) => status === statusGatewayTimeout;
export const isHTTPVersionNotSupported = ({ status }) => status === statusHTTPVersionNotSupported;

export const isSuccess = ({ status }) => status >= 200 && status < 300;
export const isError = ({ status }) => status >= 400;

export const isLoginFailed = ({ status }) => status === statusLoginFailed;

export const serverUnreachableStatuses = [
    statusBadGateway,
    statusGatewayTimeout,
    statusNoNetwork,
];

export const isServerUnreachable = ({ status }) => serverUnreachableStatuses.indexOf(status) !== -1;
