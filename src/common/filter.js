import tableMeta from "../Database/table-meta.json";
import search from "../Database/search-result.json";

var pname, sname, dname;

export const filter = (tableMeta.results[0].applicationTable.dataFields.map((obj)=>{
    if(obj.field === "ticket.ticketPriority")
      pname = obj.name
    if(obj.field === "ticket.ticketStatus")
      sname = obj.name
    if(obj.field === "ticket.meta.productline")
      dname = obj.name
  }))


  export const pData = (search.facets[pname].facetValues)
  export const sData = (search.facets[sname].facetValues)
  export const dData = (search.facets[dname].facetValues)



  var pLength = 0, sLength = 0, dLength = 0; 
  pData.map((d)=> (pLength = pLength + parseInt(d.count)))
  export const plen =  pLength;
  sData.map((d)=> (sLength = sLength + parseInt(d.count)))
  export const dlen =  sLength;
  dData.map((d)=> (dLength = dLength + parseInt(d.count)))
  export const slen =  dLength;

