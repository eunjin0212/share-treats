import Axios from "axios";

const createAxios = function (emitter) {
    const testFunc = function (status,errorCode) {
        // console.log('testFunc? : ',on);
        emitter.$emit("UI_EVENT_LOADING_BG_OVERLAY", status,errorCode);
    };
    const uiBgOverlayControl = function (on, hideLoading) {
        if( hideLoading ) return;
        emitter.$emit("UI_EVENT_USE_LOADING_BACKGROUND", on);
    };

    // [ AXIOS INTERCEPTORS ] BEGIN ------------------------------------------------
    let axiosInterceptorInit = function (ax) {
        ax.interceptors.request.use(
            function (config) {
                // testFunc(false);
                uiBgOverlayControl(true, config.isHideLoading);
                return config;
            },
            function (error) {
                // testFunc(false);
                uiBgOverlayControl(false, error.config.isHideLoading);
                return Promise.reject(error);
            }
        );
        ax.interceptors.response.use(
            function (response) {
                // testFunc(false);
                uiBgOverlayControl(false, response.config.isHideLoading);
                return response;
            },
            function (error) {
                if( !error.response ) testFunc(0);
                else testFunc(error.response.status,error.response.data.code);
                uiBgOverlayControl(false, error.config.isHideLoading);
                return Promise.reject(error);
            }
        );
    };
    // [ AXIOS INTERCEPTORS ] END   ------------------------------------------------
    const client = Axios.create({
        withCredentials: true,
        timeout: 120 * 1000,
    });
    axiosInterceptorInit(client);
    return client;
};
export { createAxios };
