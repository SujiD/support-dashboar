const initialFacet = () => ({
  text: "",
  name: "",
  values: {},
});

// the value tnhat goes into values

const initialFacetValue = () => ({
  text: "",
  name: "",
  selected: false,
  deselected: false,
  totalCount: 0,
  currentCount: 0,
});

//output: facets- in object store - could be an empty object {}
// input facets -

export function initFacet(facets, key, text) {
  if (!facets[key]) {
    facets[key] = initialFacet();
    facets[key].name = key;
    facets[key].text = text;
  }
}

export function updateFacets(output, inputFacets) {
  Object.entries(inputFacets).forEach(([key, val]) => {
    initFacet(output, key, key);
    // console.log

    Object.entries(output[key].values).forEach(([key, val]) => {
      val.currentCount = 0;
    });

    val.facetValues.map((value) => {
      var fvalues = output[key].values;
      //        console.log(value.name);
      //        console.log(fvalues);
      if (!fvalues[value.name]) {
        fvalues[value.name] = initialFacetValue();
        //                console.log(fvalues[value.name]);
        fvalues[value.name].name = value.name;
        fvalues[value.name].text = value.value;
        fvalues[value.name].totalCount = value.count;
      }
      if (fvalues[value.name].totalCount < value.count) {
        fvalues[value.name].totalCount = value.count;
      }
      //                console.log("counter: " + value.count);
      const currentCount = value.count;
      output[key].values[value.name].currentCount = currentCount;
      //        console.log(facets[key].values[value.name].currentCount);
    });
  });

  return output;
}
