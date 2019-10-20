export const INIT_APPLICATION = 'INIT_APPLICATION';
export const RESTORE_APPLICATION = 'RESTORE_APPLICATION';


export const initApplication = () => ({ type: INIT_APPLICATION });
export const restoreApplication = () => ({ type: RESTORE_APPLICATION });

export const TYPES = {
    INIT_APPLICATION,
    RESTORE_APPLICATION,
};

export interface SetServicesConfigInterface {
    type: string;
    services: any[];
}

export default {
    initApplication,
    restoreApplication,
};
