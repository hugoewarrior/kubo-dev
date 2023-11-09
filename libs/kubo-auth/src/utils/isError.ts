/* eslint-disable @typescript-eslint/no-explicit-any */

export const isError = (errors: any, property: string) => {
    return Object.keys(errors).includes(property) && errors[property].length > 0;
};


export const returnErrorMessage = (errors: any, property: string) => {
    const error = isError(errors, property);
    if (error) {
        return errors[property][0]?.message
    }
    else {
        return null
    }
}