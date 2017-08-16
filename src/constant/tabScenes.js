import * as RouteType from '../constant/routeType.js'

const TabSceneObj = {}

import Home from '../containers/home/home.js'
TabSceneObj[RouteType.ROUTE_HOME] = {screen: Home}

import My from '../containers/my/my.js'
TabSceneObj[RouteType.ROUTE_MY] = {screen: My}

import Setting from '../containers/setting/setting.js'
TabSceneObj[RouteType.ROUTE_SETTING] = {screen: Setting}

export default TabSceneObj