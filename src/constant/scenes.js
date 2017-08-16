import * as RouteType from './routeType.js'

const SceneObj = {}

import Chat from '../containers/home/chat.js'
SceneObj[RouteType.ROUTE_CHAT] = {screen: Chat}

import Detail from '../containers/home/detail.js'
SceneObj[RouteType.ROUTE_DETAIL] = {screen :Detail}

import Login from '../containers/my/login.js'
SceneObj[RouteType.ROUTE_LOGIN] = {screen :Login}

import Publish from '../containers/common/publish.js'
SceneObj[RouteType.ROUTE_PUBLISH] = {screen: Publish}

export default SceneObj