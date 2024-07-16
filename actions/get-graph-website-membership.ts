
interface GraphData {
    name : string,
    total : number,
}

export const getGraphWebsiteMembership = (websites :  number, membership :  number) => { 
    //update the grapghData

    const graphData: GraphData[] = [
        {
            name : "Websites",
            total : websites,
        },
        {
            name : "Membership",
            total : membership,
        },
    ]
    return graphData;
}