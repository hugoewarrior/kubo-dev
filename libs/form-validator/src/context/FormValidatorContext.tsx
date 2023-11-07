/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseISO } from "date-fns";
import { createContext, useCallback, useEffect, useState } from "react";
import { categories_types, date_types, pictures_types, text_error_types, time_types } from "../constants";

const auto_context_init: any = null;
const FormValidatorContext = createContext(auto_context_init);


interface IFormValidatorContext {
    children: React.ReactNode
}

interface I_Errors {
    error_id: number
    field_id: string
    message: string
}

/**
 * Context that manage all the form validation rules within the application
 * @param props 
 * @returns 
 */


const FormValidatorProvider = (props: IFormValidatorContext) => {

    const [total_errors, set_total_errors] = useState({} as any);
    const [active_errors, set_active_errors] = useState(true as boolean);



    useEffect(() => {
        are_any_errors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [total_errors]);


    //IPUTS validators ---------------------------------------------------------------------------------------------------------------------------------------------------------------


    /**
     * Function that validates the correct format of an date DD/MM/YYY
     * @param date 
     * @returns 
     */
    const date_format_validator = (date: string): boolean => {
        let valid_format = false;
        const date_regex_standar = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;  //To format yyyy-mm-dd
        //const date_regex_custom = /^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$/; //Regex to custom dd/mm/yyyy
        if (date_regex_standar.test(date)) valid_format = true;
        return valid_format
    }



    const time_format_validator = (time: string): boolean => {
        let valid_format = false;
        //if (/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/.test(time)) valid_format = true;
        valid_format = true;
        return valid_format;
    }




    /**
     * Function that validates the correct format of an email
     * @param email 
     * @returns 
     */
    const email_format_validator = (email: string): boolean => {
        let valid_format = false;
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) valid_format = true;

        return valid_format;
    }




    /**
     * Function that validates all STRING types, based on rules given according with the catalog @text_error_types
     * @param field_id 
     * @param value 
     * @param rules 
     */
    const text_error_validator = (field_id: string, value: string, rules: number[]) => {

        const errors_found: I_Errors[] = [];
        //Text longer than 200
        if (rules.includes(text_error_types[0].error_id)) {
            if (String(value).length > 200) errors_found.push({ error_id: 0, field_id, message: text_error_types[0].message });
        }
        //Text longer than 25
        if (rules.includes(text_error_types[1].error_id)) {
            if (String(value).length > 25) errors_found.push({ error_id: 1, field_id, message: text_error_types[1].message });
        }
        //Text field empty
        if (rules.includes(text_error_types[2].error_id)) {
            if (String(value).length === 0) errors_found.push({ error_id: 2, field_id, message: text_error_types[2].message });
        }
        //Validate email format
        if (rules.includes(text_error_types[3].error_id)) {
            if (!email_format_validator(value)) errors_found.push({ error_id: 3, field_id, message: text_error_types[3].message });
        }
        //Validate verification code
        if (rules.includes(text_error_types[4].error_id)) {
            if (String(value).length > 9 || String(value).length < 4) errors_found.push({ error_id: 4, field_id, message: text_error_types[4].message });
        }
        set_total_errors((l: any) => ({ ...l, [field_id]: errors_found }));
        //are_any_errors();

    }


    /**
     * Function that validates all DATE types, based on rules given according with the catalog @date_types
     * @param field_id 
     * @param value 
     * @param rules 
     */

    const date_validator = (field_id: string, value: string, rules: number[]) => {
        const errors_found: I_Errors[] = [];
        if (rules.includes(date_types[0].error_id)) {
            //Empty date
            if (String(value).length === 0) errors_found.push({ error_id: 0, field_id, message: date_types[0].message });
        }
        if (rules.includes(date_types[1].error_id)) {
            //Wrong Format
            if (!date_format_validator(value)) errors_found.push({ error_id: 1, field_id, message: date_types[1].message });
        }
        set_total_errors((l: any) => ({ ...l, [field_id]: errors_found }));
        //are_any_errors();
    }


    /**
     * Function that validates all TIME types, based on rules given according with the catalog @time_types
     * @param field_id 
     * @param value 
     * @param rules 
     */

    const time_validator = (field_id: string, value: string, rules: number[]) => {

        const errors_found: I_Errors[] = [];
        if (rules.includes(time_types[0].error_id)) {
            //Empty time
            if (String(value).length === 0) errors_found.push({ error_id: 0, field_id, message: time_types[0].message });
        }
        if (rules.includes(time_types[1].error_id)) {
            //Wrong time format
            if (!time_format_validator(value)) errors_found.push({ error_id: 1, field_id, message: time_types[1].message });
        }
        set_total_errors((l: any) => ({ ...l, [field_id]: errors_found }));
        //are_any_errors();
    }

    /**
     * Function that validates all PICTURE types, based on rules given according with the catalog @pictures_types
     * @param field_id 
     * @param value 
     * @param rules 
     */

    const picture_validator = (field_id: string, value: any[], rules: number[]) => {
        const errors_found: I_Errors[] = [];

        if (rules.includes(pictures_types[0].error_id)) {
            if (value.length === 0) errors_found.push({ error_id: 0, field_id, message: pictures_types[0].message });
        }


        set_total_errors((l: any) => ({ ...l, [field_id]: errors_found }));
        //are_any_errors();
    }


    /**
     * Function that validates all CATEGORY types, based on rules given according with the catalog @categories_types
     * @param field_id 
     * @param value 
     * @param rules 
     */


    const categories_validator = (field_id: string, value: any[], rules: number[]) => {
        const errors_found: I_Errors[] = [];

        if (rules.includes(categories_types[0].error_id)) {
            if (value.length === 0) errors_found.push({ error_id: 0, field_id, message: categories_types[0].message });
        }

        set_total_errors((l: any) => ({ ...l, [field_id]: errors_found }));
        //are_any_errors();
    }


    //LOGIC validators ---------------------------------------------------------------------------------------------------------------------------------------------------------------


    /**
     * This functions evaluates if the range between start_date_time and end_date_date of an event is valid
     * @param event_start_date 
     * @param event_start_time 
     * @param event_end_date 
     * @param event_end_time 
     */
    const event_form_datetime = (event_start_date: string, event_start_time: Date, event_end_date: string, event_end_time: Date) => {
        const errors_found: I_Errors[] = [];
        const fields_ids = ["event_start_date", "event_start_time", "event_end_date", "event_end_time"]

        //Validate if End Date is in range with Start Date
        if (parseISO(event_start_date) > parseISO(event_end_date)) {
            errors_found.push({ error_id: 2, field_id: "event_end_date", message: date_types[2].message });
            set_total_errors((l: any) => ({ ...l, [fields_ids[2]]: l.event_end_date.concat(errors_found) }));
        }

        //Validates if the event starts and ends on the same day, it at least has to last 5 minutes
        if (parseISO(event_start_date).toDateString() === parseISO(event_end_date).toDateString()) {
            const date_diff = ((event_end_time as any) - (event_start_time as any));
            const minutes = Math.floor((date_diff / 1000) / 60);
            if (minutes < 5) {
                errors_found.push({ error_id: 2, field_id: "event_end_time", message: time_types[2].message });
                set_total_errors((l: any) => ({ ...l, [fields_ids[3]]: l.event_end_date.concat(errors_found) }));
            }
        }


    }

    //Others validators ---------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * Functions that validates if there are any active errors
     */

    const are_any_errors = useCallback((): void => {
        set_active_errors(false);
        for (const i in total_errors) {
            if (total_errors[i].length > 0) set_active_errors(true);
        }
    }, [total_errors])

    /**
     * Cleans the properties from the undisplayed pages
     * @param properties 
     */


    const clean_object = (properties: string[]) => {
        const current_object: any = { ...total_errors };
        const cleaned_object: any = {};

        if (properties.length > 0) {
            for (const i in current_object) {
                if (!properties.includes(i)) cleaned_object[i] = total_errors[i]
            }
        }
        set_total_errors(cleaned_object);

    }



    return (
        <FormValidatorContext.Provider
            value={{
                text_error_validator, picture_validator, categories_validator, clean_object,
                date_validator, time_validator, are_any_errors, event_form_datetime, active_errors, total_errors
            }}>
            {props.children}
        </FormValidatorContext.Provider>
    )

}
export { FormValidatorProvider, FormValidatorContext };