const initialFacet = () => ({
  text: "",
  name: "",
  values: {},
});

// the value tnhat goes into values

// const initialFacetValue = () => ({
//   text: "",
//   name: "",
//   selected: false,
//   deselected: false,
//   totalCount: 0,
//   currentCount: 0,
// });

//output: facets- in object store - could be an empty object {}
// input facets -

export function initFacet(facets, key, text) {
  if (!facets?.value[key]) {
    facets.value[key] = initialFacet();
    facets.value[key].name = key;
    facets.value[key].text = text;
  }
}

export function updateFacets(output, inputFacets) {
  //   Object.entries(inputFacets).forEach(([key, val]) => {
  //            console.log("Facet: " + key);
  //     initFacet(output, key, key);

  //     Object.entries(output.value[key].values).forEach(([key, val]) => {
  //       val.currentCount = 0;
  //     });

  //     val.facetValues.map((value) => {
  //       var fvalues = ref( output.value[key].values);
  //       //        console.log(value.name);
  //       //        console.log(fvalues);
  //       if (!fvalues.value[value.name]) {
  //         fvalues.value[value.name] = initialFacetValue();
  //         //                console.log(fvalues.value[value.name]);
  //         fvalues.value[value.name].name = value.name;
  //         fvalues.value[value.name].text = value.value;
  //         fvalues.value[value.name].totalCount = value.count;
  //       }
  //       if (fvalues.value[value.name].totalCount < value.count) {
  //         fvalues.value[value.name].totalCount = value.count;
  //       }
  //       //                console.log("counter: " + value.count);
  //       const currentCount = value.count;
  //       output.value[key].values[value.name].currentCount = currentCount;
  //       //        console.log(facets.value[key].values[value.name].currentCount);
  //     });
  //   });

  Object.entries(inputFacets).forEach(([key, val]) => {
    console.log("Facet: " + key);
    // initFacet(output, key, key)
  });
  console.log(output);

  //   return output;
}
