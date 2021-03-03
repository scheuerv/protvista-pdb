const scaleColours = {
  UPDiseaseColor: "#990000",
  UPNonDiseaseColor: "#99cc00",
  deleteriousColor: "#002594",
  benignColor: "#8FE3FF",
  othersColor: "#009e73"
};

const filterData = [
  {
    name: "disease",
    type: {
      name: "consequence",
      text: "Filter Consequence"
    },
    options: {
      labels: ["Likely disease"],
      colors: [scaleColours.UPDiseaseColor]
    }
  },
  {
    name: "predicted",
    type: {
      name: "consequence",
      text: "Filter Consequence"
    },
    options: {
      labels: ["Predicted deleterious", "Predicted benign"],
      colors: [scaleColours.deleteriousColor, scaleColours.benignColor]
    }
  },
  {
    name: "nonDisease",
    type: {
      name: "consequence",
      text: "Filter Consequence"
    },
    options: {
      labels: ["Likely benign"],
      colors: [scaleColours.UPNonDiseaseColor]
    }
  },
  {
    name: "uncertain",
    type: {
      name: "consequence",
      text: "Filter Consequence"
    },
    options: {
      labels: ["Uncertain"],
      colors: [scaleColours.othersColor]
    }
  },
  {
    name: "UniProt",
    type: {
      name: "provenance",
      text: "Filter Provenance"
    },
    options: {
      labels: ["UniProt reviewed"],
      colors: ["#e5e5e5"]
    }
  },
  {
    name: "ClinVar",
    type: {
      name: "provenance",
      text: "Filter Provenance"
    },
    options: {
      labels: ["ClinVar reviewed"],
      colors: ["#e5e5e5"]
    }
  },
  {
    name: "LSS",
    type: {
      name: "provenance",
      text: "Filter Provenance"
    },
    options: {
      labels: ["Large scale studies"],
      colors: ["#e5e5e5"]
    }
  },
  {
    name: "FoldX",
    type: {
      name: "provenance",
      text: "Filter Provenance"
    },
    options: {
      labels: ["FoldX analysis"],
      colors: ["#e5e5e5"]
    }
  },
  {
    name: "PDB",
    type: {
      name: "provenance",
      text: "Filter Provenance"
    },
    options: {
      labels: ["Observed in PDB"],
      colors: ["#e5e5e5"]
    }
  }
];
filterData.forEach(filter => {
  filter.filterData = function (variants) {
    return applyFilter(filter.name, variants);
  };
});

const keywordMap = {
  disease: 'likely_disease',
  predicted: 'predicted',
  nonDisease: 'likely_benign',
  uncertain: 'uncertain',
  UniProt: 'uniprot_reviewed',
  ClinVar: 'clinvar_reviewed',
  LSS: 'large_scale_studies',
  FoldX: 'foldx',
  PDB: 'pdb'
}

const applyFilter = (filterName, variantsAll = []) => {
  const filterKeyword = keywordMap[filterName];
  return variantsAll.map(variants => {
    const clonedVariants = Object.assign({},variants);
    clonedVariants.variants = variants.variants.filter(
      variant => {
        return (variant.keywords && variant.keywords.indexOf(filterKeyword) > -1)
      }
    );
    return clonedVariants;
  });
}

const identity = variants => variants;

export const getFilter = name => {
  // console.log(filters)
  const filter = filters[name];
  if (!filter) {
    console.error(`No filter found for: ${name}`);
  }
  return filter ? filter : { applyFilter: identity };
};



export default filterData;
