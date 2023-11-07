
/**
 * Catalog for text fields validations
 */
export const text_error_types = [
    { error_id: 0, field_type: "long_text", message: "Text is too long, maximun of 200 characters" },
    { error_id: 1, field_type: "short_text", message: "Text is too long, maximun of 45 characters" },
    { error_id: 2, field_type: "text", message: "Field must not be empty" },
    { error_id: 3, field_type: "email", message: "Incorrect Format, it must be: example@email.com" },
    { error_id: 4, field_type: "verf_code", message: "Code must be equal or greater than 9 characters" },
];

/**
 * Catalog for integer fields validations
 */

export const int_error_types = [
    { error_id: 0, field_type: "long_num", message: "Number is too big, must be equal or less than 9999999999" }
];

/**
 * Catalog for String Arrays fields validations
 */

export const string_array_types = [
    { error_id: 0, field_type: "array", message: "Array must not be empty" },
];


/**
 * Catalog for Autentication fields validations
 */

export const auth_types = [
    { error_id: 0, field_type: "username", message: "Username must not be empty" },
    { error_id: 2, field_type: "password", message: "Password must not be empty" },

];

/**
 * Catalog for date fields validations
 */

export const date_types = [
    { error_id: 0, field_type: "date", message: "Date must not be empty" },
    { error_id: 1, field_type: "date", message: "Wrong date format" },
    { error_id: 2, field_type: "date", message: "End Date must be greater than Start Date" },


]

/**
 * Catalog for time fields validations
 */

export const time_types = [
    { error_id: 0, field_type: "time", message: "Time must not be empty" },
    { error_id: 1, field_type: "time", message: "Wrong time format" },
    { error_id: 2, field_type: "time", message: "Event duration must be at least 5 minutes" },
];

/**
 * Catalog for picture fields validations
 */

export const pictures_types = [
    { error_id: 0, field_type: "picture", message: "You must select at least one picture" },
    { error_id: 1, field_type: "picture", message: "Wrong format" },
    { error_id: 2, field_type: "picture", message: "Picture min size exceeded" },
];

/**
 * Catalog for categories fields validations
 */

export const categories_types = [
    { error_id: 0, field_type: "category", message: "You must select at least one category" },

]

