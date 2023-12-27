// import Vue from 'vue'
// import {createApp} from 'vue';
let MODE_DEBUG = false;

// How to Use sample
// Input  : "get-user-info"  : "../../static/sti/json/user/{userId}/{categoryId}" ,
// Output : ../../static/sti/json/user/USERID-A/CATEID-B
// Call   : APP_APISERVER.uri("get-user-info").binds({'userId' : 'USERID-A', 'categoryId' : 'CATEID-B'}).asString();
function addressHandler(data) {
    let d = data;
    // ex) path : /abc/{userId}/list
    function resolver(path) {
        let base = path;
        return {
            asString: function () {
                if (base.startsWith('/')) {
                    return (d.meta['api-baseurl'] || '') + base;
                }
                return base;
            },
            binds: function (uriObj) {
                if (typeof uriObj !== 'object') return this;
                let keys = Object.keys(uriObj);
                for (let k = 0; k < keys.length; ++k) {
                    let key = keys[k];
                    base = base.split('{' + key + '}').join(encodeURIComponent(uriObj[key]));
                }
                return this;
            },
        };
    }
    return {
        uri: function (name) {
            if (!d.uris) return new resolver('');
            let path = d.uris[name];
            if (!path) MODE_DEBUG && console.error(' 에러가 납니다 ');
            return new resolver(path || '');
        },
        meta: function (key) {
            return d['meta'] && d['meta'][key];
        },
    }
}

let initCdnVueJs = function (/*baseUrl*/) {

    // let prefix = baseUrl || '';
    // console.log(prefix)




    // Vue.filter(function (enumVal, key) {
    //     return prefix + enumVal;
    // });



    // Vue.prototype.$cdnBaseUrl = function (v) {
    //     return prefix + v;
    // };
    // const app = createApp({});
    // app.config.globalProperties.$api = ()=>{

    // }
};

function replaceMetaKeywords(meta, arr){
    let keys = Object.keys(meta);
    for( let idx in keys ){
        let k = keys[idx];
        let v = meta[k] || '';
        if( typeof k !== 'string' ) continue;

        let arrKeys = Object.keys(arr);
        for( let a in arrKeys ){
            let aKey = arrKeys[a];
            let aVal = arr[aKey];
            if( typeof aKey !== 'string' ) continue;

            arr[aKey] = aVal.replace('%'+k+'%', v);
        }
    }
}

function loadSiteCustomApi(orgApiServerData){
    let sumData = {};
    sumData['meta'] = Object.assign({}, orgApiServerData['meta']);
    sumData['uris'] = Object.assign({}, orgApiServerData['uris']);
    replaceMetaKeywords(sumData['meta'], sumData['uris']);
    let appSvr = addressHandler(sumData);
    initCdnVueJs(appSvr.meta("cdn-baseurl"));
    return appSvr;
}

const merge = require('deepmerge');

function lastMerge(){
    const targetPhase = process.env.VUE_APP_SERVER_MODE;
    const phases = ['loc','dev','stg','prd'];
    
    let phJson = [];
    for( let p=0; p<phases.length; ++p ){
        let ph = phases[p];
        let phFile = ph;
        phJson.push( require('@/assets/sti/json/api-server-'+phFile+'.json') );
        if( ph === targetPhase ) break;
    }
    return merge.all(phJson);
}
const apiServer = loadSiteCustomApi( lastMerge() );

export {
    apiServer
}