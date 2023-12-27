/**
 * ApiServer
 */

import { apiServer } from '@/plugins/sti-api-server';

let serverApi = function(depth1, depth2){
    if( depth2 ) return ((apiServer[depth1])(depth2)).asString();
    if( depth1 ) return apiServer[depth1];
    return apiServer;
}

export {
    serverApi
};