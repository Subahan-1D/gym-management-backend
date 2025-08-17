/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type TErrorSources = {
    path: string;
    message: string;
}[];

export type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorSources: TErrorSources;
};