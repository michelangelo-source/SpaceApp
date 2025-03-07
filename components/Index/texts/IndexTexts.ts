export type routingElems = "/apod"|"/mars"|"/resources"

export type menuElementsType =
    Array<{ title: string; href: routingElems }>;


export const menuElements: menuElementsType = [
    {title: 'Astronomic picture of the day', href: '/apod'},
    {title: 'Pictures from Mars', href: '/mars'},
    {title: 'NASA open resources', href: '/resources'}
]
