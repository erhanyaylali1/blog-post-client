import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.API_URL;
export const NAME = publicRuntimeConfig.APP_NAME;
export const PRODUCTION = publicRuntimeConfig.PRODUCTION;
