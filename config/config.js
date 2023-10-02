import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const API = "https://blog-post-app-cqcw.onrender.com";
export const NAME = "Blog Post";
export const PRODUCTION = publicRuntimeConfig.PRODUCTION;
