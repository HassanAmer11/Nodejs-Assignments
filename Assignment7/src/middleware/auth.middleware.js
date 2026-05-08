
export const checkUserAuthorize = (req, res, next) => {
    console.log("check user authorized or not , do some operations before call end point");
    next();
};