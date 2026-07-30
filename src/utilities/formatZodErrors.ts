import { ZodError, ZodType } from 'zod';
interface StringMap {
    [key: string]: string;
}

export const convertZodErrors = (error: ZodError): StringMap => {
    return error.issues.reduce((acc, issue) => {
        acc[issue.path[0]] = issue.message
        return acc;
    }, {});
};

// type ZodSchemaKeys<T extends ZodType<any, any>> = keyof T['_input']

// interface StringMap<T extends ZodType<any, any>> {
//     [key in ZodSchemaKeys<T>]: string
// }

// export const convertZodErrors = <T extends ZodType<any, any>>(error: ZodError<T>): StringMap<T> => {
//     return error.issues.reduce((acc, issue) => {
//         const key = issue.path[0] as ZodSchemaKeys<T>;
//         acc[key] = issue.message; return acc;
//     }, {} as StringMap<T>)
// };