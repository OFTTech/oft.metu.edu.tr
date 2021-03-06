import fetchAPI from "@@/lib/wp-api/index";

export type GetGeneralMenuNode = {
    id: string,
    label: string,
    path: string,
    parentId: string,
    connectedNode: {
        node: {
            uri: string
        }
    },
    childItems: { edges: [{ node: { parentId: string, id: string, label: string, path: string, connectedNode: { node: { uri: string } } } }] }
}
export type GetGeneralMenuItemsEdges = [{ node: GetGeneralMenuNode }]
export type GetGeneral = { menus: { edges: [{ node: { menuItems: { edges: GetGeneralMenuItemsEdges } } }] } }

export async function getGeneral() {
    const data = await fetchAPI(`
        query MyQuery {
          menus(where: {slug: "nav"}) {
            edges {
              node {
                menuItems {
                  edges {
                    node {
                      parentId
                      id
                      label
                      path
                      connectedNode {
                        node {
                          uri
                        }
                      }
                      childItems {
                        edges {
                          node {
                            id
                            label
                            path
                            connectedNode {
                              node {
                                uri
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
    `)
    return data
}