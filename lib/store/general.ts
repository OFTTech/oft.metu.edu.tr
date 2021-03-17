import {GetGeneral, GetGeneralMenuItemsEdges} from "@@/lib/wp-api/general";
import {useSelector} from 'react-redux'

function getGeneralState(): GetGeneral {
    return useSelector((state) => state.general)
}

export function getGeneralMenus(): GetGeneralMenuItemsEdges {
    return getGeneralState().menus.edges[0].node.menuItems.edges
}