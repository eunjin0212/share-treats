import { createAxios }from '@/plugins/app-axios';
import { serverApi } from '@/plugins/vue-api-server';
import emitter from '@/plugins/event-hub';

async function fetchAuthorityFromNetwork(){
    const url = serverApi('uri', 'get-sign-on');
    const urlInit = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
        mode: 'cors',
        credentials: process.env.VUE_APP_SERVER_MODE !== 'loc'?'include':'omit',
        cache: 'no-store',
    };
    try {
        let response = await fetch(url, urlInit);
        if (response.ok) { // HTTP 상태 코드가 200~299일 경우
            // 응답 몬문을 받습니다(관련 메서드는 아래에서 설명).
            let js = await response.json();
            return js;
        } else {
            console.error("[AUTH] fetchLogOnProfileFromNetwork HTTP-Error: ", response.status);
            return;
        }
    } catch (error) {
        console.error("[AUTH] fetchLogOnProfileFromNetwork Net-Error: ", error);
        return;
    }
}

async function initApp(app, disableSignOn){
    var isProd = process.env.NODE_ENV === 'production';
    // for debugging purpose
    if( isProd ){
        window.slog = function(){};
        window.slog.clear = function(){};
    }else{
        window.slog = console.log.bind(console);
        window.slog.clear = console.clear.bind(console);
    }
    

    window.logOnProfile = null;

    if( ! disableSignOn ){
        let authResponse = await fetchAuthorityFromNetwork();
        window.logOnProfile = authResponse;
    }


    const init = () => console.log("plugin can be used!!");
    app.config.globalProperties.$init=init;
    
    // app.config.unwrapInjectedRef = true;
    app.config.globalProperties.$axios=createAxios(emitter);
    app.config.globalProperties.$api=serverApi;
    app.config.globalProperties.$emitter=emitter;
    app.config.globalProperties.$isLogOn=function(){
        let logOnProfile = window.logOnProfile;
        console.log('[AUTH] logOnProfile =', logOnProfile);
        return !!logOnProfile;
    }
    app.config.globalProperties.$appUtil={
        uuidv4,
    };

    app.provide('api', serverApi);
    app.provide('emitter', emitter);
    app.provide('axios', app.config.globalProperties.$axios);
    app.provide('appUtil', app.config.globalProperties.$appUtil);
    
    return app;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
    });
}

export {
    initApp
}